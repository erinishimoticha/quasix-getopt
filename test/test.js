'use strict'

const EventEmitter = require('events')
const tapeTest = require('tape')

class Test extends EventEmitter {
  constructor (params) {
    super()
    this.name = params.name
    this.cmd = params.cmd
    this.args = params.args
    this._run = params.run

    if (
      process.argv[1].indexOf('test/index.js') === -1 &&
      process.argv[1].indexOf('/test.js') === -1
    ) {
      this.run()
    }
  }

  run () {
    const self = this

    tapeTest(this.name, t => {
      const liveArgs = process.argv.slice(2, process.argv.length)
      t.equals(liveArgs.length, this.args.length, 'Arg arrays are the same size')
      this.args.forEach(arg => {
        t.equals(liveArgs.indexOf(arg) > -1, true, 'Test got passed the right args.')
      })

      const end = t.end
      t.end = function (err) {
        end(err)
        setImmediate(() => process.exit(err ? 1 : 0))
      }

      self._run(t)
    })
  }
}

module.exports = Test
