'use strict'

const quasix = require('../index')
const Test = require('./test')
const path = require('path')
const file = path.join(path.basename(__dirname), path.basename(__filename))

module.exports = new Test({
  name: 'single dash combined with bare keywords',
  cmd: 'node',
  args: ['-zxvpf', 'blah.tgz', 'another.tgz'],
  file: file,
  run: run
})

function run (t) {
  const options = quasix.parse()
  const extras = options._extras
  delete options._extras
  t.equal(Object.keys(options).length, 5, 'Options contains 5 keys')
  t.equal(Object.keys(extras).length, 2, 'Extras contains 2 entries')
  t.equal(options.z, true, 'z option is true')
  t.equal(options.x, true, 'x option is true')
  t.equal(options.v, true, 'v option is true')
  t.equal(options.p, true, 'p option is true')
  t.equal(options.f, true, 'f option is true')
  t.equal(extras[0], 'blah.tgz', 'Extras contains blah.tgz')
  t.equal(extras[1], 'another.tgz', 'Extras contains another.tgz')
  t.end()
}
