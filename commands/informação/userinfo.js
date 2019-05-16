const Discord = require("discord.js");
const sql = require("../../database/db.js");
const moment = require("moment");
require("moment-duration-format");
moment.locale("pt-BR");

module.exports.run = (r5, message, args) => {

    const l = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'loading');
    const s = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'setad');
    const e = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'erro');
    const c = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'certo');

    const on = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'online');
    const off = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'offline');
    const au = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'ausente');
    const tr = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'transmitindo');
    const oc = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'ocupado');

    let usuario = message.guild.member(message.mentions.users.first() || message.author);


    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else {
        user = message.author;
    }


    let statusmebro;
    if(user.presence.status === "dnd") statusmebro = `${oc} Ocupado`;
    if(user.presence.status === "idle") statusmebro = `${au} Ausente`;
    if(user.presence.status === "stream") statusmebro = `${tr} Transmitindo`;
    if(user.presence.status === "offline") statusmebro = `${off} Offline`;
    if(user.presence.status === "online") statusmebro = `${on} Online`;

    let botinfo;
    if(user.bot === true) botinfo = "Sim";
    if(user.bot === false) botinfo = "Não";

    let roles = usuario.roles.map(r => `<@&${r.id}>`).slice(1).join('**,** ');
    if(roles.length === 0) roles = '`Nenhum`';

    let member = message.guild.member(user);

    const info = new Discord.RichEmbed()
        .setDescription(`${s} \`${message.author.tag}\` mencione o membro que quer ver as informações.`)
        .setColor("RANDOM")

    if (!user)
            return message.channel.send(info);

    sql.Usuarios.findOne({_id: message.author.id}, function(erro, usuario) {

               const embed = new Discord.RichEmbed()
                   .setDescription(`${l} \`${message.author.tag}\` carregando informações...`)
                   .setColor("RANDOM")

               message.channel.send(embed).then((m) => {

                   setImmediate(() => {

                       const info = new Discord.RichEmbed()
                           .setAuthor(user.username, user.avatarURL)
                           .setDescription(`${s} As informações do usuário ${user} foram enviadas logo abaixo.`)
                           .addField(`Nome:`, `\`${user.username}\``, true)
                           .addField(`Apelido:`, `\`${member.nickname !== null ? `${member.nickname}` : 'Nenhum'}\``, true)
                           .addField(`Discriminator:`, `\`${user.discriminator}\``, true)
                           .addField(`ID:`, `\`${user.id}\``, true)
                           .addField(`Vip:`, `\`${usuario.vip ? 'Sim' : 'Não'}\``, true)
                           .addField(`Sobre:`, `\`${usuario.sobre}\``, true)
                           .addField(`Última mensagem:`, `\`${member.lastMessage ? `\`${member.lastMessage}\`` : 'Nenhuma'}\``, true)
                           .addField(`Conta criada:`, `\`${moment(user.createdAt).format('LL')}\``, true)
                           .addField(`Entrou no servidor:`, `\`${moment(member.joinedAt).format('LL')}\``, true)
                           .addField(`Status:`, `${statusmebro}`, true)
                           .addField(`Robô:`, `\`${botinfo}\``, true)
                           .addField(`Cargos:`, roles, true)
                           .setColor("RANDOM")
                           .setThumbnail(user.avatarURL)
                           .setFooter(`Comando utilizado por: ${message.author.tag}`, message.author.avatarURL)
                           .setTimestamp()

                       m.edit(info);

                   }, 8000);
               })
    })
}

module.exports.help = {
    name: 'userinfo',
    aliases: ['perfil']
}