'use strict'

const quasix = require('../index')
const Test = require('./test')
const path = require('path')
const file = path.join(path.basename(__dirname), path.basename(__filename))

module.exports = new Test({
  name: 'double dash boolean',
  cmd: 'node',
  args: ['--print'],
  file: file,
  run: run
})

function run (t) {
  const options = quasix.parse()
  const extras = options._extras
  delete options._extras
  t.equal(Object.keys(options).length, 1, 'Options contains 1 key')
  t.equal(Object.keys(extras).length, 0, 'Extras contains 0 entries')
  t.equal(options.print, true, 'print option is true')
  t.end()
}
