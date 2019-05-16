const { Constants, R5Embed } = require("../../utils");
const sql = require("../../database/db.js");

module.exports.run = (r5, message) => {

    message.author.send(`${Constants.SETAD} \`${message.author.tag}\` você está prestes a iniciar o report de um bug do \`BOT\`, o uso excessivo deste \`comando\` poderá te retornar um \`BANIMENTO\` permanente do \`BOT\`
Caso queira continuar está ação digite \`S\` caso queira cancelar digite \`N\``).then(() => {
        message.author.dmChannel.createMessageCollector(res =>
        (res.content === "s" && res.author.id === message.author.id || res.content === 'n' && res.author.id === message.author.id), {
        
        max: 1, time: 15000, errors: ['time'] }).then(col => {

        if (col.first().content === 'n') {

            message.channel.send(`${Constants.REMOVER} \`${message.author.tag}\` você \`cancelou\` o envio do \`BOT\`.`);
        }

        if (col.first().content === 's') {
            message.author.send(`${Constants.TEXTO} \`${message.author.tag}\` digite o \`bug\` encontrado...`).then(() => {

                const cassio = message.author.dmChannel.createMessageCollector(a=>a.author.id == message.author.id, { time: 200000, max: 1 });
                cassio.on('collect', r => {

                    let sugest = r.content;


                        const embedI = new R5Embed(message.author)

                        embedI.setAuthor(r5.user.username, r5.user.avatarURL);
                        embedI.setDescription(`Teste uma nova sugestão
                        ${sugest}`);
                        embedI.setColor("RANDOM");
                        embedI.setTimestamp();

                        message.author.send(`${Constants.ADICIONAR} \`${message.author.tag}\` o seu report foi enviado com sucesso!`);
                    })
                })
            }
        })
        })
}

module.exports.help = {
    name: 'reportbug',
    aliases: ['']
}