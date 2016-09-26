'use strict'

const cp = require('child_process')
const async = require('async')
const lodash = require('lodash')

const log = require('loglevel')
log.setLevel(process.env.LOGLEVEL || log.levels.WARN)

const glob = require('glob')
const globOpts = {
  ignore: 'node_modules/**',
  cwd: './test'
}
glob('**/*.test.js', globOpts, loadTests)

function loadTests (err, files) {
  if (err) process.exit(1)
  let code = 0

  const tests = files.map(file => {
    const test = require(`./${file}`)
    test.file = file
    return test
  })

  log.debug('Creating queue')

  const queue = async.queue((test, next) => {
    test.output = []

    log.debug(`Spawning ${test.cmd} ${test.args.join(' ')}`)
    const proc = cp.spawn(test.cmd, test.args)
    const spec = cp.spawn('./node_modules/tap-spec/bin/cmd.js')

    next = testHandler(test, spec, next)

    spec.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.stdout.on('data', data => test.output.push(data.toString()))

    proc.on('exit', exitHandler)
    proc.on('close', exitHandler)

    function exitHandler (_code) {
      if (_code !== 0) code = _code

      next(test.output, 'close')
    }
    proc.on('error', error => {
      if (error) code = 1
      next(null, 'error')
    })
  }, 1)

  log.debug('Scheduling:')
  tests.forEach(params => {
    params.args.unshift(`./test/${params.file}`)
    log.debug(` * ${params.file}`)
    queue.push(new TestProcess(params))
  })
  log.debug('\n')

  queue.drain = () => {
    log.debug('\nFinishing up last task')
    setTimeout(() => process.exit(code), 50)
  }
}

function testHandler (test, spec, next) {
  return lodash.once((data, trace) => {
    data = data || []
    log.debug(`[${trace}] ${test.file} is done. ${data.length} lines of data.`)
    data.forEach(line => spec.stdin.write(line))
    spec.stdin.on('finish', () => {
      // whyyyyy
      setTimeout(() => spec.stdout.unpipe(process.stdout), 500)
    })
    spec.stdin.end()
    next()
  })
}

class TestProcess {
  constructor (params) {
    this.args = params.args
    this.name = params.name
    this.cmd = params.cmd
    this.output = []
  }
}
