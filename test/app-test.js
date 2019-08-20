const assert = require('assert')
const Vergil = require('../Vergil.js')

console.log(Vergil, "!!!!!!!!!!!-=-------------------")
let params = {
	q: '#dmc',
	count: 5,
	result_type: 'recent',
	lang: 'en',
};

describe('test', function() {
	describe('verify test setup', function() {
		it('should return true', function() {
			assert.equal(true, true);
		});
	});
});

// describe('Vergil API', function() {
// 	describe('Vergil can use the twitter API', function() {
// 		it('Vergil should be able to tweet', function() {
// 			assert.equal(Vergil.retweet(), true);
// 		});
// 	});
// });
