const Discord = require("discord.js");
const sql = require("../database/db.js")

module.exports.run = (r5, oldChannel, newChannel) => {

    let s = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'texto');

    try {
        
        r5.guilds.filter(g => g.channels.has(newChannel.id)).forEach(async guild => {
            const guildDocument = guild && sql && await sql.Servidores.findById(guild.id)

            let channel = guild.channels.get(guildDocument.logschannel);

            if (!guildDocument.logs) return;

            if (guildDocument.logschannel === 'Nenhum') return;

            if (!channel) return;

            function tipoCanal() {
                var channelVerif = oldChannel.type;
                if (channelVerif === "text") {
                    return (`Texto`)
                } else if (channelVerif === "voice") {
                    return (`Voz`)
                } else if (channelVerif === 'category') {
                    return (`Categoria`)
                }
            }

            function tipoCanal2() {
                var channelVerif = newChannel.type;
                if (channelVerif === "text") {
                    return (`Texto`)
                } else if (channelVerif === "voice") {
                    return (`Voz`)
                } else if (channelVerif === 'category') {
                    return (`Categoria`)
                }
            }
            let topic = (oldChannel.topic) ? oldChannel.topic : "`Nenhum`";
            let topic2 = (newChannel.topic) ? newChannel.topic : "`Nenhum`";

            function nsfw() {
                var bot = oldChannel.nsfw
                if (bot === true) {
                    return `Sim`
                } else if (bot === false) {
                    return (`Não`)
                } else if (bot === undefined) {
                    return (`Canais de voz não possuem NSFW`)
                }
            }

            function nsfw2() {
                var bot = newChannel.nsfw
                if (bot === true) {
                    return `Sim`
                } else if (bot === false) {
                    return (`Não`)
                } else if (bot === undefined) {
                    return (`Canais de voz não possuem NSFW`)
                }
            }
            
            const embed = new Discord.RichEmbed()
                .setAuthor(guild.name, guild.iconURL)
                .setDescription(`${s} - Um canal foi editado no servidor (\`${newChannel.name}/${newChannel.id}\`)`)
                .addField(`Antes:`, `Nome: \`${oldChannel.name}\`
Tipo: \`${tipoCanal()}\`
NSFW: \`${nsfw()}\`
Posição: \`${oldChannel.position}\`
Tópico: ${topic}`)

                .addField(`Depois:`, `Nome: \`${newChannel.name}\`
Tipo: \`${tipoCanal2()}\`
NSFW: \`${nsfw2()}\`
Posição: \`${newChannel.position}\`
Tópico: ${topic2}`)
                .setTimestamp();

            channel.send(embed);

        })
    } catch (err) {

    }
}