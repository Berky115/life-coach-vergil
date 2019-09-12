const messages = require('../messages.json');

module.exports = {
    name: 'tip',
    description: 'Get a helpful tip from Vergil.',
    execute(msg, args) {
        msg.reply(messages.motivation_tips[Math.floor(Math.random() * messages.motivation_tips.length)]);
    }
};