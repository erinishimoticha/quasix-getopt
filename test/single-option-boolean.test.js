'use strict'

const quasix = require('../index')
const Test = require('./test')

module.exports = new Test({
  name: 'single option boolean',
  cmd: 'node',
  args: ['-p'],
  run: run
})

function run (t) {
  const options = quasix.parse()
  t.equal(Object.keys(options).length, 1, 'Options contains 1 key')
  t.equal(options.p, true, 'p option is true')
  t.end()
}
