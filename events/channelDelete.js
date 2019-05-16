const Discord = require("discord.js");
const sql = require("../database/db.js");

module.exports.run = (r5, channel) => {

    sql.Servidores.findOne({_id: channel.guild.id}, function(erro, doc) {

        try {

            if (!doc.logs) return;

            let a = r5.guilds.get('568636670346526724').emojis.find(a => a.name == 'adicionar');
            let channeltype = channel.type.replace("text", "Texto").replace("voice", "Voz");
            let logChannel = channel.guild.channels.find(search => search.id === doc.logschannel);

            const embed = new Discord.RichEmbed()
                .setAuthor(channel.guild.name, channel.guild.iconURL)
                .setDescription(`${a} - Um canal foi deletado do servidor (\`${channel.name}/${channel.id}\`)`)
                .addField(`Informações:`, `Nome: \`${channel.name}\`
Tipo: \`${channeltype}\`
ID: \`${channel.id}\``)
                .setTimestamp()

            logChannel.send(embed);

        } catch (err) {
            console.log(err);
        }

    })
}