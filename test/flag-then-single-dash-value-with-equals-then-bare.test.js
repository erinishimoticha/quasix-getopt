'use strict'

const quasix = require('../index')
const Test = require('./test')

module.exports = new Test({
  name: 'flag, single dash value with an equals sign, bare value sequence',
  cmd: 'node',
  args: ['--verbose', '-o=outfile.dat', 'zzz'],
  run: run
})

function run (t) {
  const options = quasix.parse()
  const extras = options._extras
  delete options._extras
  t.equal(Object.keys(options).length, 2, 'Options contains 2 key')
  t.equal(Object.keys(extras).length, 1, 'Extras contains 1 entries')
  t.equal(options.o, 'outfile.dat', 'o value is outfile.dat')
  t.equal(options.verbose, true, 'verbose value is true')
  t.end()
}
