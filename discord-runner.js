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
	} else if (messages.trigger_commands.includes(msg.content)) {
		if (msg.channel.type !== 'text') return;

		const { voiceChannel } = msg.member;

		if (!voiceChannel) {
			return msg.reply('please join a voice channel first!');
		}
		voiceChannel.join().then(connection => {
			//create list of dmc related tracks
			const stream = ytdl('https://www.youtube.com/watch?v=K26mi_cSAkA', { filter: 'audioonly' });
			const dispatcher = connection.playStream(stream);
			dispatcher.on('end', () => voiceChannel.leave());
		});
	}
});

client.login(process.env.BOT_TOKEN);


