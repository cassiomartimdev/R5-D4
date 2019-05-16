const Discord = require("discord.js");
const sql = require("../database/db.js");

module.exports.run = (r5, role) => {

    sql.Servidores.findOne({_id: role.guild.id}, function(erro, doc) {

        try {

            let d = r5.guilds.get('568636670346526724').emojis.find(d => d.name == 'documento');
            let logChannel = role.guild.channels.find(search => search.id === doc.logschannel);

            if (!doc.logs) return;
            
            if (role.name === "@everyone") return;

            const embed = new Discord.RichEmbed()
                .setAuthor(role.guild.name, role.guild.iconURL)
                .setDescription(`${d} - Uma role foi deletada no servidor (\`${role.name}/${role.id}\`)`)
                .addField('Antes:', `Nome: \`${role.name}\`
Cor: \`#${role.color}\`
Posição: \`${role.position}\``)

                .addField('Depois:', `Nome: \`${role.name}\`
Cor: \`#${role.color}\`
Posição: \`${role.position}\``)
                .setTimestamp()

            logChannel.send(embed);
            role.channel.stopTyping();

        } catch (err) {
        }

    })
}