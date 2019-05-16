const { RichEmbed } = require("discord.js");
const sql = require("../../database/db.js");

module.exports.run = (r5, message, args) => {

    const s = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'setad');
    const a = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'aviso');
    const c = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'certo');
    const e = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'erro');
    const on = r5.guilds.get('568636670346526724').emojis.find(on => on.name === 'on');
    const off = r5.guilds.get('568636670346526724').emojis.find(off => off.name === 'off');
    const m = r5.guilds.get('568636670346526724').emojis.find(m => m.name === 'menu');
    const md = r5.guilds.get('568636670346526724').emojis.find(m => m.name === 'moderacao');
    const u = r5.guilds.get('568636670346526724').emojis.find(mt => mt.name === 'usuario');
    const g = r5.guilds.get('568636670346526724').emojis.find(mt => mt.name === 'guard');

    sql.Servidores.findOne({_id: message.guild.id}, function(erro, doc) {

        if (!message.guild.member(message.author.id).hasPermission("ADMINISTRATOR", "MANAGE_CHANNELS"))
               return message.channel.send(`${e} \`${message.author.tag}\` você não tem permissão para executar este comando. Para utilizá-lo, você deve possuir a permissão \`GERENCIAR CANAIS\`!`);

        if (!message.guild.member(r5.user.id).hasPermission("MANAGE_CHANNELS"))
               return message.channel.send(`${e} \`${message.author.tag}\` para o comando funcionar corretamente eu devo possuir a permissão \`GERENCIAR CANAIS\`!`);

        let stats;

        if (!doc.stats) stats = `${off} | Status: **(Desativado)**`;
        else stats = `${on} | Status: **(Ativado)**`;

        let statsmemberchannel;

        if (doc.statsmemberchannel === 'Nenhum') {
            statsmemberchannel = `${u} | Canal de membros: **(${doc.statsmemberchannel})**`;
        } else {
            statsmemberchannel = `${u} | Canal de membros: **(${message.guild.channels.get(doc.statsmemberchannel)})**`;
        }

        let statsbotchannel;

        if (doc.statsbotchannel === 'Nenhum') {
            statsbotchannel = `${g} | Canal de bots: **(${doc.statsbotchannel})**`;
        } else {
            statsbotchannel = `${g} | Canal de bots: **(${message.guild.channels.get(doc.statsbotchannel)})**`;
        }

        let statsonlinechannel;

        if (doc.statsonlinechannel === 'Nenhum') {
            statsonlinechannel = `${md} | Canal de onlines: **(${doc.statsonlinechannel})**`;
        } else {
            statsonlinechannel = `${md} | Canal de onlines: **(${message.guild.channels.get(doc.statsonlinechannel)})**`;
        }

        const info = new RichEmbed();
         info.setAuthor(message.guild.name, message.guild.iconURL);
         info.setDescription(`${m} Menu de \`configurações\` de \`status\` do servidor!
         
         ${stats}
         ${statsmemberchannel}
         ${statsbotchannel}
         ${statsonlinechannel}`);
         info.setFooter(`Comando utilizado por: ${message.author.tag}`, message.author.avatarURL);
         info.setTimestamp();

         if (!args[0]) return message.channel.send(info);

         switch (args[0]) {

            case 'membros':

            const channel = message.guild.channels.find(r => r.id === args.slice(1).join(' '));

               if (!channel) {
                   return message.channel.send(`${e} \`${message.author.tag}\` digite o \`ID\` do canal de voz que quer setar como total de \`membros\`!`);
               }

               if (channel.id === doc.statsmemberchannel) {
                   return message.channel.send(`${e} \`${message.author.tag}\` desculpe, mas o canal mencionado ja está setado como \`membros\`!`);
               }

               if (channel.type === 'text') {
                   return message.channel.send(`${e} \`${message.author.tag}\` o tipo de canal tem que ser de \`voz\`!`);

               } else if (channel.type === 'category') {

                return message.channel.send(`${e} \`${message.author.tag}\` o tipo de canal tem que ser de \`voz\`!`);
               } else {

                    channel.edit({
                        name: `👥 | Membros: ${message.guild.members.size}`
                    })
                   
                   doc.statsmemberchannel = channel.id;
                   doc.save().then(async() => {
                     await message.channel.send(`${c} \`${message.author.tag}\` você setou o canal de \`membros\` com sucesso!`);
               })
            }
                break;

            case 'bot':
            const channele = message.guild.channels.find(r => r.id === args.slice(1).join(' '));

            if (!channele) {
                return message.channel.send(`${e} \`${message.author.tag}\` digite o \`ID\` do canal de voz que quer setar como total de \`robôs\`!`);
            }

            if (isNaN(!channele)) {
                return message.channel.send(`${e} \`${message.author.tag}\` o \`canal\` digitado não foi encontrado!`);
            }

            if (channele.type === 'text') {
                return message.channel.send(`${e} \`${message.author.tag}\` o tipo de canal tem que ser de \`voz\`!`);

            } else if (channele.type === 'category') {

             return message.channel.send(`${e} \`${message.author.tag}\` o tipo de canal tem que ser de \`voz\`!`);
            } else {

                 channele.edit({
                     name: `📚 | Robôs: ${message.guild.members.filter(m => m.user.bot).size}`
                 })
                
                doc.statsbotchannel = channele.id;
                doc.save().then(async() => {
                  await message.channel.send(`${c} \`${message.author.tag}\` você setou o canal de \`bots\` com sucesso!`);
            })
         }
             break;

            case 'online':

            const channeler = message.guild.channels.find(r => r.id === args.slice(1).join(' '));

            if (!channeler) {
                return message.channel.send(`${e} \`${message.author.tag}\` digite o \`ID\` do canal de voz que quer setar como total de \`online\`!`);
            }

            if (isNaN(!channeler)) {
                return message.channel.send(`${e} \`${message.author.tag}\` o \`canal\` digitado não foi encontrado!`);
            }

            if (channeler.type === 'text') {
                return message.channel.send(`${e} \`${message.author.tag}\` o tipo de canal tem que ser de \`voz\`!`);

            } else if (channeler.type === 'category') {

             return message.channel.send(`${e} \`${message.author.tag}\` o tipo de canal tem que ser de \`voz\`!`);
            } else {

                 channeler.edit({
                     name: `📌 | Onlines: ${message.guild.members.filter(member => member.user.presence.status !== 'offline').size}`
                 })
                
                doc.statsonlinechannel = channeler.id;
                doc.save().then(async() => {
                  await message.channel.send(`${c} \`${message.author.tag}\` você setou o canal de \`online\` com sucesso!`);
            })
         }
             break;

            case 'auto':

                message.guild.createChannel(`Membros: ${message.guild.members.size}`, 'voice', 
                [{
                   id: message.channel.id, 
                   deny: ["CONNECT"],
                   allow: ["VIEW_CHANNEL"]
                }])
                message.channel.send(`hmmmm`);   
                break; 
              
              default:
               message.channel.send(`${e} \`${message.author.tag}\` a configuração \`${args.slice(0).join(' ')}\` é desconhecida. Utilize: \`membros, bot, online, auto, on ou off\``);
         }

         if (erro) {
             return console.log(erro);
         }
    })
};

module.exports.help = {
    name: 'serverstats',
    aliases: ['st']
}