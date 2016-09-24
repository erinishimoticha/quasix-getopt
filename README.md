# Install
npm install quasix-getopt

# Description
This module provides dependency-free parsing of a simple subset of POSIX
command line argument syntax.

This module does not parse POSIX.1-2008 or any other official
specification. This module parses the following simple POSIX-like
constructs.

## Examples
single-dash arguments: -a
single-dash combined arguments: -zxvpf
single-dash arguments with value: -o data.txt
double-dash arguments: --verbose
double-dash arguments with value: --outfile data.txt

## Use
Parse process.argv and return an object with the command line
arguments in it. This module does not enforce any required options
or value formats. It blindly parses assuming a standardish POSIX format
and returns all values passed to the command.

    const quasix = require('quasix-getopt')
    const options = quasix.parse()
