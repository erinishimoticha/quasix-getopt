'use strict'

// const cp = require('child_process')
const glob = require('glob')
const path = require('path')
const basename = path.basename(__dirname)

const options = {
  ignore: 'node_modules/**',
  cwd: './test'
}
glob('**/*.test.js', options, loadTests)

function loadTests (err, files) {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  files.forEach(file => {
    file = file.replace(new RegExp('.*/' + basename + '/'), './')

    try {
      require(`./${file}`)
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  })
}
