'use strict'

const quasix = require('../index')
const test = require('tape')

test('single flag option', t => {
  process.argv = ['node', 'test/index.js', '-p']
  const options = quasix.parse()
  t.equal(Object.keys(options).length, 1, 'Options contains 1 key')
  t.equal(options.p, true, 'p option is true')
  t.end()
})
