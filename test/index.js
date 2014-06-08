var nixt = require('nixt');

describe("npe", function() {

  it("outputs usage when not given a property", function(done) {
    nixt()
      .run('./index.js')
      .stdout(/Node Package Editor/i)
      .end(done);
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

    beforeEach(function(done){
      nixt()
        .run('cp test/fixtures/normal/package.json test/fixtures/normal/tmp.json')
        .end(done);
    });

    afterEach(function(done){
      nixt()
        .run('rm test/fixtures/normal/tmp.json')
        .end(done);
    });

    it("sets name", function(done) {
      nixt()
        .expect(function(result){
          var pkg = require("test/fixtures/normal/tmp.json");
          if (!pkg || pkg.name != "foo") {
            return new Error('package name should be foo');
          }
        })
        .run('./index.js name foo --package=test/fixtures/normal/tmp.json')
        .end(done);
    });

    // it("sets scripts.start", function(done) {
    //   nixt()
    //     .expect(function(result){
    //       var pkg = require("test/fixtures/normal/tmp.json");
    //       if (!pkg || !pkg.scripts || pkg.scripts.start != "boo") {
    //         return new Error("scripts.start should be 'boo', but is " + JSON.stringify(pkg.scripts));
    //       }
    //     })
    //     .run("./index.js scripts.test boo --package=test/fixtures/normal/tmp.json")
    //     .end(done);
    // });

  });

});
