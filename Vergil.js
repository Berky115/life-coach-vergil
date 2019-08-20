#!/usr/bin/env node

const Twitter = require('twitter');
const config = require('./config.js');

let T = new Twitter(config);

function tweetOutFromList(
	values,
	callback = function tweeter(tweet) {
		T.post('statuses/update', { status: tweet }, function(err, data) {
			if (err) console.log('error : ', err);
			else console.log('Success : ' + data.text);
		});
	}
) {
	values.tweets.forEach(tweet => {
		() => callback(tweet);
	});
}

const retweet = (
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
						console.log( task , `https://twitter.com/${username}/status/${tweetId}`, ' Task succeeded');
					}
				});
			});
		} else {
			console.log(err);
		}
	});
};

retweet();

module.exports = {
	retweet: retweet,
	tweetOutFromList: tweetOutFromList,
};
