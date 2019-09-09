const Discord = require('discord.js');
const pollEmbed = require('discord.js-poll-embed');
const messages = require('./messages.json');

const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (messages.motivate_commands.includes(msg.content)) {
		msg.reply(messages.discord_responses[Math.floor(Math.random() * messages.discord_responses.length)]);
	} else if (messages.tip_commands.includes(msg.content)) {
		msg.reply(messages.motivation_tips[Math.floor(Math.random() * messages.motivation_tips.length)]);
	} else if(messages.known_scum.some(word => msg.content.includes(word))){
		msg.reply("Scum!")
	}
	// else if (messages.poll_commands.includes(msg.content)){
	// 	const params = msg.content.split(" ");
	// 	console.log(params)
	// 	//https://www.npmjs.com/package/discord.js-poll-embed
	// 	pollEmbed(msg, "title", "1,2,3,4,5", 30, emojiList);
	// }
});

client.login(process.env.BOT_TOKEN);

