'use strict'

const cp = require('child_process')
const glob = require('glob')
const async = require('async')

const globOpts = {
  ignore: 'node_modules/**',
  cwd: './test'
}
glob('**/*.test.js', globOpts, loadTests)

function loadTests (err, files) {
  if (err) exit(err)

  // Run up to four tests at a time
  const queue = async.queue((test, next) => {
    test.args.unshift(`${globOpts.cwd}/${test.file}`)

    const proc = cp.spawn(test.cmd, test.args)
    proc.stderr.pipe(process.stderr)
    proc.stdout.pipe(process.stdout)
    proc.on('error', err => next(err))
    proc.on('exit', code => () => next())
    proc.on('close', code => () => next())
  }, 4)

  files.forEach(file => {
    let test

    try {
      test = require(`./${file}`)
    } catch (err) {
      exit(err)
    }

    test.file = file
    queue.push(test)
  })

  queue.drain = () => exit()
}

function exit (err) {
  if (err) console.error(err)
  process.exit(err ? 1 : 0)
}
