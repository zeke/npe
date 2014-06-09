#!/usr/bin/env node

var fs = require("fs");
var merge = require("merge");
var steelToe = require("steeltoe");
var stringToArray = require("./lib/string-to-array");
var args = require("minimist")(process.argv.slice(2));

var defaults = {
  package: __dirname + "/package.json"
};

args = merge(defaults, args);

var pkg = require(args.package);

// Usage
if (!args._.length) {
  console.log("\nNode Package Editor");
  console.log("Get: npe <property>");
  console.log("Set: npe <property> <value>");
  console.log("\n./package.json is used by default, but you can override:");
  console.log("npe <property> --package=./some/other/package.json");
  return;
}

// Get
if (args._.length === 1)
  return console.log(steelToe(pkg).get(args._[0]));

// Set
steelToe(pkg).set(args._[0], args._[1]);

if (typeof(pkg.keywords) === "string")
  pkg.keywords = stringToArray(pkg.keywords);

fs.writeFileSync(args.package, JSON.stringify(pkg, null, 2));
