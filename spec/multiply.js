"use strict";

var multiply = require('../src/js/multiply');

describe("#multiply", function () {
  it("returns the correct multiplied value", function () {
    var product = multiply(2, 3);
    expect(product).toBe(6);
  });
});