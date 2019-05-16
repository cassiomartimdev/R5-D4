const Discord = require("discord.js");
const sql = require("../database/db.js");

module.exports.run = (r5, message) => {

        try {

            let s = r5.guilds.get('568636670346526724').emojis.find(s => s.name == 'server');

            r5.guilds.filter(g => g.channels.has(message.guild.id)).forEach(async guild => {
                const guildDocument = guild && sql && await sql.Servidores.findById(guild.id);
        
                let channele = guild.channels.get(guildDocument.logschannel)
        
                if (!guildDocument.logs) return;
            

            const embed = new Discord.RichEmbed()
                .setAuthor(guild.name, guild.iconURL)
                .setDescription(`${s} - Uma mensagem foi apagada no canal \`${message.channel.name}\``)
                .addField('Usuário:', `\`${message.author.username}\``)
                .addField('Conteúdo:', message.content)
                .addField(`Canal:`, message.channel)
                .setTimestamp()

            channele.send(embed);
            })
        } catch (err) {
            console.log(``)
        }
}