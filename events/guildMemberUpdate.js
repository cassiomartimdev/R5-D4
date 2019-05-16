const Discord = require("discord.js");
const sql = require("../database/db.js");

module.exports.run = (r5, oldMember, newMember) => {

    sql.Servidores.findOne({_id: oldMember.guild.id}, function(erro, doc) {

        try {

            let u = r5.guilds.get('568636670346526724').emojis.find(a => a.name == "usuario")
            let logChannel = oldMember.guild.channels.find(search => search.id === doc.logschannel);

            if (!doc.logs) return;

            let roles = oldMember.roles.map(r => `<@&${r.id}>`).slice(1).join(' **||** ');
            if (roles.length === 0) roles = '';

            let roles2 = newMember.roles.map(r => `<@&${r.id}>`).slice(1).join(' **||** ');
            if (roles2.length === 0) roles2 = '';

            const embed = new Discord.RichEmbed()
                .setAuthor(oldMember.guild.name, oldMember.guild.iconURL)
                .setDescription(`${u} - Usuário atualizado no servidor (\`${newMember.user.username}/${newMember.user.id}\`)`)
                .addField(`Antes:`, `Apelido: \`${oldMember.nickname !== null ? `${oldMember.nickname}` : `${oldMember.user.username}`}\`
Cargos: \`${oldMember.roles.size - 1}\`
${roles}`)
                .addField(`Depois:`, `Apelido: \`${newMember.nickname !== null ? `${newMember.nickname}` : `${newMember.user.username}`}\`
Cargos: \`${newMember.roles.size - 1}\`
${roles2}`)
                .setTimestamp()

            logChannel.send(embed);
            oldMember.channel.stopTyping();

        } catch (err) {
        }

    })
}