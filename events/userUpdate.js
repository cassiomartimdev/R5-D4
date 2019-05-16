const Discord = require("discord.js");
const sql = require("../database/db.js");

module.exports.run = (r5, oldUser, newUser) => {

    let s = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'setad');

    try {
        if (oldUser.bot && newUser.bot) return
        r5.guilds.filter(g => g.channels.has(newUser.channel.id)).forEach(async guild => {
            const guildDocument = guild && sql && await sql.Servidores.findById(guild.id);

            let channel = guild.channels.get(guildDocument.logschannel);

            const embed = new Discord.RichEmbed()
                .setAuthor(guild.name, guild.iconURL)
                .setDescription(`${s} - O perfil de um usuário foi atualizado (\`${newUser.username}/${newUser.id}\`)`)
                .addField(`Antes:`, `Nome: \`${oldUser.username}\`
Tag: \`${oldUser.discriminator}\`
Avatar: [**\`Download\`**](${oldUser.displayAvatarURL})`)
                .addField(`Depois:`, `Nome: \`${newUser.username}\`
Tag: \`${newUser.discriminator}\`
Avatar: [**\`Download\`**](${newUser.displayAvatarURL})`)
                .setThumbnail(newUser.displayAvatarURL)
                .setTimestamp()

            if (guildDocument.logs) channel.send(embed);
        })
    } catch (err) {
        console.log('[R5-D4] O canal de logs não está definido, então deu um erro chato no userUpdate!')
    }
}