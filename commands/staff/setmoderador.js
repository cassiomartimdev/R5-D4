const sql = require("../../database/db.js"); 
const Discord = require("discord.js");
require("dotenv").config()

exports.run = async (dev, message, args, prefixo) => {

    const s = dev.guilds.get('568636670346526724').emojis.find(a => a.name == 'setad');
    const r = dev.guilds.get('568636670346526724').emojis.find(a => a.name == 'remover');
    const a = dev.guilds.get('568636670346526724').emojis.find(a => a.name == 'adicionar');

let razaou = args.slice(0).join(' ')
let member = message.mentions.users.first() ? message.mentions.users.first() : dev.users.get(args[0])

sql.Usuarios.findOne({_id: message.author.id}, function (erro, usuario) {
 
  if(usuario.fundador || usuario.administrador) {
    if(razaou.length < 1) {

        sql.Servidores.findOne({_id: message.guild.id}, function (erro, servidor) {
    
    message.channel.send(`${s} \`${message.author.tag}\` utilize o comando: \`${servidor.prefix}setmoderador/setm <usuário>\`.`).then(msg => msg.delete(5000));
        })
        } else {

sql.Usuarios.findOne({_id: member.id}, function (erro, usuario) {

            if (usuario) {
              if (usuario.fundador || usuario.moderador) {
                usuario.moderador = false
                usuario.save()
  
  message.channel.send(`${r} \`${message.author.tag}\` você removeu o cargo \`Moderador\` do usuário \`${member.tag}\`.`).then(msg => msg.delete(5000));

              } else {
                usuario.moderador = true
                usuario.save()
  
                message.channel.send(`${a} \`${message.author.tag}\` você adicionou o cargo \`Moderador\` no usuário \`${member.tag}\`.`).then(msg => msg.delete(5000));
              }
            } else {
            
            message.channel.send(`${s} \`${message.author.tag}\` o usuário \`${member.tag}\` não está \`registrado\` em meu \`Banco de Dados\`.`).then(msg => msg.delete(5000));
            }
          })
        }
      } else {
        message.channel.send(`${s} \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter o cargo \`Fundador ou Administrador\`.`).then(msg => msg.delete(5000));
    }
})
}


module.exports.help = {
    name: 'setmoderador',
    aliases: ['setm']
}