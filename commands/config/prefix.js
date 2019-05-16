const Discord = require("discord.js");
const sql = require("../../database/db.js");
const { Constants } = require("../../utils");

module.exports.run = (r5, message, args) => {

    sql.Servidores.findOne({_id: message.guild.id}, function(erro, doc) {


        const embedInfo = new Discord.RichEmbed()
         .setAuthor(message.guild.name, message.guild.iconURL)
         .setDescription(`${Constants.MENU} Menu de \`configurações\` de \`prefixo\` do servidor!
         
         Prefixo: \`${doc.prefix}\``)
         .setFooter(`Comando utilizado por: ${message.author.tag}`, message.author.avatarURL)
         .setTimestamp()

        if (!args[0]) return message.channel.send(embedInfo);

        switch (args[0]) {

            case 'setar':

                if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                    return message.channel.send(`$${Constants.SETAD} \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);


                if (!args[0]) return message.channel.send(`$${Constants.SETAD} \`${message.author.tag}\` utilize o comando: \`${doc.prefix}prefix/prefixconfig add <prefixo> / ${doc.prefix}prefix/config reset\`.`);

                if (args[1].length > 3) {
                    return message.channel.send(`$${Constants.SETAD} \`${message.author.tag}\` o maximo de caracteres permitido é \`3\`.`);
                }
                if (args[1] === doc.prefix) {
                      return message.channel.send(`$${Constants.SETAD} \`${message.author.tag}\` o prefixo \`indicado\` ja está adicionado.`);
                } else {

                    doc.prefix = args[1];
                    doc.save();

                    message.channel.send(`$${Constants.SETAD} \`${message.author.tag}\` você adicionou o prefixo \`${args[1]}\` no servidor.`);
                    break;
            }

            case 'resetar':

                if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                    return message.channel.send(`$${Constants.SETAD} \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);

                if (doc.prefix === 'r5') {
                     return message.channel.send(`$${Constants.SETAD} \`${message.author.tag}\` o prefixo já foi resetado. Altere para outro para resetar novamente!`);
                } else {

                    doc.prefix = 'r5';
                    doc.save();

                    message.channel.send(`$${Constants.SETAD} \`${message.author.tag}\` você resetou o \`prefixo\` do servidor!`);
                    break;
                }

                case 'help':

                if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                    return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);

                    const helpEmbed = new Discord.RichEmbed()
                    .setAuthor(`Ajuda para configuração do prefixo:`, r5.user.avatarURL)
                    .setDescription(`
                    \`${doc.prefix}prefix setar <prefixo>\` - Ao alterar o prefixo o bot só atenderá pelo prefixo imposto.
                    \`${doc.prefix}prefix resetar\` - O prefixo irá voltar ao default ou seja \`r5\``)
                    .setColor("RANDOM")

                    message.channel.send(helpEmbed);
                   break;

                    default:
                    message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` configuração \`${args.slice(0).join(' ')}\` desconhecida, tente usar: \`setar, resetar ou help\`.`)
        }
    })
}

module.exports.help = {
    name: 'prefix',
    aliases: ['']
}