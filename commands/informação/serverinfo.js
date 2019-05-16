const { Constants, R5Embed } = require("../../utils");
const sql = require("../../database/db.js");
const moment = require("moment");
moment.locale("pt-BR");

module.exports.run = (r5, message) => {

    const regionServer = {
        'amsterdam' : ':flag_nl: Amsterdã',
        'brazil'    : ':flag_br: Brasil',
        'eu-central': ':flag_eu: Europa Central',
        'eu-west'   : ':flag_eu: Europa Ocidental',
        'frankfurt' : ':flag_de: Frankfurt',
        'hongkong'  : ':flag_hk: Hong Kong',
        'japan'     : ':flag_ja: Japão',
        'london'    : ':flag_gb: Londres',
        'russia'    : ':flag_ru: Russia',
        'singapore' : ':flag_sg: Singapura',
        'sydney'    : ':flag_au: Sydney',
        'us-central': ':flag_us: EUA Central',
        'us-east'   : ':flag_us: EUA Oriental',
        'us-west'   : ':flag_us: EUA Ocidental',
        'us-south'  : ':flag_us: EUA Sul',
    }[message.guild.region];

    const verification = ['Nenhuma', 'Precisa ter um e-mail verificado em sua conta do Discord.', 'Também precisa ser registrado no Discord por pelo menos 5 minutos.', 'Também precisa ser um membro deste servidor por pelo menos 10 minutos.', 'Precisa ter um telefone verificado em sua conta do Discord.'];

    const embed = new R5Embed(message.author);

    embed.setAuthor(message.guild.name, message.guild.iconURL);
    
    embed.addField(`Dono:`, `\`${message.guild.owner.user.tag}\``);
    embed.addField(`Nome:`, `\`${message.guild.name}\``);
    embed.addField(`ID:`, `\`${message.guild.id}\``);
    embed.addField(`Região`, regionServer);
    embed.addField(`Verificação:`, `\`${verification[message.guild.verificationLevel]}\``)
    embed.addField(`Criado em:`, `\`${moment(message.guild.createdAt).format("LLLL")}\``);
    embed.addField(`R5-D4 entrou em:`, `\`${moment(message.guild.joinedAt).format("LLLL")}\``);
    embed.addField(`Membros:`, `
    \`${message.guild.memberCount}\`
    ${Constants.USER_ONLINE} ${message.guild.members.filter(a => a.presence.status === 'online').size} ${Constants.USER_OFFLINE} ${message.guild.members.filter(a => a.presence.status === 'offline').size} ${Constants.USER_OCUPADO} ${message.guild.members.filter(a => a.presence.status === 'dnd').size} ${Constants.USER_AUSENTE} ${message.guild.members.filter(a => a.presence.status === 'idle').size} ${Constants.USER_TRANSMITINDO} ${message.guild.members.filter(a => a.presence.status === 'streaming').size}`);
    embed.addField(`Canais:`, `\`${message.guild.channels.size}\`
    ${Constants.TEXTO} ${message.guild.channels.filter(c => c.type === 'text').size} ${Constants.VOZ} ${message.guild.channels.filter(c => c.type === 'voice').size} ${Constants.INBOX} ${message.guild.channels.filter(c => c.type === 'category').size}`);
    embed.addField(`Robôs:`, `\`${message.guild.members.filter(m => m.user.bot).size}\``);
    embed.addField(`Emojis:`, `\`${message.guild.emojis.size ? message.guild.emojis.size : 'Nenhum'}\``);
    embed.addField(`Canal de AFK:`, `\`${message.guild.afkChannel ? message.guild.afkChannel : 'Nenhum'}\``);
    embed.addField(`Cargos:`, `\`${message.guild.roles.size ? message.guild.roles.size : 'Nenhuma'}\``);
    
    embed.setThumbnail(message.guild.iconURL);

    message.channel.send(embed);
}

module.exports.help = {
    name: 'serverinfo',
    aliases: ['']
}