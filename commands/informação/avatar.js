const { Constants, R5Embed } = require("../../utils");
const sql = require("../../database/db.js");

module.exports.run = (r5, message, args) => {

    const authorInfo = new R5Embed(message.author);
    const membro = message.mentions.users.first();

    if (!args[0]) {

        authorInfo.setAuthor(message.author.tag, message.author.avatarURL);
        authorInfo.setDescription(`${Constants.SETAD} Caso queira instalar seu avatar [clique](${message.author.avatarURL})`);
        authorInfo.setColor("RANDOM");
        authorInfo.setImage(message.author.avatarURL);
        return message.channel.send(authorInfo);

    }
}

module.exports.help = {
    name: 'avatar',
    aliases: ['']
}