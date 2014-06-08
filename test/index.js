"use strict"

require("dotenv").load()
var assert = require("assert")

describe("thing", function() {

  beforeEach(function() {
    // stuff
  })

  it("does stuff", function() {
    assert(true)
  })

  it("reads environment from .env file", function() {
    assert.equal(process.env.FOO, "BAR")
  })

  it("has pending stuff")

})
