#!/usr/bin/env node

var fs = require("fs");
var steelToe = require("steeltoe");
var args = require("minimist")(process.argv.slice(2));
// console.log(args);

if (!args.package) args.package = __dirname + "/package.json";

var pkg = require(args.package);

// Usage
if (!args._.length)
  return console.log("Usage: npe <property>");

// Get
if (args._.length === 1)
  return console.log(steelToe(pkg).get(args._[0]));

// Set
console.log(args);
steelToe(pkg).set(args._[0], args._[1]);
console.log(pkg);
fs.writeFileSync(args.package, JSON.stringify(pkg, null, 2));
