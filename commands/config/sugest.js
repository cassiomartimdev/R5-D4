const sql = require("../../database/db.js");
const Discord = require("discord.js");

module.exports.run = (r5, message, args) => {

    let s = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'setad');
    let c = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'certo');
    let e = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'erro');
    let m = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'menu');
    let mt = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'monitor');
    let off = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'off');
    let on = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'on');

    sql.Servidores.findOne({_id: message.guild.id}, function(erro, doc) {

        if (!message.guild.member(message.author.id).hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES"))
            return message.channel.send(`${s} \`${message.author.tag}\` você não tem permissão para utilizar este comando! Para utilizá-lo você deve possuir a permissão \`ADMINISTRATOR\`.`);

        let sugest;

        if (!doc.sugest) sugest = `${off} | Status: **(Desativado)**`;
        else sugest = `${on} | Status: **(Ativado)**`;

        let sugestchannel;

        if (doc.sugestchannel === 'Nenhum') {
            sugestchannel = `${mt} | Canal de sugestões: **(${doc.sugestchannel})**`;
        } else {
            sugestchannel = `${mt} | Canal de sugestões: **(<#${doc.sugestchannel}>)**`;
        }

        const info = new Discord.RichEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setDescription(`${m} Menu de \`configurações\` de \`sugestões\` do servidor!
          
          ${sugest}
          ${sugestchannel}`)
            .setFooter(`Comando utilizado por: ${message.author.tag}`, message.author.avatarURL)
            .setTimestamp()

            if (!args[0]) return message.channel.send(info);

            switch (args[0]) {

                case 'remover':

                            if (!doc.sugest) {
                                return message.channel.send(`${e} \`${message.author.tag}\` o sistema de sugestão não está ativado para você remover.`);
                            } else {

                                doc.sugest = false;
                                doc.sugestchannel = 'Nenhum';
                                doc.save().then(async () => {
                                    await message.channel.send(`${c} \`${message.author.tag}\` você removeu o canal de \`sugestões\`!`);
                                });
                                break;
                }

                case 'canal':

                    let canal = message.mentions.channels.first();

                    if (!canal)
                        return message.channel.send(`${e} \`${message.author.tag}\` mencione o canal que quer setar como \`sugestões\`.`);

                    if (canal.id === doc.sugestchannel) {
                        return message.channel.send(`${e} \`${message.author.tag}\` o canal mencionado ja está setado como \`sugestões\`.`);
                    } else {

                        doc.sugestchannel = canal.id;
                        doc.save().then(async () => {
                            await message.channel.send(`${c} \`${message.author.tag}\` o canal de sugestões foi alterado com sucesso para ${canal}`);
                        })
                        break;
                }

                case 'on':

                        if (doc.sugest === true) {
                            return message.channel.send(`${e} \`${message.author.tag}\` o status de \`sugestão\` ja está ativado!`);
                        } else {

                            doc.sugest = true;
                            doc.save().then(async () => {
                                await message.channel.send(`${c} \`${message.author.tag}\` o status do sistema de \`sugestões\` do servidor foi alterado para \`on\`.`);
                            })
                            break;
                }
                case 'off':

                        if (doc.sugest === false) {
                            return message.channel.send(`${e} \`${message.author.tag}\` o status de \`sugestão\` ja está desativado!`);
                        } else {

                            doc.sugest = false;
                            doc.save().then(async () => {
                                await message.channel.send(`${c} \`${message.author.tag}\` o status do sistema de \`sugestões\` do servidor foi alterado para \`off\`.`);
                            });
                            break;
                        }

                case 'help':
        
                        const helpEmbed = new Discord.RichEmbed()
                         .setAuthor(`Ajuda para configuração de sugestões:`, r5.user.avatarURL)
                         .setDescription(`
                         \`${servidor.prefix}sugest canal <channel-mention>\` - O canal mencionado será setado como sugestão, ou seja todas as mensagens enviadas neste canal serão reagidas pelo \`R5-D4\`.
                         \`${servidor.prefix}sugest remover\` - Remove o canal e desativa a sugestão do servidor.
                         \`${servidor.prefix}sugest on\` - Ativará o status de sugestão do servidor, ou seja apartir do momento que foi ativado as mensagens serão reagidas.
                         \`${servidor.prefix}sugest off\` - Desativará o status de sugestão do servidor, ou seja apartir do momento que foi desativado as mensagens não serão mais reagidas.`)
                         .setColor("RANDOM")
        
                            message.channel.send(helpEmbed);
                           break;        

                         default:
                         message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` configuração \`${args.slice(0).join(' ')}\` desconhecida, tente usar: \`canal, remover, on, off ou help\`.`)
            }
    })
}

module.exports.help = {
    name: 'sugest',
    aliases: ['']
}