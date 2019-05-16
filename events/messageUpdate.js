const Discord = require("discord.js");
const sql = require("../database/db.js");

module.exports.run = (r5, oldMessage, newMessage) => {

            r5.guilds.filter(g => g.members.has(newMessage.author.id)).forEach(async guild => {
                const guildDocument = guild && sql && await sql.Servidores.findById(guild.id);

                try {

                    let logChannel = guild.channels.get(guildDocument.logschannel)

                    if (!guildDocument.logs) return;

                    if (oldMessage.author.bot || newMessage.author.bot) return;

                    let u = r5.guilds.get('568636670346526724').emojis.find(a => a.name == 'usuario');

                    const embed = new Discord.RichEmbed()
                        .setAuthor(newMessage.guild.name, newMessage.guild.iconURL)
                        .setDescription(`${u} - Uma mensagem foi editada no canal (\`${newMessage.channel.name}/${newMessage.channel.id}\`)
                **[Dar um pulinho até a mensagem](https://discordapp.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id})**`)
                        .addField('Remetente:', `\`${newMessage.author.tag}\``)
                        .addField('Mensagem antiga:', oldMessage.content)
                        .addField('Mensagem nova:', newMessage.content)
                        .setColor("RANDOM")
                        .setTimestamp()

                    logChannel.send(embed);

                } catch (err) {
                    console.log('');
                }
            })
}