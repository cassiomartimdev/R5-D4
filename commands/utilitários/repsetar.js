const { Constants, R5Embed } = require("../../utils");
const sql = require("../../database/db.js");

module.exports.run = (r5, message, args) => {

    sql.Servidores.findOne({_id: message.guild.id}, function(erro, doc) {
        sql.Usuarios.findOne({_id: message.author.id}, function(error, user) {

            if(!doc.rep) return message.channel.send(`${Constants.AVISO} \`${message.author.tag}\` o sistema de \`reputação\` está desativado.`);

            if (!args[0]) return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` use o comando: \`${doc.prefix}repsetar adicionar/remover ou setar <@member> <valor>\`.`);

            if (!message.guild.member(message.author.id).hasPermission("ADMINISTRATOR"))
                  return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` você não tem permissão para executar o comando. Para utilizá-lo, você deve possuir a permissão \`ADMINISTRADOR\`!`);

             switch (args[0]) {

                case 'adicionar':
                 
                const membro = message.mentions.users.first();

                if (!membro) {
                    return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` mencione o membro que quer adicionar reputação.`);
                }

                if (membro.bot) return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` você não pode adicionar reputação para robôs.`);

                const valor = args[2];

                if (!valor) { 
                    return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` digite o valor que quer adicionar para o membro.`);
                }

                if (isNaN(valor)) {
                     return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` somente números podem ser utilizados.`);
                }

                if (parseInt(args[2]) === 0 || parseInt(args[2] < 0)) {
                    return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` o valor não pode ser menor que \`0\`!`);

                } else {
                    

                sql.Usuarios.findOne({_id: message.mentions.users.first().id}, function(erro, usuario) {

                    if (usuario) {
                        

                    usuario.rep += parseInt(args[2]);
                    usuario.save().then(async() => {
                        await message.channel.send(`${Constants.CERTO} \`${message.author.tag}\` você adicionou \`${valor}\` pontos de reputação para o membro \`${membro.tag}\`!`);  
                    })
                } else {

                    const salvarMember = new sql.Usuarios({
                        _id: membro.id,
                        nome: membro.username
                    })
                    salvarMember.save().then(async() => {
                    await message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` o membro mencionado foi registrado na \`SQL\`!`);
                })
            }
                })
            }
                 break;

                case 'remover':
                const membroe = message.mentions.users.first();

                if (!membroe) {
                    return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` mencione o membro que quer remover reputação.`);
                }

                if (membroe.bot) return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` você não pode remover reputação de robôs.`);

                const valore = args[2];

                if (!valore) { 
                    return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` digite o valor que quer adicionar para o membro.`);
                }

                if (isNaN(valore)) {
                     return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` somente números podem ser utilizados.`);
                }

                if (parseInt(args[2]) === 0 || parseInt(args[2] < 0)) {
                    return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` o valor não pode ser menor que \`0\`!`);

                } else {
                    

                sql.Usuarios.findOne({_id: message.mentions.users.first().id}, function(erro, usuario) {

                    if (usuario) {
                        

                    usuario.rep -= parseInt(args[2]);
                    usuario.save().then(async() => {
                        await message.channel.send(`${Constants.CERTO} \`${message.author.tag}\` você removeu \`${valore}\` pontos de reputação para o membro \`${membroe.tag}\`!`);  
                    })
                } else {

                    const salvarMember = new sql.Usuarios({
                        _id: membroe.id,
                        nome: membroe.username
                    })
                    salvarMember.save().then(async() => {
                    await message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` o membro mencionado foi registrado na \`SQL\`!`);
                })
            }
                })
            }
                 break;

                case 'setar':
                const membroer = message.mentions.users.first();

                if (!membroer) {
                    return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` mencione o membro que quer setar reputação.`);
                }

                if (membroer.bot) return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` você não pode setar reputação para robôs.`);

                const valorer = args[2];

                if (!valorer) { 
                    return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` digite o valor que quer setar para o membro.`);
                }

                if (isNaN(valorer)) {
                     return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` somente números podem ser utilizados.`);
                }

                if (parseInt(args[2]) === 0 || parseInt(args[2] < 0)) {
                    return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` o valor não pode ser menor que \`0\`!`);

                } else {
                    

                sql.Usuarios.findOne({_id: message.mentions.users.first().id}, function(erro, usuario) {

                    if (usuario) {
                        

                    usuario.rep = parseInt(args[2]);
                    usuario.save().then(async() => {
                        await message.channel.send(`${Constants.CERTO} \`${message.author.tag}\` você setou \`${valorer}\` pontos de reputação para o membro \`${membroer.tag}\`!`);  
                    })
                } else {

                    const salvarMember = new sql.Usuarios({
                        _id: membroer.id,
                        nome: membroer.username
                    })
                    salvarMember.save().then(async() => {
                    await message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` o membro mencionado foi registrado na \`SQL\`!`);
                })
            }
                })
            }
                 break;
                

                 default:
                 message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` a configuração \`${args.slice(0).join(' ')}\` é desconhecida, tente usar: \`adicionar\`, \`remover\`, \`setar\``);
            }
        })
    })
}

module.exports.help = {
    name: 'repsetar',
    aliases: ['rs']
}