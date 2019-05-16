const { Constants } = require("../../utils");
const sql = require("../../database/db.js");

module.exports.run = (r5, message, args) => {

        const membro = message.mentions.users.first() || message.guild.members.find(r => r.id === args.join(' ')) || message.guild.members.get(args.join(' '));

        if (!args[0]) {
        return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` mencione o membro que quer ver os status de reputação.`);
        }

        if (!membro) {
        return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` usuário não encontrado.`);
        }

        sql.Usuarios.findOne({
            "_id": membro.id
        }, function (erro, user) {

            if (user) {

            if (user.rep == 0) {
                 return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` o usuário \`${membro.tag || membro.user.tag}\` tem a reputação zerada.`)
            }

        message.channel.send(`${Constants.CERTO} \`${message.author.tag}\` o membro \`${membro.tag || membro.user.tag}\` tem uma reputação de \`${user.rep}\` pontos.`);
        } else {
            return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` o usuário mencionado não está registrado na \`SQL\`!`);
        }
    })

}

module.exports.help = {
    name: 'repstatus',
    aliases: ['']
}