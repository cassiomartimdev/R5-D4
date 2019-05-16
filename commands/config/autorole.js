const Discord = require("discord.js");
const { Constants } = require("../../utils");
const sql = require("../../database/db.js");

module.exports.run = (r5, message, args) => {

    let s = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'setad');
    let c = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'certo');
    let e = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'erro');
    let m = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'menu');
    let mt = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'monitor');
    let off = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'off');
    let on = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'on');

    let role = message.mentions.roles.first();

    sql.Servidores.findOne({_id: message.guild.id}, function(erro, doc) {

        let autorole;

        if (!doc.autorole) autorole = `${Constants.OFF} | Status: **(Desativado)**`;
        else autorole = `${Constants.ON} | Status: **(Ativado)**`;

        let autoroleid;

        if (doc.autoroleid === 'Nenhum') {
            autoroleid = `${Constants.MONITOR} | Cargo de autorole: **(${doc.autoroleid})**`;
        } else {
            autoroleid = `${Constants.MONITOR} | Cargo de autorole: **(<@&${doc.autoroleid}>)**`;
        }

        const info = new Discord.RichEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setDescription(`${Constants.MENU} Menu de \`configurações\` de \`autorole\` do servidor!
          
          ${autorole}
          ${autoroleid}`)
            .setFooter(`Comando utilizado por: ${message.author.tag}`, message.author.avatarURL)
            .setTimestamp()

        if (!args[0]) return message.channel.send(info);

        switch (args[0]) {

            case 'role':

                if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                    return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);

                if (!role) return message.channel.send(info);

                if (role.id === doc.autoroleid) {
                    return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` a role <@&${doc.autoroleid}> ja está setada no \`autorole\`.`);
                } else {

                    doc.autoroleid = role.id;
                    doc.save();

                    message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` você setou o \`autorole\` para a role <@&${doc.autoroleid}>.`);
                    break;
            }

            case 'remover':

                if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                    return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);

                if (!doc.autorole) {
                    return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` o \`autorole\` não está habilitado para você \`remove-lo\` do servidor!`);
                } else {

                    doc.autoroleid = 'Nenhum';
                    doc.save();

                    message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` você removeu o \`autorole\` do servidor!`);
                    break;
                }

            case 'on':

                    if (doc.autorole === true) {
                        return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` o status de \`autorole\` ja está ativado!`);

                    } else {

                        doc.autorole = true;
                        doc.save().then(async () => {
                            await message.channel.send(`${Constants.CERTO} \`${message.author.tag}\` o status do sistema de \`autorole\` do servidor foi alterado para \`on\`.`);
                        })
                        break;
                    }
            
                    case 'off':

                    if (doc.autorole === false) {
                        return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` o status de \`autorole\` ja está desativado!`);

                    } else {

                        doc.autorole = false;
                        doc.save().then(async () => {
                            await message.channel.send(`${Constants.CERTO} \`${message.author.tag}\` o status do sistema de \`autorole\` do servidor foi alterado para \`off\`.`);
                        })
                        break;
                    }

                    case 'help':
                      const helpEmbed = new Discord.RichEmbed()
                       .setAuthor(`Ajuda para configuração de autorole:`, r5.user.avatarURL)
                       .setDescription(`
                       \`${doc.prefix}autorole role <role-mention>\` - O cargo mencionado será setado como cargo principal, ou seja todos os novos membros receberam ele.
                       \`${doc.prefix}autorole remover\` - Remove o cargo atual do autorole, ou seja todos os membros novos não receberam mais nenhum cargo.
                       \`${doc.prefix}autorole on\` - Ativará o status do autorole, ou seja com isto o comando irá setar o cargo nos membros.
                       \`${doc.prefix}autorole off\` - Desativará o status do autorole, ou seja com isto o comando não irá mais setar o cargo nos membros.`)
                       .setColor("RANDOM")

                       message.channel.send(helpEmbed);
                      break;

                    default:
                    message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` configuração \`${args.slice(0).join(' ')}\` desconhecida, tente usar: \`role, remover, on, off ou help\`.`)
        }
    })
        }

        module.exports.help = {
            name: 'autorole',
            aliases: ['']
        }