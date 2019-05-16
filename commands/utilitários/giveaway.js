const Discord = require("discord.js");
const sql = require("../../database/db.js");

module.exports.run = (r5, message) => {

    message.channel.send(`\`${message.author.tag}\` hihi, tamo iniciando sá porra!`);

}

module.exports.help = {
    name: 'giveaway',
    aliases: ['sortear']
}