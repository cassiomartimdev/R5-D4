const Discord = require("discord.js");
const sql = require('../../database/db.js');
const { Constants } = require("../../utils");
require("dotenv").config()

module.exports.run = (r5, message, args) => {

    var mention = message.mentions.channels.first();

    sql.Servidores.findOne({
            "_id": message.guild.id
        },
        function (erra, servidor) {

            let logs;

            if (!servidor.logs) logs = `${Constants.OFF} | Status: **(Desativado)**`;
            else logs = `${Constants.ON} | Status: **(Ativado)**`;

            let logschannel;

            if (servidor.logschannel === 'Nenhum') {
                logschannel = `${Constants.MONITOR} | Canal de logs: **(${servidor.logschannel})**`;
            } else {
                logschannel = `${Constants.MONITOR} | Canal de logs: **(<#${servidor.logschannel}>)**`;
            }

            const info = new Discord.RichEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL)
                .setDescription(`${Constants.MENU} Menu de \`configurações\` de \`logs\` do servidor!
          
          ${logs}
          ${logschannel}`)
                .setFooter(`Comando utilizado por: ${message.author.tag}`, message.author.avatarURL)
                .setTimestamp()

            if (!args[0]) return message.channel.send(info);

            switch (args[0]) {

                case 'canal':

                    if (servidor && servidor.logschannel)
                        if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                            return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`GERENCIAR MENSAGENS\`.`);

                    if (!mention)
                        return message.channel.send(info);

                    if (mention.id === servidor.logschannel) {
                        return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` o canal \`indicado\` ja está setado como \`logs\`.`);
                    } else {

                        servidor.logschannel = mention.id
                        servidor.save();
                        message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` você definiu o canal ${mention} como \`logs\`.`)
                        break;
                    }

                case 'on':

                        if (servidor.logs === true) {
                            return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` o status de \`logs\` ja está ativado!`);
                        } else {

                            servidor.logs = true;
                            servidor.save().then(async () => {
                                await message.channel.send(`${Constants.CERTO} \`${message.author.tag}\` o status do sistema de \`logs\` do servidor foi alterado para \`on\`.`);
                            })
                            break;  
                     }

                case 'off':

                        if (servidor.logs === false) {
                            return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` o status de \`logs\` ja está desativado!`);
                        } else {

                            servidor.logs = false;
                            servidor.save().then(async () => {
                                await message.channel.send(`${Constants.CERTO} \`${message.author.tag}\` o status do sistema de \`logs\` do servidor foi alterado para \`off\`.`);
                            });
                            break;
                        }

                case 'remover':

                    if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                        return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`GERENCIAR MENSAGENS\`.`);

                    if (!servidor.logs) {
                        return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` nenhum \`canal\` está adicionado nas \`logs\` para ser removido.`);
                    } else {

                        servidor.logs = false;
                        servidor.logschannel = 'Nenhum';
                        servidor.save();
                        message.channel.send(`${Constants.CERTO} \`${message.author.tag}\` você removeu o \`canal\` atual das \`logs\`.`);
                        break;
                    }

                    case 'help':

                    if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                        return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);
    
                        const helpEmbed = new Discord.RichEmbed()
                        .setAuthor(`Ajuda para configuração de logs:`, r5.user.avatarURL)
                        .setDescription(`
                        \`${servidor.prefix}logs canal <channel-mention>\` - O canal mencionado será setado como logs, ou seja tudo o quê acontecer no servidor será enviado neste canal.
                        \`${servidor.prefix}logs remover\` - Remove o canal e desativa o logs do servidor.
                        \`${servidor.prefix}logs on\` - Ativará o status de logs do servidor, ou seja apartir do momento que foi ativado as logs serão enviadas.
                        \`${servidor.prefix}logs off\` - Desativará o status de logs do servidor, ou seja apartir do momento que foi desativado as logs não serão mais enviadas.`)
                        .setColor("RANDOM")
    
                        message.channel.send(helpEmbed);
                       break;

                    default:
                    message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` configuração \`${args.slice(0).join(' ')}\` desconhecida, tente usar: \`canal, remover, on, off ou help\`.`)
            }
        })
}

module.exports.help = {
    name: 'logs',
    aliases: ['log']
}