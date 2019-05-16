const { Constants } = require("../../utils");
const sql = require("../../database/db.js");

module.exports.run = (r5, message, args) => {

    sql.Usuarios.findOne({_id: message.author.id}, function(erro, usuario) {

        sql.Servidores.findOne({_id: message.guild.id}, function (erro, serv) {


            let user = message.mentions.users.first();

                if (!serv.rep) return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` o sistema de \`reputações\` está \`desativado\` no servidor!`);

                if (!user) return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` mencione o membro que quer dar \`reputação\`!`);

                if (user.id === message.author.id) return message.channel.send(`${Constants.AVISO} \`${message.author.tag}\` você não pode adicionar \`reputação\` a si mesmo!`);
                if (user.bot) return message.channel.send(`${Constants.AVISO} \`${message.author.tag}\` robôs não podem receber \`reputação\`!`);

                let membro = message.guild.members.get(user.id);
                let temCargo = false;
                for (let i = 0; i < serv.repRole.length; i++) {
                    if (membro.roles.has(serv.repRole[i])) {
                        temCargo = true;
                    } else {
                        temCargo = false;
                    }
                }
                if (temCargo === true) {
                    let current = usuario.repTime;
                    if (current === 0)
                        current = Date.now() - 60 * 60 * 1E3;

                    if (new Date() >= current) {
                        usuario.repTime = Date.now() + 60 * 60 * 1E3;

                        sql.Usuarios.findOne({
                            "_id": message.mentions.users.first().id
                        }, function (err2, doc2) {

                            const reps = Math.floor(doc2.rep);
                            doc2.rep = Math.floor(reps + 1);
                            message.channel.send(`${Constants.CERTO} \`${message.author.tag}\` você deu \`+1\` ponto de \`reputação\` para o usuário \`${user.tag}\``);
                            doc2.save();
                            usuario.save();
                        })
                    } else {
                        let restante = current - Date.now();
                        let humanize = require('humanize-duration');
                        let humanize_config = {
                            language: 'pt',
                            conjunction: ' e ',
                            serialComma: false,
                            round: true,
                            units: ['d', 'h', 'm', 's']
                        };

                        message.channel.send(`${Constants.AVISO} \`${message.author.tag}\` você precisa aguardar \`${humanize(restante, humanize_config)}\` para utilizar o comando novamente!`);
                    }
                } else {
                    return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` O membro mencionado não possui o \`cargo\` para receber \`reputações\`!`);
                }
        })
    })
};

module.exports.help = {
    name: 'rep',
    aliases: ['']
};