const Discord = require("discord.js");
const sql = require("../../database/db.js");

module.exports.run = (r5, message, args) => {

    let s = r5.guilds.get('568636670346526724').emojis.find(s => s.name == 'setad');
    sql.Servidores.findOne({_id: message.guild.id}, function(erro, doc) {

        if (!args[0]) return message.channel.send(`${s} \`${message.author.tag}\` utilize o comando: \`${doc.prefix}modlogs/modlog/logmod add <#canal> / ${doc.prefix}modlogs remove\`.`);

        switch (args[0]) {

            case 'add': {
            }
        }

    })

}

module.exports.help = {
    name: 'modlogs',
    aliases: ['modlog', 'logmod']
}