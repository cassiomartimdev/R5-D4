const { RichEmbed } = require("discord.js");
const sql = require("../../database/db.js");

exports.run = async (r5, message, args) => {

    let s = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'setad');
    let c = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'certo');
    let e = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'erro');
    let a = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'aviso');

    try {
        sql.Usuarios.findOne({_id: message.author.id}, function (erro, usuario) {
            sql.Servidores.findOne({_id: message.guild.id}, function (erro, server) {

                if (usuario.fundador || message.member.hasPermission("MANAGE_MESSAGES")) {
                    if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
                        return message.channel.send(`${e} \`${message.author.tag}\` não possuo permissão para deletar mensagens. Para o comando funcionar eu devo possuir a permissão \`GERENCIAR MENSAGENS\`!`);

                    const deleteCount = parseInt(args[0], 10);

                    if (!deleteCount || deleteCount < 2 || deleteCount > 100) {

                        message.channel.send(`${a} \`${message.author.tag}\` utilize o comando: \`${server.prefix}clear <valor>\`.`);

                    } else if (isNaN(args[0])) {

                        message.channel.send(`${e} \`${message.author.tag}\` somente números podem ser utilizados!`);

                    } else {

                        var fetched = message.channel.fetchMessages({limit: deleteCount});
                        message.channel.bulkDelete(fetched).then(gg => {

                            message.channel.send(`${c} \`${message.author.tag}\` você excluiu \`${args[0]}\` mensagens no canal \`${message.channel.name}\``);
                        }).catch(erro => {

                            message.channel.send(`${e} \`${message.author.tag}\` eu não consigo excluir mensagens enviadas a mais de \`14\` dias!`);

                        })
                    }
                } else {
                    return message.channel.send(`${e} \`${message.author.tag}\` você não tem permissão para executar o comando. Para utilizá-lo, você deve possuir a permissão \`GERENCIAR MENSAGENS\`!`);
                }
            })
        })
    } catch (err) {
        console.log(`[R5-D4] Ocorreu um erro no clear.js:\n${err}`);
        message.channel.send(`${e} \`${message.author.tag}\` ocorreu um erro ao tentar executar o comando!`);
    }
}

module.exports.help = {
    name: 'clear',
    aliases: ['']
}
