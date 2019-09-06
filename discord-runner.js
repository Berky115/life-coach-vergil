const Discord = require('discord.js');
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
	}
});

client.login(process.env.BOT_TOKEN);
