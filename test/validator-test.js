var assert = require("assert");
var redpen = require('./redpen');

before(function() {
	redpen.initialize();
});

describe("validator", function() {
	it('test validator.js mod', function () {
		let errorSentences = redpen.callRedPen({"document" : "This sentence contains toolongword. This sentence do not contain too long word."});
    assert.equal(errorSentences.length, 1);
    firstErrorSentence = errorSentences[0];
	  assert.equal(firstErrorSentence.sentence, 'This sentence contains toolongword.');
	  // there is one too word exceeds 10 chalacteres long
	  assert.equal(1, firstErrorSentence.errors.length);
	  assert.equal('word [toolongword.] is too long. length: 12', firstErrorSentence.errors[0].message);
	});
});

after(function() {
	redpen.cleanup();
});
