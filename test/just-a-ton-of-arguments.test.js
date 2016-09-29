'use strict'

const quasix = require('../index')
const Test = require('./test')
const path = require('path')
const file = path.join(path.basename(__dirname), path.basename(__filename))

module.exports = new Test({
  name: 'tons of arguments',
  cmd: 'node',
  args: ['-a', 'b', '-cdef', 'extra', '-g=h', 'i=j', '--k', 'l', '--m=n', 'o', '--verbose', '-o=outfile.dat', 'y', 'z'],
  file: file,
  run: run
})

function run (t) {
  const options = quasix.parse()
  console.log(options)
  const extras = options._extras
  delete options._extras
  t.equal(Object.keys(options).length, 10, 'Options contains 10 key')
  t.equal(Object.keys(extras).length, 5, 'Extras contains 5 entries')
  t.equal(options.a, 'b', 'a value is b')
  t.equal(options.c, true, 'c value is true')
  t.equal(options.d, true, 'd value is true')
  t.equal(options.e, true, 'e value is true')
  t.equal(options.f, true, 'f value is true')
  t.equal(options.g, 'h', 'g value is h')
  t.equal(options.k, 'l', 'k value is l')
  t.equal(options.m, 'n', 'm value is n')
  t.equal(options.verbose, true, 'verbose value is true')
  t.equal(options.o, 'outfile.dat', 'o value is outfile.dat')
  t.equal(extras.indexOf('extra') > -1, true, 'extras contains extra')
  t.equal(extras.indexOf('i=j') > -1, true, 'extras contains i=j')
  t.equal(extras.indexOf('o') > -1, true, 'extras contains o')
  t.equal(extras.indexOf('y') > -1, true, 'extras contains y')
  t.equal(extras.indexOf('z') > -1, true, 'extras contains z')
  t.end()
}
