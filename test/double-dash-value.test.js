'use strict'

const quasix = require('../index')
const Test = require('./test')

module.exports = new Test({
  name: 'double dash value',
  cmd: 'node',
  args: ['--outfile', 'outfile.dat'],
  run: run
})

function run (t) {
  const options = quasix.parse()
  const extras = options._extras
  delete options._extras
  t.equal(Object.keys(options).length, 1, 'Options contains 1 key')
  t.equal(Object.keys(extras).length, 0, 'Extras contains 0 entries')
  t.equal(options.outfile, 'outfile.dat', 'option value is outfile.dat')
  t.end()
}
