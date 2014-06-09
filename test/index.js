var fs = require('fs');
var nixt = require('nixt');
var util = require('util');

describe("npe", function() {

  describe("with no arguments", function(){

    it("outputs usage", function(done) {
      nixt()
        .run('./index.js')
        .stdout(/Node Package Editor/i)
        .end(done);
    });

  });

  describe("with one argument", function(){

    it("gets name", function(done) {
      nixt()
        .run('./index.js name')
        .stdout("npe")
        .end(done);
    });

    it("gets scripts", function(done) {
      nixt()
        .run('./index.js scripts')
        .stdout(/test:/)
        .end(done);
    });

    it("gets scripts.test", function(done) {
      nixt()
        .run('./index.js scripts.test')
        .stdout("mocha")
        .end(done);
    });

  });

  describe("with --package flag", function(){

    it("gets name", function(done) {
      nixt()
        .run('./index.js name --package test/fixtures/normal/package.json')
        .stdout("normal")
        .end(done);
    });

    it("outputs scripts", function(done) {
      nixt()
        .run('./index.js scripts --package test/fixtures/normal/package.json')
        .stdout(/tape/)
        .end(done);
    });

    it("outputs scripts.test", function(done) {
      nixt()
        .run('./index.js scripts.test --package test/fixtures/normal/package.json')
        .stdout("tape")
        .end(done);
    });

  });

  describe("with two arguments", function(){
    var pkg;
    var tmpName;

    beforeEach(function(done){
      tmpName = util.format("/tmp/package-%s.json", Math.random()*10000);
      nixt()
        .run("cp test/fixtures/normal/package.json " + tmpName)
        .end(done);
    });

    // afterEach(function(done){
    //   pkg = null;
    //   nixt()
    //     .run('rm test/fixtures/normal/tmp.json')
    //     .end(done);
    // });

    it("sets name", function(done) {
      nixt()
        .expect(function(result){
          pkg = require(tmpName);
          if (!pkg || pkg.name != "foo") {
            return new Error('package name should be foo');
          }
        })
        .run("./index.js name foo --package="+tmpName)
        .end(done);
    });

    it("sets keywords array from a comma-delimited string", function(done) {
      nixt()
        .expect(function(result){
          pkg = require(tmpName);

          if (!util.isArray(pkg.keywords)) {
            console.log(pkg.keywords);
            return new Error('keywords should be an array');
          }

          if (pkg.keywords.length != 2) {
            console.log(pkg.keywords);
            return new Error('keywords should have two elements');
          }

          if (pkg.keywords[0] !== "bar") {
            console.log(pkg.keywords);
            return new Error('first keyword should be bar');
          }

        })
        .run("./index.js keywords \"foo, bar\" --package="+tmpName)
        .end(done);
    });

    it("sets keywords array from a space-delimited string", function(done) {
      nixt()
        .expect(function(result){
          pkg = require(tmpName);

          if (!util.isArray(pkg.keywords)) {
            console.log(pkg.keywords);
            return new Error('keywords should be an array');
          }

          if (pkg.keywords.length != 2) {
            console.log(pkg.keywords);
            return new Error('keywords should have two elements');
          }

          if (pkg.keywords[0] !== "bar") {
            console.log(pkg.keywords);
            return new Error('first keyword should be bar');
          }

          if (pkg.keywords[1] !== "foo") {
            console.log(pkg.keywords);
            return new Error('last keyword should be foo');
          }

        })
        .run("./index.js keywords \"foo bar\" --package="+tmpName)
        .end(done);
    });

    it("sets scripts.start", function(done) {
      nixt()
        .expect(function(result){
          var pkg = require(tmpName);

          if (!pkg.scripts) {
            console.log(pkg);
            return new Error('scripts property should exist');
          }

          if (pkg.scripts.start != "node index.js") {
            console.log(pkg.scripts);
            return new Error("scripts.start should be 'node index.js'");
          }
        })
        .run("./index.js scripts.start \"node index.js\" --package="+tmpName)
        .end(done);
    });

  });

});
