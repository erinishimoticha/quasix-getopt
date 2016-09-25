'use strict'

const quasix = require('../index')
const Test = require('./test')

module.exports = new Test({
  name: 'single dash boolean',
  cmd: 'node',
  args: ['-p'],
  run: run
})

function run (t) {
  const options = quasix.parse()
  const extras = options._extras
  delete options._extras
  t.equal(Object.keys(options).length, 1, 'Options contains 1 key')
  t.equal(Object.keys(extras).length, 0, 'Extras contains 0 entries')
  t.equal(options.p, true, 'p option is true')
  t.end()
}
