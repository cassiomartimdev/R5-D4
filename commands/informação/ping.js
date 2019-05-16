const Discord = require("discord.js");
const sql = require("../../database/db.js");

module.exports.run = (r5, message) => {

    const l = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'loading');

    var ping;
    ping = parseInt(r5.ping);

    const load = new Discord.RichEmbed()
        .setDescription(`${l} \`${message.author.tag}\` carregando a latencia...`)
        .setTimestamp()

    message.channel.send(load).then((m) => {

        setImmediate(() => {

            const info = new Discord.RichEmbed()
                .setAuthor(r5.user.tag, r5.user.avatarURL)
                .setDescription(`\`${message.author.tag}\` a minha latencia atualmente é de: **(${ping} ms)**`)
                .setFooter(`Comando utilizado por: ${message.author.tag}`, message.author.avatarURL)
                .setColor("RANDOM")
                .setTimestamp()

            m.edit(info);
        }, 3500)
    })
}

module.exports.help = {
    name: 'ping',
    aliases: ['']
}