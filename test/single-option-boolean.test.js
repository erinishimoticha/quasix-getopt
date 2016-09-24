'use strict'

const quasix = require('../index')
const test = require('tape')

module.exports.name = 'single option boolean'
module.exports.cmd = 'node'
module.exports.args = ['-p']
module.exports.run = run

function run (t) {
  const options = quasix.parse()
  t.equal(Object.keys(options).length, 1, 'Options contains 1 key')
  t.equal(options.p, true, 'p option is true')
  t.end()
}

if (require.main === module) {
  test(module.exports.name, run)
}
