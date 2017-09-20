var assert = require("assert");
var redpen = require('./redpen');



before(function() {
	redpen.startRedPenServer();
    });

describe("validator", function() {
	it("size", function() {
		assert.equal(1, redpen.callRedPen("this is a long long long long long long long long long long long long long sentence.").length);
	    });

	it("output", function() {
		assert.equal(1, redpen.callRedPen("this is a long long long long long long long long long long long long long sentence.").length);
	    });
    });


after(function() {
	redpen.stopRedPenServer();
    });
