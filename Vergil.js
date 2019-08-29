const Twitter = require('twitter');
const editJsonFile = require('edit-json-file');
const config = require('./config.js');

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
	if (quotes) {
		callback(quotes.shift());
		fileTweets.set('tweets', quotes);
	} else {
		console.log('No quotes');
	}
}

const favoriteTweet = (
	task = 'favorites/create',
	filePath = config.quotes_file_path,
	params = {
		q: '#DMC',
		count: 5,
		result_type: 'recent',
		lang: 'en',
	}
) => {
	responseValues = extractResponseValues(filePath);
	params.q = responseValues.topicsList[Math.floor(Math.random() * responseValues.topicsList.length)];
	T.get('search/tweets', params, function(err, data, response) {
		if (!err) {
			data.statuses.forEach(tweet => {
				console.log(tweet.text, '--------------------------------');
				let apiParams;
				if (task === 'favorites/create') {
					apiParams = { id: tweet.id_str };
				} else {
					apiParams = {
						status:'@' + tweet.user.screen_name + ' ' + responseValues.tweetResponses[Math.floor(Math.random() * responseValues.tweetResponses.length)],
						in_reply_to_status_id: tweet.id
					};
				}
				T.post(task, apiParams, function(err, response) {
					if (err) {
						console.log(err.message);
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

function extractResponseValues(filePath) {
	let fileTweets = editJsonFile(filePath, {
		autosave: true,
	});
	const responseValues = {
		topicsList: fileTweets.data.topics,
		tweetResponses: fileTweets.data.responses,
	};
	return responseValues;
}

module.exports = {
	favoriteTweet: favoriteTweet,
	tweetOutFromList: tweetOutFromList,
};
