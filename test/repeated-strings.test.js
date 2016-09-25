'use strict'

const quasix = require('../index')
const Test = require('./test')

module.exports = new Test({
  name: 'repeated non-option or value strings',
  cmd: 'node',
  args: ['--outfile', 'outfile.dat', 'foo', 'bar'],
  run: run
})

function run (t) {
  const options = quasix.parse()
  const extras = options._extras
  delete options._extras
  t.equal(Object.keys(options).length, 1, 'Options contains 1 key not including extras')
  t.equal(Object.keys(extras).length, 2, 'Extras contains 2 entries')
  t.equal(options.outfile, 'outfile.dat', 'outfile value is outfile.dat')
  t.equal(extras[0], 'foo', 'Extras contains value "foo"')
  t.equal(extras[1], 'bar', 'Extras contains value "bar"')
  t.end()
}
