const Discord = require("discord.js");
const { Constants } = require("../../utils");
const sql = require("../../database/db.js");

module.exports.run = (r5, message, args) => {

    var mention = message.mentions.channels.first();

    sql.Servidores.findOne({_id: message.guild.id}, function(erro, doc) {

        let byebye;

        if (!doc.byebye) byebye = `${Constants.OFF} | Status: **(Desativado)**`;
        else byebye = `${Constants.ON} | Status: **(Ativado)**`;

        let byebyechannel;

        if (doc.byebyechannel === 'Nenhum') {
            byebyechannel = `${Constants.MONITOR} | Canal de saida: **(${doc.byebyechannel})**`;
        } else {
            byebyechannel = `${Constants.MONITOR} | Canal de saida: **(<#${doc.byebyechannel}>)**`;
        }

        let byebyemsg;

        if (doc.byebyemsg === 'Nenhuma') {
            byebyemsg = `${Constants.TEXTO} | Mensagem de saida: **(${doc.byebyemsg})**`;
        } else {
            byebyemsg = `${Constants.TEXTO} | Mensagem de saida: ${doc.byebyemsg}`;
        }

        const info = new Discord.RichEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setDescription(`${Constants.MENU} Menu de \`configurações\` de \`saida\` do servidor!
          
          ${byebye}
          ${byebyechannel}
          ${byebyemsg}`)
            .setFooter(`Comando utilizado por: ${message.author.tag}`, message.author.avatarURL)
            .setTimestamp()

        if (!args[0]) return message.channel.send(info);

        switch (args[0]) {

            case 'canal':

                if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                    return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);

                if (!mention) return message.channel.send(info);

                if (mention.id === doc.byebyechannel) {
                    return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` o canal \`informado\` ja está definido como \`byebye\`.`);
                } else {

                    doc.byebyechannel = mention.id;
                    doc.save();

                    message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` você definiu o canal ${mention} como \`byebye\`.`);
                    break;
                }

            case 'msg':

                if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                    return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);


                if (doc.byebyechannel === 'Nenhum') {
                    return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` nenhum canal foi setado para \`byebye\` para você adicionar a \`mensagem\`.`);
                } else {

                    doc.byebyemsg = args.slice(1).join(' ');
                    doc.save();

                    message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` você definiu a mensagem do canal <#${doc.welcomechannel}> para: ${args.slice(1).join(' ')}`);
                    break;
                }

            case 'remover':

                if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                    return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);

                if (!doc.byebye) {
                    message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` não existe nenhum \`canal\` setado para o \`byebye\`.`);
                } else {

                    doc.byebye = false;
                    doc.byebyechannel = 'Nenhum'
                    doc.byebyemsg = 'Nenhuma';
                    doc.save();

                    message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` você removeu o \`canal\` atual do \`byebye\``);
                    break;
                }

            case 'on':

                    if (doc.byebye === true) {
                        return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` o status de \`saida\` ja está ativado!`);
                    } else {

                        doc.byebye = true;
                        doc.save().then(async () => {
                            await message.channel.send(`${Constants.CERTO} \`${message.author.tag}\` o status do sistema de \`saida\` do servidor foi alterado para \`on\`.`);
                        })
                        break;
                    }
                
                    case 'off':

                    if (doc.byebye === false) {
                        return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` o status de \`saida\` ja está desativado!`);
                    } else {

                        doc.byebye = false;
                        doc.save().then(async () => {
                            await message.channel.send(`${Constants.CERTO} \`${message.author.tag}\` o status do sistema de \`saida\` do servidor foi alterado para \`off\`.`);
                        })
                        break;
                    }

            case 'help':

                if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                    return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);

                const embed = new Discord.RichEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL)
                    .setDescription(`
                  **- FORMAS DE USAR -**
                  
                  \`${doc.prefix}byebye canal <canal-mention>\` - O canal mencionado será setado como o canal aonde todas as mensagens de saida serão envidas.
                  \`${doc.prefix}byebye msg <mensagem>\` - A mensagem que será enviada após o usuário sair do servidor.
                  \`${doc.prefix}byebye remover\` - Remove o canal atual aonde as mensagens são enviadas, a mensagem e também desativa o sistema de saida.
                  \`${doc.prefix}byebye on\` - Ativa o sistema de saida do servidor, ou seja apartir dai a mensagem será enviada.
                  \`${doc.prefix}byebye off\` - Desativa o sistema de saida do servidor, ou seja apartir dai a mensagem não será mais enviada.

                  **- PLACEHOLDERS -**

{usuario.id} - Pega a \`id\` do usuário. Exemplo: \`${message.author.id}\`
{usuario.nome} - Pega o \`nome\` do usuário. Exemplo: \`${message.author.username}\`
{usuario.tagnome} - Pega a \`tag/nome\` do usuário. Exemplo: \`${message.author.tag}\`
{usuario.tag} - Pega a \`tag\` do usuário. Exemplo: \`${message.author.discriminator}\`
{servidor} - Pega o \`nome\` do servidor. Exemplo: \`${message.guild.name}\`
{usuarios} - Pega o \`total\` de usuários no servidor. Exemplo: \`${message.guild.memberCount}\``)
                    .setFooter(message.author.tag, message.author.avatarURL)
                    .setTimestamp()

                message.channel.send(embed);
                break;

                default:
                    message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` configuração \`${args.slice(0).join(' ')}\` desconhecida, tente usar: \`canal, remover, msg, on, off ou help\`.`)
        }
    })
}

module.exports.help = {
    name: 'byebye',
    aliases: ['bye']
}