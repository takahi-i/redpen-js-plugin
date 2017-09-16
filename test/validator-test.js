var assert = require("assert");

var calc = require("../src/calc.js");

describe("calc", function() {
	it("add", function() {
		assert.equal(4, calc.add(1, 3));
	    });

	it("multiply", function() {
		assert.equal(6, calc.multiply(2, 3));
	    });
    });

