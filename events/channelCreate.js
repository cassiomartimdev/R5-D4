const Discord = require("discord.js");
const sql = require("../database/db.js");

module.exports.run = (r5, channel) => {

    try {
    r5.guilds.filter(g => g.channels.has(channel.id)).forEach(async guild => {
        const guildDocument = guild && sql && await sql.Servidores.findById(guild.id);

        let channele = guild.channels.get(guildDocument.logschannel)

        if (!guildDocument.logs) return;


            let a = r5.guilds.get('568636670346526724').emojis.find(a => a.name == 'adicionar');
            let channeltype = channel.type.replace("text", "Texto").replace("voice", "Voz");

            const embed = new Discord.RichEmbed()
                .setAuthor(guild.name, guild.iconURL)
                .setDescription(`${a} - Um novo canal foi criado no servidor (\`${channel.name}/${channel.id}\`)`)
                .addField(`Informações:`, `Nome: \`${channel.name}\`
Tipo: \`${channeltype}\`
ID: \`${channel.id}\``)
                .setTimestamp()

            channele.send(embed);

    })
} catch (err) {
    console.log(err);
}
}