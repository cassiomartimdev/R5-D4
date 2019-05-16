const { Constants, R5Embed } = require("../../utils");
const db = require("../../database/db.js");

module.exports.run = (r5, message) => {

     db.Servidores.findOne({_id: message.guild.id}, function(erro, server) {

         const canal = message.mentions.channels.first();

         if (!canal) return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` mencione o canal que quer adicionar/remover da lista de canais ignorados.`);

         if (server.ignore.includes(canal.id)) {
             db.Servidores.updateOne({
                     _id: message.guild.id},
                 { $pull: { ignore: canal.id }
                 }, { upsert: true }).then(async() => {
                     await message.channel.send(`${Constants.REMOVER} \`${message.author.tag}\` você removeu o canal \`${canal.name}\` da lista de canais ignorados.`);
             })
         } else {

             server.ignore.push(canal.id);
             server.markModified('ignore');
             server.save().then(async() => {
                 await message.channel.send(`${Constants.ADICIONAR} \`${message.author.tag}\` você adicionou o canal \`${canal.name}\` na lista de canais ignorados.`);
             })
         }
     })
}

module.exports.help = {
    name: 'ignore',
    aliases: ['']
}