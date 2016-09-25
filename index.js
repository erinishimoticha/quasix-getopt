'use strict'

module.exports.parse = parse

/**
 * npm install quasix-getopt
 *
 * This module does not parse POSIX.1-2008 or any other official
 * specification. This module parses the following simple POSIX-like
 * constructs:
 *
 * Examples:
 * single-dash arguments: -a
 * single-dash combined arguments: -zxvpf
 * single-dash arguments with value: -o data.txt
 * double-dash arguments: --verbose
 * double-dash arguments with value: --outfile data.txt
 *
 * Parse process.argv and return an object with the command line
 * arguments in it. This module does not enforce any required options
 * or value formats. It blindly parses assuming a standardish POSIX format
 * and returns all values passed to the command.
 */
function parse () {
  const options = { _extras: [] }
  const order = []

  process.argv.slice(2, process.argv.length).forEach(str => {
    let a

    if (str.substr(0, 2) === '--') {
      a = str.substr(2, str.length)

      let pieces = a.split('=')
      if (pieces[1]) {
        // e.g., --filename=/home/erin/data.txt
        options[pieces[0]] = pieces[1]
        order.push(pieces[0])
      } else {
        // e.g., --verbose
        options[pieces[0]] = true
        order.push(pieces[0])
      }
    } else if (str.substr(0, 1) === '-') {
      a = str.substr(1, str.length)
      // e.g., -a or -zxvpf
      a.split('').forEach(flag => {
        options[flag] = true
        if (a.length > 2) {
          // indicate last thing we processed doesn't expect a value.
          order.push(false)
        } else {
          order.push(flag)
        }
      })
    } else {
      const prev = last(order)
      // e.g., -o /home/erin/data.txt
      if (prev && options[prev] === true) {
        options[prev] = str
        // indicate last thing we processed was not an option name.
        order.push(false)
      } else if (!prev) {
        // this is a bare keyword not associated with a name.
        options._extras.push(str)
        // indicate last thing we processed was not an option name.
        order.push(false)
      }
    }
  })

  return options
}

function last (list) {
  return list[list.length - 1]
}
