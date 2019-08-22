const Twitter = require('twitter');
const config = require('./config.js');
const editJsonFile = require('edit-json-file');

let T = new Twitter(config);

function tweetOutFromList(
	quoteFile = config.quotes_file_path,
	callback = function tweeter(tweet) {
		T.post('statuses/update', { status: tweet }, function(err, data) {
			if (err) console.log('error : ', err);
			else console.log('Success : ' + data.text);
		});
	}
) {
	let fileTweets = editJsonFile(quoteFile, {
		autosave: true,
	});

	let quotes = fileTweets.data.tweets;
	if(quotes){
		callback(quotes.shift());
		fileTweets.set("tweets", quotes);
	} else {
		console.log("No quotes")
	}
}

const respondToContent = (
	params = {
		q: '#dmc',
		count: 5,
		result_type: 'recent',
		lang: 'en',
	},
	task = 'favorites/create'
) => {
	T.get('search/tweets', params, function(err, data, response) {
		if (!err) {
			data.statuses.forEach(tweet => {
				console.log(tweet.text);
				let id = { id: tweet.id_str };
				T.post(task, id, function(err, response) {
					if (err) {
						console.log(err[0].message);
					} else {
						let username = response.user.screen_name;
						let tweetId = response.id_str;
						console.log(task, `https://twitter.com/${username}/status/${tweetId}`, ' Task succeeded');
					}
				});
			});
		} else {
			console.log(err);
		}
	});
};

module.exports = {
	respondToContent: respondToContent,
	tweetOutFromList: tweetOutFromList,
};
