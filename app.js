const Twitter = require('twitter');
const config = require('./config.js');
const quotes = require('./tweets.json');

let T = new Twitter(config);

readQuotes(quotes, function tweeter(tweet) {
	T.post('statuses/update', { status: tweet }, function(err, data) {
		if (err) console.log('error : ', err);
		else console.log('Success : ' + data.text);
	});
});

function readQuotes(quotes, callback) {
	quotes.tweets.forEach((tweet, index) => {
		setTimeout(() => callback(tweet), index * 10000);
	});
}
