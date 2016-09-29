'use strict'

const quasix = require('../index')
const Test = require('./test')
const path = require('path')
const file = path.join(path.basename(__dirname), path.basename(__filename))

module.exports = new Test({
  name: 'mixed options',
  cmd: 'node',
  args: ['-p', '-1', '-jsdlkkk', '--outfile', 'outfile.dat', '-e', '--test'],
  file: file,
  run: run
})

function run (t) {
  const options = quasix.parse()
  const extras = options._extras
  delete options._extras
  t.equal(Object.keys(options).length, 10, 'Options contains 10 keys')
  t.equal(Object.keys(extras).length, 0, 'Extras contains 0 entries')
  t.equal(options.outfile, 'outfile.dat', 'outfile value is outfile.dat')
  t.equal(options.p, true, 'p value is true')
  t.equal(options['1'], true, '1 value is true')
  t.equal(options.j, true, 'j value is true')
  t.equal(options.s, true, 's value is true')
  t.equal(options.d, true, 'd value is true')
  t.equal(options.l, true, 'l value is true')
  t.equal(options.k, true, 'k value is true')
  t.equal(options.e, true, 'e value is true')
  t.equal(options.test, true, 'test value is true')
  t.end()
}
