const { RichEmbed } = require("discord.js");
const sql = require("../../database/db.js");

module.exports.run = (r5, message, args) => {

    const s = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'setad');
    const e = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'erro');
    const c = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'certo');
    const a = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'aviso');
    let on = r5.guilds.get('568636670346526724').emojis.find(on => on.name === 'on');
    let off = r5.guilds.get('568636670346526724').emojis.find(off => off.name === 'off');
    let m = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'menu');
    let mt = r5.guilds.get('568636670346526724').emojis.find(off => off.name === 'monitor');

    let role = message.mentions.roles.first();

    sql.Servidores.findOne({_id: message.guild.id}, function(erro, doc) {

        if (!message.guild.member(message.author.id).hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) {
            return message.channel.send(`${e} \`${message.author.tag}\` você não tem permissão para executar o comando! Para utilizá-lo, você deve possuir a permissão \`ADMINISTRADOR\`!`);
        }

        let rep;

        if (!doc.rep) rep = `${off} | Status: **(Desativado)**`;
        else rep = `${on} | Status: **(Ativado)**`;

        const info = new RichEmbed();
        info.setAuthor(message.guild.name, message.guild.iconURL);
        info.setDescription(`${m} Menu de \`configurações\` de \`reputação\` do servidor!
          
          ${rep}
          ${mt} | Cargo(s) de reputação: **(${doc.repRole.map(role => message.guild.roles.get(role)).join(', ') || 'Nenhum'})**`);
        info.setFooter(`Comando utilizado por: ${message.author.tag}`, message.author.avatarURL);
        info.setTimestamp();

        if (!args[0]) return message.channel.send(info);

         switch (args[0]) {

             case 'on':
                 doc.rep = true;
                 doc.save();
                 message.channel.send(`${c} \`${message.author.tag}\` você alterou o \`status\` de \`reputação\` para \`on\`!`);
                 break;

             case 'off':
                 doc.rep = false;
                 doc.save();
                 message.channel.send(`${c} \`${message.author.tag}\` você alterou o \`status\` de \`reputação\` para \`off\`!`);
                 break;

             case 'remover':

                 if (!role) return message.channel.send(`${e} \`${message.author.tag}\` mencione o cargo que quer remover como \`reputações\`!`);

                 if (!doc.repRole.includes(role.id)) return message.channel.send(`${e} \`${message.author.tag}\` o cargo mencionado não está adicionado como \`reputações\`!`);

                 sql.Servidores.updateOne({
                     _id: message.guild.id},
                     { $pull: { repRole: role.id }
                     }, { upsert: true }).then(async() => {
                     await message.channel.send(`${c} \`${message.author.tag}\` você removeu o cargo \`${role.name}\` como \`reputações\`!`);
                 });
                 break;

             case 'role':

                 if (!role) return message.channel.send(`${e} \`${message.author.tag}\` mencione o cargo que quer setar como \`reputações\`!`);

                 if (doc.repRole.includes(role.id))
                     return message.channel.send(`${e} \`${message.author.tag}\` o cargo mencionado ja está adicionado como \`reputações\`!`);

                     doc.repRole.push(role.id);
                     doc.markModified('repRole');
                     doc.save();

                     message.channel.send(`${c} \`${message.author.tag}\` você adicionou o cargo \`${role.name}\` como \`reputações\`!`);
                     break;

                     case 'help':

     
                         const helpEmbed = new RichEmbed()
                         helpEmbed.setAuthor(`Ajuda para configuração do repconfig:`, r5.user.avatarURL);
                         helpEmbed.setDescription(`
                         \`${doc.prefix}repconfig role <role-mention>\` - O cargo mencionado será adicionado para os cargos que podem receber reputação no servidor.
                         \`${doc.prefix}repconfig remover <role-mention>\` - Remove o cargo mencionado de receber reputações.
                         \`${doc.prefix}repconfig on\` - Ativará o status de reputação do servidor, ou seja apartir do momento que foi ativado será possivel dar reputação.
                         \`${doc.prefix}repconfig off\` - Desativará o status de reputação do servidor, ou seja apartir do momento que foi desativado não será mais possivel dar reputação.`);
                         helpEmbed.setColor("RANDOM");
     
                         message.channel.send(helpEmbed);
                        break;
 
                 default:
                     message.channel.send(`${e} \`${message.author.tag}\` configuração de reputação \`${args.slice(0).join(' ')}\` desconhecida, tente utilizar: \`on, off, role, remover ou help\`.`);
                     break;
         }
    })
}

module.exports.help = {
    name: 'repconfig',
    aliases: ['']
}