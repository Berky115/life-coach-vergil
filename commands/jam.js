const ytdl = require('ytdl-core');

module.exports = {
    name: 'jam',
    description: 'Get pumped with some music from Vergils exclusive playlist',
    execute(msg, args) {
        let dispatcher;

        if(dispatcher === undefined){
            if (msg.channel.type !== 'text') return;
            const { voiceChannel } = msg.member;
            if (!voiceChannel) {
                return msg.reply('please join a voice channel first!');
            }
            voiceChannel.join().then(connection => {
                msg.reply('NOW IM MOTIVATED!')
                const stream = ytdl('https://www.youtube.com/watch?v=K26mi_cSAkA', { filter: 'audioonly' });
                dispatcher = connection.playStream(stream);
                dispatcher.on('end', () => voiceChannel.leave());
            });
        } else dispatcher.end;
    }
};