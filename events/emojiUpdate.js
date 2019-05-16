const Discord = require("discord.js");
const sql = require("../database/db.js");

module.exports.run = (r5, oldEmoji, newEmoji) => {

    sql.Servidores.findOne({_id: oldEmoji.guild.id}, function(erro, doc) {

        try {

            let s = r5.guilds.get('568636670346526724').emojis.find(s => s.name == 'server');
            let logChannel = oldEmoji.guild.channels.find(search => search.id === doc.logschannel);

            if (!doc.logs) return;

            let animado;
            if (oldEmoji.animated === true) animado = "Sim"
            if (oldEmoji.animated === false) animado = "Não"

            let gerenciadotwitch;
            if (oldEmoji.managed === true) gerenciadotwitch = "Sim"
            if (oldEmoji.managed === false) gerenciadotwitch = "Não"

            let animado2;
            if (newEmoji.animated === true) animado2 = "Sim"
            if (newEmoji.animated === false) animado2 = "Não"

            let gerenciadotwitch2;
            if (newEmoji.managed === true) gerenciadotwitch2 = "Sim"
            if (newEmoji.managed === false) gerenciadotwitch2 = "Não"

            const embed = new Discord.RichEmbed()
                .setAuthor(newEmoji.guild.name, newEmoji.guild.iconURL)
                .setDescription(`${s} - Um emoji foi atualizado no servidor (\`${newEmoji.name}/${newEmoji.id}\``)
                .addField(`Antes:`, `Nome: \`${oldEmoji.name}\`
ID: \`${oldEmoji.id}\`
Animado: \`${animado}\`
Gerenciado: \`${gerenciadotwitch}\``)

                .addField(`Depois:`, `Nome: \`${newEmoji.name}\`
ID: \`${newEmoji.id}\`
Animado: \`${animado2}\`
Gerenciado: \`${gerenciadotwitch2}\``)
                .setTimestamp()

            logChannel.send(embed);

        } catch (err) {
        }
    })
}