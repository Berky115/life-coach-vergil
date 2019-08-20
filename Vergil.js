#!/usr/bin/env node

const Twitter = require('twitter');
const config = require('./config.js');
const quotes = require('./tweets.json');

let T = new Twitter(config);

// when I have a list to post
// tweetOutFromList(quotes, function tweeter(tweet) {
// 	T.post('statuses/update', { status: tweet }, function(err, data) {
// 		if (err) console.log('error : ', err);
// 		else console.log('Success : ' + data.text);
// 	});
// });

function tweetOutFromList(quotes, callback) {
	quotes.tweets.forEach((tweet, index) => {
		setTimeout(() => callback(tweet), index * 10000);
	});
}

const retweet = (
	//default parameters
	params = {
		q: '#dmc',
		count: 5,
		result_type: 'recent',
		lang: 'en',
	}
) => {
	T.get('search/tweets', params, function(err, data, response) {
		if (!err) {
			data.statuses.forEach(tweet => {
				console.log(tweet.text);
				let id = { id: tweet.id_str };
				T.post('favorites/create', id, function(err, response) {
					//favorites/create for likes
					if (err) {
						console.log(err[0].message);
						return true;
					} else {
						let username = response.user.screen_name;
						let tweetId = response.id_str;
						console.log('Retweeted: ', `https://twitter.com/${username}/status/${tweetId}`, 'WE DID IT!');
						return false;
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
	tweetOutFromList: tweetOutFromList
 };
