const Discord = require("discord.js");
const sql = require("../../database/db.js");
const { Constants } = require("../../utils");
require("dotenv").config()

module.exports.run = (r5, message, args) => {

    sql.Servidores.findOne({_id: message.guild.id}, function(erro, doc) {

        if (!doc) return;

        if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
            return message.channel.send(`${Constants.SETAD} \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);

        let logs;
        let welcome;
        let autorole;
        let byebye;
        let contador;
        let sugestao;

        if (!doc.logs) logs = `${Constants.OFF} | Status: **(Desativado)**`;
        else logs = `${Constants.ON} | Status: **(Ativado)**`;

        let logschannel;

        if (doc.logschannel === 'Nenhum') {
            logschannel = `${Constants.MONITOR} | Canal de logs: **(${doc.logschannel})**`;
        } else {
            logschannel = `${Constants.MONITOR} | Canal de logs: **(<#${doc.logschannel}>)**`;
        }

        if (!doc.sugest) sugestao = `${Constants.OFF} | Status: **(Desativado)**`;
        else sugestao = `${Constants.ON} | Status: **(Ativado)**`;

        let sugestchannel;

        if (doc.sugestchannel === 'Nenhum') {
            sugestchannel = `${Constants.MONITOR} | Canal de sugestões: **(${doc.sugestchannel})**`;
        } else {
            sugestchannel = `${Constants.MONITOR} | Canal de sugestões: **(<#${doc.sugestchannel}>)**`;
        }

        if (!doc.welcome) welcome = `${Constants.OFF} | Status: **(Desativado)**`;
        else welcome = `${Constants.ON} | Status: **(Ativado)**`;

        let welcomechannel;

        if (doc.welcomechannel === 'Nenhum') {
            welcomechannel = `${Constants.MONITOR} | Canal de entrada: **(${doc.welcomechannel})**`;
        } else {
            welcomechannel = `${Constants.MONITOR} | Canal de entrada: **(<#${doc.welcomechannel}>)**`;
        }

        if (!doc.autorole) autorole = `${Constants.OFF} | Status: **(Desativado)**`;
        else autorole = `${Constants.ON} | Status: **(Ativado)**`;

        if (!doc.byebye) byebye = `${Constants.OFF} | Status: **(Desativado)**`;
        else byebye = `${Constants.ON} | Status: **(Ativado)**`;

        if (!doc.contador) contador = `${Constants.OFF} | Status: **(Desativado)**`;
        else contador = `${Constants.ON} | Status: **(Ativado)**`;

        let autoroleid;

        if (doc.autoroleid === 'Nenhum') {
            autoroleid = `${Constants.MONITOR} | Cargo do autorole: **(${doc.autoroleid})**`;
        } else {
            autoroleid = `${Constants.MONITOR} | Cargo do autorole: **(<@&${doc.autoroleid}>)**`;
        }

        let byebyechannel;

        if (doc.byebyechannel === 'Nenhum') {
            byebyechannel = `${Constants.MONITOR} | Canal de saida: **(${doc.byebyechannel})**`;
        } else {
            byebyechannel = `${Constants.MONITOR} | Canal de saida: **(<#${doc.byebyechannel}>)**`;
        }

        let contadorchannel;

        if (doc.chatContador === 'Nenhum') {
            contadorchannel = `${Constants.MONITOR} | Canal de contador: **(${doc.chatContador})**`;
        } else {
            contadorchannel = `${Constants.MONITOR} | Canal de contador: **(<#${doc.chatContador}>)**`;
        }

        let rep;

        if (!doc.rep) rep = `${Constants.OFF} | Status: **(Desativado)**`;
        else rep = `${Constants.ON} | Status: **(Ativado)**`;




        const embedInfo = new Discord.RichEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setDescription(`Use o comando \`${doc.prefix}<nome do comando> help\` para saber mais informações!

            ${Constants.MENU} Menu de \`configurações\` do servidor \`${message.guild.name}\``)
            .addField(`Logs:`, logs + '\n' + logschannel, true)
            .addField(`Welcome:`, welcome + '\n' + welcomechannel, true)
            .addField(`Byebye:`, byebye + '\n' + byebyechannel, true)
            .addField(`Autorole:`, autorole + '\n' + autoroleid, true)
            .addField(`Contador:`, contador + '\n' + contadorchannel, true)
            .addField(`Sugestão:`, sugestao + '\n' + sugestchannel, true)
            .addField(`Reputação`, rep + '\n' + `${Constants.MONITOR} | Cargo(s) de reputação: **(${doc.repRole.map(role => message.guild.roles.get(role)).join(', ') || 'Nenhum'})**`, true)
            .addField(`Ignorados:`, `${Constants.MONITOR} | Canais ignorados: **(${doc.ignore.map(channel => message.guild.channels.get(channel)).join(', ') || 'Nenhum'})**`, true)
            .addField(`Ignorados por membros:`, `${Constants.MONITOR} | Canais ignorados por membros: **(${doc.ignoremembers.map(channel => message.guild.channels.get(channel)).join(', ') || 'Nenhum'})**`, true)
            .setFooter(`Comando utilizado por: ${message.author.tag}`, message.author.avatarURL)
            .setTimestamp()

        message.channel.send(embedInfo);
    })
}

module.exports.help = {
    name: 'config',
    aliases: ['settings']
}