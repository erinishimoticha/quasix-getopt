'use strict'

const quasix = require('../index')
const Test = require('./test')
const path = require('path')
const file = path.join(path.basename(__dirname), path.basename(__filename))

const args = [
  // key/value
  ['-a', 'b'],
  ['-def'],
  ['-g=h'],
  ['--k', 'l'],
  ['--m=n'],
  ['-p', 'q'],
  ['--r=s'],
  ['-tuv'],
  ['--verbose'],
  ['-o=outfile.dat'],
  ['--config=config.conf']
]

  // extras
const extras = [ 'extra', 'i=j', 'i-j', 'i--j', 'o', 'y', 'z' ]

module.exports = new Test({
  name: 'arguments with randomly generated order',
  cmd: 'node',
  args: flatten(shuffle(args, extras)),
  file: file,
  run: run
})

function run (t) {
  const options = quasix.parse()
  const extras = options._extras
  delete options._extras
  t.equal(Object.keys(options).length, 15, 'Options contains 15 key')
  t.equal(Object.keys(extras).length, 7, 'Extras contains 7 entries')
  t.equal(options.a, 'b', 'a value is b')
  t.equal(options.d, true, 'd value is true')
  t.equal(options.e, true, 'e value is true')
  t.equal(options.f, true, 'f value is true')
  t.equal(options.g, 'h', 'g value is h')
  t.equal(options.k, 'l', 'k value is l')
  t.equal(options.m, 'n', 'm value is n')
  t.equal(options.verbose, true, 'verbose value is true')
  t.equal(options.config, 'config.conf', 'c value is config.conf')
  t.equal(options.o, 'outfile.dat', 'o value is outfile.dat')
  t.equal(extras.indexOf('extra') > -1, true, 'extras contains extra')
  t.equal(extras.indexOf('i=j') > -1, true, 'extras contains i=j')
  t.equal(extras.indexOf('i-j') > -1, true, 'extras contains i-j')
  t.equal(extras.indexOf('i--j') > -1, true, 'extras contains i--j')
  t.equal(extras.indexOf('o') > -1, true, 'extras contains o')
  t.equal(extras.indexOf('y') > -1, true, 'extras contains y')
  t.equal(extras.indexOf('z') > -1, true, 'extras contains z')
  t.end()
}

function shuffle (array, ext) {
  array = array.slice()
  ext = ext.slice()
  let counter = array.length

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter)

    // Decrease counter by 1
    counter--

    // And swap the last element with it
    let temp = array[counter]
    array[counter] = array[index]
    array[index] = temp
  }

  // Interleave the extras where appropriate
  // Extras should not be placed after an flag option.
  let next = ext.pop()
  let idx = 0
  while (next) {
    // short-circuit and just push all the rest onto the end
    if (idx >= array.length - 1) {
      array = array.concat(ext)
      next = null
      return array
    }

    // If it would be valid syntax, stick an extra in.
    for (; idx < array.length; idx++) {
      if (!isFlag(array[idx])) {
        array.splice(idx + 1, 0, next)
        idx++
        break
      }
    }
    next = ext.pop()
  }
  return array
}

function flatten (array) {
  return array.reduce((newArray, cur) => newArray.concat(cur), [])
}

function isFlag (opt) {
  if (opt.length === 2) return false
  if (opt[0].indexOf('=') > -1) return false
  return true
}
