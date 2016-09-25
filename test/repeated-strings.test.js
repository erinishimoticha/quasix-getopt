'use strict'

const quasix = require('../index')
const Test = require('./test')

module.exports = new Test({
  name: 'mixed options',
  cmd: 'node',
  args: ['--outfile', 'outfile.dat', 'foo', 'bar'],
  run: run
})

function run (t) {
  const options = quasix.parse()
  t.equal(Object.keys(options).length, 1, 'Options contains 1 key because extra strings are ignored')
  t.equal(options.outfile, 'outfile.dat', 'outfile value is outfile.dat')
  t.end()
}
