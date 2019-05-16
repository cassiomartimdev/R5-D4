const Discord = require("discord.js");
const sql = require("../database/db.js");

module.exports.run = (r5, oldRole, newRole) => {

    sql.Servidores.findOne({_id: oldRole.guild.id}, function(erro, doc) {

        try {

            let d = r5.guilds.get('568636670346526724').emojis.find(d => d.name == 'documento');
            let logChannel = oldRole.guild.channels.find(search => search.id === doc.logschannel);

            if (!doc.logs) return;

            if (newRole.name === "@everyone") return;

            const embed = new Discord.RichEmbed()
                .setAuthor(newRole.guild.name, newRole.guild.iconURL)
                .setDescription(`${d} - Uma role foi atualizada (\`${newRole.name}/${newRole.id}\`)`)
                .addField('Antes:', `Nome: \`${oldRole.name}\`
Cor: \`#${oldRole.color}\`
Posição: \`${oldRole.position}\``)

                .addField('Depois:', `Nome: \`${newRole.name}\`
Cor: \`#${newRole.color}\`
Posição: \`${newRole.position}\``)
                .setTimestamp()

        logChannel.send(embed);
            newRole.stopTyping();

        } catch (err) {
        }

    })
}