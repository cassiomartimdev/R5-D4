const Discord = require("discord.js");
const { Constants } = require("../../utils");
const sql = require("../../database/db.js");

module.exports.run = (r5, message, args) => {

    var mention = message.mentions.channels.first();

    sql.Servidores.findOne({_id: message.guild.id}, function(erro, doc) {

        let contador;

        if (!doc.contador) contador = `${Constants.OFF} | Status: **(Desativado)**`;
        else contador = `${Constants.ON} | Status: **(Ativado)**`;

        let contadorchannel;

        if (doc.chatContador === 'Nenhum') {
            contadorchannel = `${Constants.MONITOR} | Canal de contador: **(${doc.chatContador})**`;
        } else {
            contadorchannel = `${Constants.MONITOR} | Canal de contador: **(<#${doc.chatContador}>)**`;
        }

        const n0 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'zero1');
        const n1 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'um');
        const n2 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'dois');
        const n3 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'tres');
        const n4 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'quatro');
        const n5 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'cinco');
        const n6 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'seis');
        const n7 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'sete');
        const n8 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'oito');
        const n9 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'nove');

        let membrosse =  `${r5.guilds.get(message.guild.id).memberCount.toString()}`;
        let contadorae = membrosse.split('').map(i => [n0, n1, n2, n3, n4, n5, n6, n7, n8, n9][i]).join('');
        let contadormsg;

        if (doc.contadormsg === 'Nenhuma') {
            contadormsg = `${Constants.TEXTO} | Mensagem do contador: **(${doc.contadormsg})**`;
        } else {
            contadormsg = `${Constants.TEXTO} | Mensagem do contador: ${doc.contadormsg.replace("{membros}", contadorae)}`;
        }

        const info = new Discord.RichEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setDescription(`${Constants.MENU} Menu de \`configurações\` de \`contador\` do servidor!
          
          ${contador}
          ${contadorchannel}
          ${contadormsg}`)
            .setFooter(`Comando utilizado por: ${message.author.tag}`, message.author.avatarURL)
            .setTimestamp()

        if (!args[0]) return message.channel.send(info);

        switch (args[0]) {

            case 'canal':

                if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                    return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);

                if (!mention)
                     return message.channel.send(info);

                if (mention.id === doc.chatContador) {
                     return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` o canal \`mencionado\` ja está setado como \`contador\`.`);
                } else {

                    doc.chatContador = mention.id;
                    doc.save();

                    message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` você setou o canal ${mention} como \`contador\`.`);
                    break;
                }

            case 'help':

                if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                    return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);

                    const helpEmbed = new Discord.RichEmbed()
                    .setAuthor(`Ajuda para configuração do contador:`, r5.user.avatarURL)
                    .setDescription(`
                    \`${doc.prefix}contador canal <channel-mention>\` - O canal mencionado será setado como contador, ou seja todos os novos membros serão registrados no topico com emoji.
                    \`${doc.prefix}contador remover\` - Remove o canal, mensagem e desativa o contador do servidor.
                    \`${doc.prefix}contador msg <mensagem>\` - A mensagem adicionada será a que será setada no topico. [ Use \`{membros}\` para pegar os membros ]
                    \`${doc.prefix}contador on\` - Ativará o status do contador, ou seja com isto o \`R5-D4\` irá setar o topico.
                    \`${doc.prefix}contador off\` - Desativará o status do contador, ou seja com isto o \`R5-D4\` não irá mais setar o topico.`)
                    .setColor("RANDOM")

                    message.channel.send(helpEmbed);
                   break;

            case 'msg':

                if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                    return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);

                if (doc.chatContador === 'Nenhum') {
                    return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` nenhum \`canal\` foi definido como \`contador\` para você utilizar está função!`);
                } else {

                    doc.contadormsg = args.slice(1).join(' ');
                    doc.save();

                    const n0 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'zero1');
                    const n1 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'um');
                    const n2 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'dois');
                    const n3 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'tres');
                    const n4 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'quatro');
                    const n5 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'cinco');
                    const n6 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'seis');
                    const n7 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'sete');
                    const n8 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'oito');
                    const n9 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'nove');

                    let membross =  `${r5.guilds.get(message.guild.id).memberCount.toString()}`;
                    let contadora = membross.split('').map(i => [n0, n1, n2, n3, n4, n5, n6, n7, n8, n9][i]).join('');
                    r5.guilds.get(message.guild.id).channels.get(doc.chatContador).setTopic(args.slice(1).join(' ').replace("{membros}", `${contadora}`));
                    message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` você definiu uma mensagem para o \`contador\` com sucesso!`);
                    break;
            }

            case 'on':

                    if (doc.contador === true) {
                        return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` o status de \`contador\` ja está ativado!`);
                    } else {

                        doc.contador = true;
                        doc.save().then(async () => {
                            await message.channel.send(`${Constants.CERTO} \`${message.author.tag}\` o status do sistema de \`contador\` do servidor foi alterado para \`on\`.`);
                        })
                        break;
                    }
                    case 'off':

                    if (doc.contador === false) {
                        return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` o status de \`contador\` ja está desativado!`);
                    } else {

                        doc.contador = false;
                        doc.save().then(async () => {
                            await message.channel.send(`${Constants.CERTO} \`${message.author.tag}\` o status do sistema de \`contador\` do servidor foi alterado para \`off\`.`);
                        })
                        break;
                    }

            case 'remover':

                if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                    return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);

                if (!doc.contador) {
                    return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` nenhum canal está setado como \`contador\` para você remover!`);
                } else {

                    r5.guilds.get(message.guild.id).channels.get(doc.chatContador).setTopic('');

                    doc.contador = false;
                    doc.chatContador = 'Nenhum';
                    doc.contadormsg = 'Nenhuma';
                    doc.save();

                    message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` você retirou o \`contador\` do servidor!`);
                    break;
                }

                    default:
                    message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` configuração \`${args.slice(0).join(' ')}\` desconhecida, tente usar: \`canal, remover, msg, on, off ou help\`.`)
        }
    })
}

module.exports.help = {
    name: 'contador',
    aliases: ['count']
}


