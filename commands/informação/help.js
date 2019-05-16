const Discord = require("discord.js");
const sql = require("../../database/db.js");

module.exports.run = (r5, message) => {

    const s = r5.guilds.get('568636670346526724').emojis.find(a => a.name == 'setad');
    const m = r5.guilds.get('568636670346526724').emojis.find(a => a.name == 'menu');
    const c = r5.guilds.get('568636670346526724').emojis.find(a => a.name == 'config');
    const md = r5.guilds.get('568636670346526724').emojis.find(a => a.name == 'moderacao');
    const e = r5.guilds.get('568636670346526724').emojis.find(a => a.name == 'erro');
    const sv = r5.guilds.get('568636670346526724').emojis.find(a => a.name == 'server');
    const i = r5.guilds.get('568636670346526724').emojis.find(a => a.name == 'info');
    const l = r5.guilds.get('568636670346526724').emojis.find(a => a.name == 'layer');
    const mt = r5.guilds.get('568636670346526724').emojis.find(a => a.name == 'maleta');

    sql.Servidores.findOne({_id: message.guild.id}, function(erro, doc) {

    const embedInfo = new Discord.RichEmbed()
    .setAuthor(r5.user.username, r5.user.avatarURL)
    .setDescription(`
${s} Prefixo: \`${doc.prefix}\`

${m} - \`Menu principal\`
${md} - \`Administração\`
${c} - \`Configuração\`
${l} - \`Economia\`
${i} - \`Informações\`
${mt} - \`Equipe\`
${sv} - \`Utilitários\`
${e} - \`Apagar a mensagem\`

**__Clique nas reações para ver os comandos!__**`)
.setColor("RANDOM")
.setThumbnail(r5.user.avatarURL)

    message.channel.send(`${s} \`${message.author.tag}\` verifique suas mensagens diretas!`);
    message.author.send(embedInfo).then(msg => {

        msg.react(m).then(r => {
           msg.react(md).then(r2 => {
               msg.react(c).then(r3 => {
                   msg.react(l).then(r4 => {
                       msg.react(i).then(r5 => {
                           msg.react(mt).then(r6 => {
                               msg.react(sv).then(r7 => {
                                   msg.react(sv).then(r8 => {
                                       msg.react(e);
                                   })
                               })
                           })
                       })
                   })
               })
           })

           const menu = (react, user) => react.emoji.name === 'menu' && user.id === message.author.id;
           const menuM = msg.createReactionCollector(menu, { time: 600000});

           const adm = (react, user) => react.emoji.name === 'moderacao' && user.id === message.author.id;
           const admM = msg.createReactionCollector(adm, { time: 600000});

           const cfg = (react, user) => react.emoji.name === 'config' && user.id === message.author.id;
           const cfgM = msg.createReactionCollector(cfg, { time: 600000});

           const ecm = (react, user) => react.emoji.name === 'layer' && user.id === message.author.id;
           const ecmM = msg.createReactionCollector(ecm, { time: 600000});

           const inf = (react, user) => react.emoji.name === 'info' && user.id === message.author.id;
           const infM = msg.createReactionCollector(inf, { time: 600000});

           const eqp = (react, user) => react.emoji.name === 'maleta' && user.id === message.author.id;
           const eqpM = msg.createReactionCollector(eqp, { time: 600000});

           const utl = (react, user) => react.emoji.name === 'server' && user.id === message.author.id;
           const utlM = msg.createReactionCollector(utl, { time: 600000});

           const del = (react, user) => react.emoji.name === 'erro' && user.id === message.author.id;
           const delM = msg.createReactionCollector(del, { time: 600000});

           menuM.on("collect", r=> {
               msg.edit(embedInfo);
               return;
           })

           admM.on("collect", r=> {
               
               const admEmbed = new Discord.RichEmbed()
                .setAuthor(`Comandos de administração:`, r5.user.avatarURL)
                .setDescription(`\`clear\` - Deletar um valor <\`x\`> de mensagens.`)
                .setColor("RANDOM")
            
               msg.edit(admEmbed);
               return;
           })

           cfgM.on("collect", r=> {
              
               const cfgEmbed = new Discord.RichEmbed()
                .setAuthor(`Comandos de configuração:`, r5.user.avatarURL)
                .setDescription(`
                \`autorole\` - Ver/editar as configurações do sistema de cargos do servidor.
                \`byebye\` - Ver/editar as configurações do sistema de saida do servidor.
                \`config\` - Ver as configurações atuais do servidor.
                \`contador\` - Ver/editar as configurações do sistema de contagem do servidor.
                \`logs\` - Ver/editar as configurações do sistema de logs do servidor.
                \`prefix\` - Ver/editar as configurações do sistema de prefixo do servidor.
                \`repconfig\` - Ver/editar as configurações do sistema de reputação do servidor.
                \`sugest\` - Ver/editar as configurações do sistema de sugestão do servidor.
                \`welcome\` - Ver/editar as configurações do sistema de entrada do servidor.`)
                .setColor("RANDOM")
            
            msg.edit(cfgEmbed);    
            return;
           })

           ecmM.on("collect", r=> {
            
             const ecmEmbed = new Discord.RichEmbed()
              .setAuthor(`Comandos de economia:`, r5.user.avatarURL)
              .setDescription(`
              \`daily\` - Recebe moedas díarias.
              \`shop\` - Ver/comprar itens na loja.`)
              .setColor("RANDOM")

            msg.edit(ecmEmbed);
            return;
           })

           infM.on("collect", r=> {
            
             const infEmbed = new Discord.RichEmbed()
              .setAuthor(`Comandos de informação:`, r5.user.avatarURL)
              .setDescription(`
              \`botinfo\` - Ver informações do \`R5-D4\`.
              \`doar\` - Ver informações sobre a doação para o \`R5-D4\`.
              \`help\` - Apresenta uma guia para ver informações sobre \`comandos\`.
              \`ping\` - Ver a latência do \`R5-D4\`.
              \`reprank\` - Ver uma lista de \`10\` membros com reputação.
              \`roleinfo\` - Ver informações da \`role\` mencionada.
              \`sobre\` - Alterar o seu sobre mim. (**VIP**)
              \`staff\` - Ver a equipe do \`R5-D4\`.
              \`userinfo\` - Ver informações do \`usuário\` mencionado.`)
              .setColor("RANDOM")

            msg.edit(infEmbed);
            return;
           })

           eqpM.on("collect", r=> {

            const eqpEmbed = new Discord.RichEmbed()
             .setAuthor(`Comandos para a equipe:`, r5.user.avatarURL)
             .setDescription(`
             \`eval\` - Ver o resultado de um \`código\` imposto no comando.
             \`manu\` - Adicionar um \`comando\` para manutenção.
             \`setadministrador\` - Adiciona o cargo \`ADMINISTRADOR\` no membro mencionado.
             \`setdev\` - Adiciona o cargo \`DESENVOLVEDOR\` no membro mencionado.
             \`setfundador\` - Adiciona o cargo \`FUNDADOR\` no membro mencionado.
             \`setmoderador\` - Adiciona o cargo \`MODERADOR\` no membro mencionado.
             \`setsupervisor\` - Adiciona o cargo \`SUPERVISOR\` no membro mencionado.
             \`setvip\` - Adiciona o cargo \`VIP\` no membro mencionado.`)
             .setColor("RANDOM")
            
            msg.edit(eqpEmbed);
            return;
           })

           utlM.on("collect", r=> {
            
            const utlEmbed = new Discord.RichEmbed()
             .setAuthor(`Comandos utilitários:`, r5.user.avatarURL)
             .setDescription(`
             \`rep\` - Adiciona \`+1\` de reputação para o membro mencionado.
             \`reportbug\` - Reporta um bug do \`R5-D4\` para a equipe.`)
             .setColor("RANDOM")
            

            msg.edit(utlEmbed);   
            return;
           })

           delM.on("collect", r=> {
               msg.delete();
               return;
           })
        })
    })
 })
}

module.exports.help = {
    name: 'help',
    aliases: ['ajuda']
}