    
const sql = require("../../database/db.js");
const Discord = require("discord.js");
require("dotenv").config()

exports.run = (dev, message, args) => {

    const s = dev.guilds.get('568636670346526724').emojis.find(a => a.name === 'setad');
    const r = dev.guilds.get('568636670346526724').emojis.find(a => a.name === 'remover');
    const a = dev.guilds.get('568636670346526724').emojis.find(a => a.name === 'adicionar');
    const p = dev.guilds.get('568636670346526724').emojis.find(a => a.name === 'procurar');
    sql.Usuarios.findOne({_id: message.author.id}, function (erro, usuario) {
        sql.Servidores.findOne({_id: message.guild.id}, function(erro, servidor) {


 if (usuario) {

     if (usuario.fundador || usuario.administrador) {

         var razaou = args.slice(0).join(' ')

         if (!razaou.length < 1) {

             sql.Comandos.findOne({_id: args[0].toLowerCase()}, function (cerro, comando) {
                 if (comando) {
                     if (comando.manutenção) {
                         comando.manutenção = false
                         comando.save()
                         message.channel.send(`${r} \`${message.author.tag}\` você removeu o comando \`${args[0]}\` da \`manutenção\`.`)

                     } else {
                         comando.manutenção = true
                         comando.save()
                         message.channel.send(`${a} \`${message.author.tag}\` você adicionou o comando \`${args[0]}\` para \`manutenção\`.`)
                     }
                 } else {
                     message.channel.send(`${p} \`${message.author.tag}\` o comando \`${razaou}\` não foi \`encontrado\`.`)
                 }
             })
         } else {
             message.channel.send(`${s} \`${message.author.tag}\` utilize o comando: \`${servidor.prefix}manu/manutenção/m <comando>\`.`)
         }
     } else {
         message.channel.send(`${s} \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter o cargo \`Fundador ou Administrador\`.`)
     }
 }
    })
})
}

module.exports.help = {
  name: "manu",
  aliases: ["manutenção", "m"]
}