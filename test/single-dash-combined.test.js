'use strict'

const quasix = require('../index')
const Test = require('./test')

module.exports = new Test({
  name: 'single dash boolean',
  cmd: 'node',
  args: ['-zxvpf'],
  run: run
})

function run (t) {
  const options = quasix.parse()
  const extras = options._extras
  delete options._extras
  t.equal(Object.keys(options).length, 5, 'Options contains 5 keys')
  t.equal(Object.keys(extras).length, 0, 'Extras contains 0 entries')
  t.equal(options.z, true, 'z option is true')
  t.equal(options.x, true, 'x option is true')
  t.equal(options.v, true, 'v option is true')
  t.equal(options.p, true, 'p option is true')
  t.equal(options.f, true, 'f option is true')
  t.end()
}
