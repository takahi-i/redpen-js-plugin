var assert = require("assert");
var redpen = require('./redpen');

before(function() {
	redpen.startRedPenServer();
    });

describe("validator", function() {

	it('test validator.js mod', function (done) {
		redpen.callRedPenServerMod();
	});

	it("size", function() {
		assert.equal(1, redpen.callRedPen("this is a long long long long long long long long long long long long long sentence.").length);
	    });

	it("output", function() {
		assert.equal(1, redpen.callRedPen("this is a long long long long long long long long long long long long long sentence.").length);
	    });

	it('test validator.js', function (done) {
		var request = {
		    "document": "This sentence contains toolongword. This sentence doesn't contain too long word.",
		    "format": "json2",
		    "documentParser": "PLAIN",
		    "config": {
					"lang": "en",
					"validators": {
			    	"JavaScript": {}
					}
		    }
		};

		var assertion = function (errorSentences) {
		    // only one sentence contains error
		    assert.equal(errorSentences.length, 1);
		    firstErrorSentence = errorSentences[0];
		    assert.equal(firstErrorSentence.sentence, 'This sentence contains toolongword.');
		    // there is one too word exceeds 10 chalacteres long
		    assert.equal(1, firstErrorSentence.errors.length);
		    assert.equal('word [toolongword.] is too long. length: 12', firstErrorSentence.errors[0].message);
		    done();
		};

		redpen.callRedPenServer(request, assertion);
	    });
    });

after(function() {
	redpen.stopRedPenServer();
    });
