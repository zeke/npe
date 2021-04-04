#!/usr/bin/env node
'use strict'

var fs = require('fs')
var path = require('path')
var merge = require('merge')
var steelToe = require('steeltoe')
var stringToArray = require('./lib/string-to-array')
var args = require('minimist')(process.argv.slice(2))
var endOfLine = require('os').EOL

var defaults = {
  package: process.cwd() + '/package.json'
}

args = merge(defaults, args)

var pkg = require(args.package)

// Usage
if (!args._.length) {
  console.log(fs.readFileSync(path.join(__dirname, '/example.sh')).toString())
  process.exit()
}

if (!fs.existsSync(defaults.package)) {
  console.log('No package.json file found. Use `npm init` to create a new package.json file')
  process.exit()
}



// Get
if (args._.length === 1) {
  var val = steelToe(pkg).get(args._[0])
  if (typeof (val) !== 'string') { val = JSON.stringify(val, null, 2) }
  console.log(val)
  process.exit()
}

if (args._.length === 2 && args.delete) {
  // Delete
  steelToe(pkg).set(args._[0], undefined)
} else if (args._.length > 1) {
  // Set
  steelToe(pkg).set(args._[0], args._[1])
}

if (typeof (pkg.keywords) === 'string') {
  pkg.keywords = stringToArray(pkg.keywords)
}
if (typeof (pkg.files) === 'string') {
  pkg.files = stringToArray(pkg.files)
}

Object.keys(pkg).forEach(function (property) {
  if (pkg[property] === 'true') {
    pkg[property] = true
  }

  if (pkg[property] === 'false') {
    pkg[property] = false
  }
})

fs.writeFileSync(args.package, JSON.stringify(pkg, null, 2) + endOfLine)
