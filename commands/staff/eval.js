const { Constants, R5Embed } = require("../../utils");
const sql = require("../../database/db.js");

function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

module.exports.run =  async (r5, message, args) => {

sql.Usuarios.findOne({_id: message.author.id}, function (erro, usuario) {
    sql.Servidores.findOne({_id: message.guild.id}, function (erro, servidor) {
    if(usuario) {
        
      if(usuario.fundador) {

    try {

        let code = args.join(" ");
        let saida = eval(code);

        if (typeof saida !== 'string')
            saida = require('util').inspect(saida, { depth: 0 });

    if(!code) {

            message.channel.send(`${Constants.SETAD} \`${message.author.username}\` utilize o comando: \`${servidor.prefix}eval <código>\`.`).then(msg => msg.delete(5000));
        } else {

           message.channel.send(`
${Constants.SETAD} Entrada:

\`\`\`${code}\`\`\`
           
${Constants.SETAE} Saida:

\`\`\`${saida}\`\`\``);

    }
} catch (err) {
    const code = args.join(" ");

        message.channel.send(`
${Constants.SETAD} Entrada:

\`\`\`${code}\`\`\`
           
${Constants.SETAE} Erro:

\`\`\`${clean(err)}\`\`\``);
              }
} else {
    message.channel.send(`${Constants.ERRO} \`${message.author.username}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter o cargo \`Fundador\`.`).then(msg => msg.delete(5000));
    }

} else {
    console.log('Comando Eval - confused')
        }
    })
})
}

module.exports.help = {
    name: 'eval',
    aliases: ['e']
}