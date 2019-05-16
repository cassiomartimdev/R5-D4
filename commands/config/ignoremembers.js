const { Constants, R5Embed } = require("../../utils");
const db = require("../../database/db.js");

module.exports.run = (r5, message) => {

    db.Servidores.findOne({_id: message.guild.id}, function(erro, server) {

        const canal = message.mentions.channels.first();

        if (!canal) return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` mencione o canal que quer adicionar/remover da lista de canais ignorados por membros.`);

        if (server.ignoremembers.includes(canal.id)) {
            db.Servidores.updateOne({
                    _id: message.guild.id},
                { $pull: { ignoremembers: canal.id }
                }, { upsert: true }).then(async() => {
                await message.channel.send(`${Constants.REMOVER} \`${message.author.tag}\` você removeu o canal \`${canal.name}\` da lista de canais ignorados por membros.`);
            })
        } else {

            server.ignoremembers.push(canal.id);
            server.markModified('ignoremembers');
            server.save().then(async() => {
                await message.channel.send(`${Constants.ADICIONAR} \`${message.author.tag}\` você adicionou o canal \`${canal.name}\` na lista de canais ignorados por membros.`);
            })
        }
    })
}

module.exports.help = {
    name: 'ignoremembers',
    aliases: ['']
}