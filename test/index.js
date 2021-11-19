'use strict'

var nixt = require('nixt')
var util = require('util')
var path = require('path')
var fixturePath = path.join(__dirname, 'fixtures/normal/package.json')
describe('npe', function () {
  describe('with no arguments', function () {
    it('outputs usage', function (done) {
      nixt()
        .run('./index.js')
        .stdout(/Get values from package\.json/i)
        .end(done)
    })
  })

  describe('with one argument', function () {
    it('gets name', function (done) {
      nixt()
        .run('./index.js name')
        .stdout('npe')
        .end(done)
    })

    it('gets scripts', function (done) {
      nixt()
        .run('./index.js scripts')
        .stdout(/"test"/)
        .end(done)
    })

    it('gets scripts.test', function (done) {
      nixt()
        .run('./index.js scripts.test')
        .stdout('mocha')
        .end(done)
    })
  })

  describe('with --package flag', function () {
    it('gets name', function (done) {
      nixt()
        .run('./index.js name --package ' + fixturePath)
        .stdout('normal')
        .end(done)
    })

    it('outputs scripts', function (done) {
      nixt()
        .run('./index.js scripts --package ' + fixturePath)
        .stdout(/tape/)
        .end(done)
    })

    it('outputs scripts.test', function (done) {
      nixt()
        .run('./index.js scripts.test --package ' + fixturePath)
        .stdout('tape')
        .end(done)
    })
  })

  describe('with two arguments', function () {
    var pkg
    var tmpFile

    beforeEach(function (done) {
      tmpFile = util.format('/tmp/package-%s.json', Math.random() * 10000)
      nixt()
        .run('cp ' + fixturePath + ' ' + tmpFile)
        .end(done)
    })

    it("sets top-level properties like 'name'", function (done) {
      nixt()
        .expect(function (result) {
          pkg = require(tmpFile)
          if (!pkg || pkg.name !== 'foo') {
            return new Error('package name should be foo')
          }
        })
        .run('./index.js name foo --package=' + tmpFile)
        .end(done)
    })

    it("sets nested properties like 'scripts.start'", function (done) {
      nixt()
        .expect(function (result) {
          var pkg = require(tmpFile)

          if (!pkg.scripts) {
            console.log(pkg)
            return new Error('scripts property should exist')
          }

          if (pkg.scripts.start !== 'node index.js') {
            console.log(pkg.scripts)
            return new Error("scripts.start should be 'node index.js'")
          }
        })
        .run('./index.js scripts.start "node index.js" --package=' + tmpFile)
        .end(done)
    })

    it('sets keywords array from a comma-delimited string', function (done) {
      nixt()
        .expect(function (result) {
          pkg = require(tmpFile)

          if (!Array.isArray(pkg.keywords)) {
            console.log(pkg.keywords)
            return new Error('keywords should be an array')
          }

          if (pkg.keywords.length !== 2) {
            console.log(pkg.keywords)
            return new Error('keywords should have two elements')
          }

          if (pkg.keywords[0] !== 'bar') {
            console.log(pkg.keywords)
            return new Error('first keyword should be bar')
          }
        })
        .run('./index.js keywords "foo, bar" --package=' + tmpFile)
        .end(done)
    })

    it('sets keywords array from a space-delimited string', function (done) {
      nixt()
        .expect(function (result) {
          pkg = require(tmpFile)

          if (!Array.isArray(pkg.keywords)) {
            console.log(pkg.keywords)
            return new Error('keywords should be an array')
          }

          if (pkg.keywords.length !== 2) {
            console.log(pkg.keywords)
            return new Error('keywords should have two elements')
          }

          if (pkg.keywords[0] !== 'bar') {
            console.log(pkg.keywords)
            return new Error('first keyword should be bar')
          }

          if (pkg.keywords[1] !== 'foo') {
            console.log(pkg.keywords)
            return new Error('last keyword should be foo')
          }
        })
        .run('./index.js keywords "foo bar" --package=' + tmpFile)
        .end(done)
    })

    it('sets files array from a comma-delimited string', function (done) {
      nixt()
        .expect(function (result) {
          pkg = require(tmpFile)

          if (!Array.isArray(pkg.files)) {
            console.log(pkg.files)
            return new Error('files should be an array')
          }

          if (pkg.files.length !== 2) {
            console.log(pkg.files)
            return new Error('files should have two elements')
          }

          if (pkg.files[0] !== 'bin/') {
            console.log(pkg.files)
            return new Error('first keyword should be bin/')
          }
        })
        .run('./index.js files "bin/, lib/" --package=' + tmpFile)
        .end(done)
    })

    it('sets files array from a space-delimited string', function (done) {
      nixt()
        .expect(function (result) {
          pkg = require(tmpFile)

          if (!Array.isArray(pkg.files)) {
            console.log(pkg.files)
            return new Error('files should be an array')
          }

          if (pkg.files.length !== 2) {
            console.log(pkg.files)
            return new Error('files should have two elements')
          }

          if (pkg.files[0] !== 'bin/') {
            console.log(pkg.files)
            return new Error('first keyword should be bin/')
          }

          if (pkg.files[1] !== 'lib/') {
            console.log(pkg.files)
            return new Error('last keyword should be lib/')
          }
        })
        .run('./index.js files "bin/ lib/" --package=' + tmpFile)
        .end(done)
    })

    it("sets 'false' string to a boolean false", function (done) {
      nixt()
        .expect(function (result) {
          pkg = require(tmpFile)
          if (!pkg || pkg.private !== false) {
            return new Error('boolean property should be false')
          }
        })
        .run('./index.js private false --package=' + tmpFile)
        .end(done)
    })

    it("sets 'true' string to boolean true", function (done) {
      nixt()
        .expect(function (result) {
          pkg = require(tmpFile)
          if (!pkg || pkg.private !== true) {
            return new Error('boolean property should be true')
          }
        })
        .run('./index.js private true --package=' + tmpFile)
        .end(done)
    })
  })

  describe('with --delete flag', function () {
    var pkg
    var tmpFile

    beforeEach(function (done) {
      tmpFile = util.format('/tmp/package-%s.json', Math.random() * 10000)
      nixt()
        .run('cp ' + fixturePath + ' ' + tmpFile)
        .end(done)
    })

    it("check that entry 'main' exists", function (done) {
      nixt()
        .run('./index.js main --package=' + tmpFile)
        .stdout(/index\.js/)
        .end(done)
    })

    it("it deletes entry 'main'", function (done) {
      nixt()
        .expect(function (result) {
          pkg = require(tmpFile)
          if (!pkg || pkg.main) {
            return new Error('main should be deleted')
          }
        })
        .run('./index.js --delete main --package=' + tmpFile)
        .end(done)
    })

    it('it deletes multiple keys', function (done) {
      nixt()
        .expect(function (result) {
          pkg = require(tmpFile)
          if (!pkg || pkg.main || pkg.scripts) {
            return new Error('main and scripts should be deleted')
          }
        })
        .run('./index.js --delete main --package=' + tmpFile + ' ' + 'scripts')
        .end(done)
    })

    it("check that entry 'repository.url' exists", function (done) {
      nixt()
        .run('./index.js repository.url --package=' + tmpFile)
        .stdout(/^https:\/\/github\.com\/example\/normal$/)
        .end(done)
    })

    it('it deletes nested keys', function (done) {
      nixt()
        .expect(function (result) {
          pkg = require(tmpFile)
          if (!pkg || !pkg.repository || pkg.repository.url) {
            return new Error('repository.url should be deleted')
          }
        })
        .run('./index.js --delete "repository.url" --package=' + tmpFile)
        .end(done)
    })

    it('delete all nested keys leaves empty object', function (done) {
      nixt()
        .expect(function (result) {
          pkg = require(tmpFile)
          if (!pkg || !pkg.repository || pkg.repository.url || pkg.repository.type) {
            return new Error('repository.url should be deleted')
          }
          if (typeof pkg.repository !== 'object') {
            return new Error('repository is not of type object')
          }
          if (Object.keys(pkg.repository).length > 0) {
            return new Error('expect repository to be empty')
          }
        })
        .run('./index.js --delete repository.url repository.type --package=' + tmpFile)
        .end(done)
    })
  })
})
