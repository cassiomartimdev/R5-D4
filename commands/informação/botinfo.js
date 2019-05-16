const { RichEmbed } = require("discord.js");
const sql = require("../../database/db.js");
const os = require('os');
const cpuStat = require("cpu-stat");

module.exports.run = (r5, message) => {

    sql.Servidores.findOne({_id: message.guild.id}, function (erro, doc) {

        let {version} = require("discord.js");
        cpuStat.usagePercent(function (err, percent, seconds) {
            if (err) {
                return console.log(err);
            }

            var ping;
            ping = parseInt(r5.ping);

            const info = new RichEmbed();
            info.setAuthor(message.guild.name, message.guild.iconURL);
            info.addField(`Nome:`, `**${r5.user.username}**`, true);
            info.addField(`ID:`, `**${r5.user.id}**`, true);
            info.addField(`RAM:`, `**${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB**`, true);
            info.addField(`Prefixo:`, `**${doc.prefix}**`, true);
            info.addField(`Latencia:`, `**${ping} ms**`, true);
            info.addField(`Servidores:`, `**${r5.guilds.size}**`, true);
            info.addField(`Usuários:`, `**${r5.users.size}**`, true);
            info.addField(`Canais:`, `**${r5.channels.size}**`, true);
            info.addField(`Comandos:`, `**${r5.commands.size}**`, true);
            info.addField(`Servidor de suporte:`, `[**Entrar**](https://discord.gg/rqREBrM)`, true);
            info.setColor("RANDOM");
            info.setFooter(`© Todos os direitos reservados`, r5.user.avatarURL);
            info.setTimestamp();

            message.channel.send(info);

        })
    })
}

module.exports.help = {
    name: 'botinfo',
    aliases: ['']
}