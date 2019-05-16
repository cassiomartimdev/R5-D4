const sql = require("../../database/db.js"); 
const Discord = require("discord.js");

exports.run = async (r5, message) => {

try {

sql.Usuarios.find({}, function (erro, documento) {

    var fundador = documento.filter(a => a.fundador).map(a => r5.users.get(a._id) ? `\`${r5.users.get(a._id).tag}\`` : 'Não Encontrado').join(' **-** ')
    var administradores = documento.filter(a => a.administrador).map(a => r5.users.get(a._id) ? `\`${r5.users.get(a._id).tag}\`` : 'Não Encontrado').join(' **-** ')
    var programadores = documento.filter(a => a.dev).map(a => r5.users.get(a._id) ? `\`${r5.users.get(a._id).tag}\`` : 'Não Encontrado').join(' **-** ')
    var moderadores = documento.filter(a => a.moderador).map(a => r5.users.get(a._id) ? `\`${r5.users.get(a._id).tag}\`` : 'Não Encontrado').join(' **-** ')
    var supervisor = documento.filter(a => a.sup).map(a => r5.users.get(a._id) ? `\`${r5.users.get(a._id).tag}\`` : 'Não Encontrado').join(' **-** ')
    
    if(!fundador) fundador = "Nenhum"
        if(!administradores) administradores = "Nenhum"
            if(!programadores) programadores = "Nenhum"
                if(!moderadores) moderadores = "Nenhum"
                  if(!supervisor) supervisor = "Nenhum"

    message.channel.startTyping()
    const embedSTAFF = new Discord.RichEmbed()

   .setAuthor(r5.user.username, r5.user.displayAvatarURL)
   .addField(`Fundadores(as):`, `${fundador}`)
   .addField(`Administradores(as):`, `${administradores}`)
   .addField(`Desenvolvedores(as):`, `${programadores}`)
   .addField(`Moderadores(as):`, `${moderadores}`)
   .addField(`Supervisores(as):`,`${supervisor}`)
   .setColor("RANDOM")
   .setTimestamp()
   .setFooter(`${message.author.username}`, message.author.displayAvatarURL)    
   .setThumbnail(r5.user.displayAvatarURL)

    message.channel.send(embedSTAFF);
    message.channel.stopTyping();

    })
} catch (e) {
    console.log(`Erro no comando de Staff - Erro: ${e}`);
    }
}

module.exports.help = {
    name: 'staff',
    aliases: ['equipe', 's']
}