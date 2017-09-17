var assert = require("assert");
var redpen = require('./redpen');

describe("validator", function() {
	it("output", function() {
		assert.equal(6, redpen.callRedPen("this is a long long long long long long long long long long long long long sentence."));
	    });
    });

