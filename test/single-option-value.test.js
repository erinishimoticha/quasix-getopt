'use strict'

const quasix = require('../index')
const test = require('tape')

module.exports.name = 'single option value'
module.exports.cmd = 'node'
module.exports.args = ['-o', 'outfile.dat']
module.exports.run = run

function run (t) {
  const liveArgs = process.argv.slice(2, process.argv.length)
  t.deepEquals(liveArgs, module.exports.args, 'We got passed the right args.')

  const options = quasix.parse()
  t.equal(Object.keys(options).length, 1, 'Options contains 1 key')
  t.equal(options.o, 'outfile.dat', 'option value is outfile.dat')
  t.end()
}

if (require.main === module) {
  test(module.exports.name, run)
}
