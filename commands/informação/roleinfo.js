const { RichEmbed } = require("discord.js");
const sql = require("../../database/db.js");
const moment = require("moment");
moment.locale("pt-BR");

module.exports.run = (r5, message, args) => {

    const s = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'setad');
    const e = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'erro');
    const c = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'certo');
    const a = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'aviso');
    const role = message.mentions.roles.first() || message.guild.roles.find(r => r.name === args.join(' ')) || message.guild.roles.find(r => r.id === args.join(' ')) || message.guild.roles.get(args.join(' '));

    if (!args[0]) {
        return message.channel.send(`${e} \`${message.author.tag}\` mencione ou digite o \`ID\` ou \`NOME\` do cargo que quer ver as informações.`);
    }

    if (!role) {
        return message.channel.send(`${e} \`${message.author.tag}\` cargo não encontrado.`);
    }

    trad = {
        "CREATE_INSTANT_INVITE": "`Criar convite instantâneo`",
        "KICK_MEMBERS": "`Expulsar usuários`",
        "BAN_MEMBERS": "`Banir usuários`",
        "ADMINISTRATOR": "`Administrador`",
        "MANAGE_CHANNELS": "`Gerenciar canais`",
        "MANAGE_GUILD": "`Gerenciar servidor`",
        "ADD_REACTIONS": "`Adicionar reação`",
        "VIEW_AUDIT_LOG": "`Ver registro de auditoria`",
        "VIEW_CHANNEL": "`Ver canais`",
        "READ_MESSAGES": "`Ver mensagens`",
        "SEND_MESSAGES": "`Enviar mensagens`",
        "SEND_TTS_MESSAGES": "`Enviar mensagens com aúdio`",
        "MANAGE_MESSAGES": "`Gerenciar mensagens`",
        "EMBED_LINKS": "`Links em embed`",
        "ATTACH_FILES": "`Arquivos arquivados`",
        "READ_MESSAGE_HISTORY": "`Ver histórico de mensagens`",
        "MENTION_EVERYONE": "`Mencionar todos`",
        "EXTERNAL_EMOJIS": "`Emojis externos`",
        "USE_EXTERNAL_EMOJIS": "`Usar emojis externos`",
        "CONNECT": "`Conectar`",
        "SPEAK": "`Falar`",
        "MUTE_MEMBERS": "`Silenciar usuários`",
        "DEAFEN_MEMBERS": "`Perdoar usuários`",
        "MOVE_MEMBERS": "`Mover usuários`",
        "USE_VAD": "`Usar detecção de voz`",
        "PRIORITY_SPEAKER": "`Prioridade para falar`",
        "CHANGE_NICKNAME": "`Trocar apelido`",
        "MANAGE_NICKNAMES": "`Gerenciar apelidos`",
        "MANAGE_ROLES": "`Gerenciar cargos`",
        "MANAGE_ROLES_OR_PERMISSIONS": "`Gerenciar cargos e permissões`",
        "MANAGE_WEBHOOKS": "`Gerenciar webhooks`",
        "MANAGE_EMOJIS": "`Gerenciar emojis`"
    },
        perms = Object.entries(role.serialize()).filter(([, has]) => has).map(([perm]) => `${trad[perm]}`).join(', ');

    const infoRole = new RichEmbed();
    infoRole.setAuthor(message.guild.name, message.guild.iconURL);
    infoRole.addField(`Nome:`, `\`${role.name}\``);
    infoRole.addField(`ID:`, `\`${role.id}\``);
    infoRole.addField(`Criado em:`, `\`${moment(role.createdAt).format("LLLL")}\``)
    infoRole.addField(`Posição:`, `\`${role.calculatedPosition}\` (de \`${message.guild.roles.size - 1}\`)`);
    infoRole.addField(`Mencionavel:`, `\`${role.mentionable ? 'Sim' : 'Não'}\``);
    infoRole.addField(`Membros:`, `\`${role.members.size}\`
    ${role.members.map(r => r.user.tag).join(', ') ? '`' + role.members.map(r => r.user.tag).join(', ') + '`' : ''}`);
    infoRole.addField(`Permissões:`, `${perms}`);
    infoRole.setColor(role.color);

    message.channel.send(infoRole);
};

module.exports.help = {
    name: 'roleinfo',
    aliases: ['']
}

