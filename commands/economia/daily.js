const { RichEmbed } = require("discord.js");
const sql = require("../../database/db.js");

module.exports.run = (r5, message) => {

    const s = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'setad');
    const e = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'erro');
    const c = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'certo');
    const a = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'aviso');

    sql.Usuarios.findOne({_id: message.author.id}, function(erro, doc) {

        if (doc) {

            let current = doc.dailyTime;
            if (current === 0)
                current = Date.now() - 300 * 300 * 1E3;

            if (new Date() >= current) {
                doc.dailyTime = Date.now() + 300 * 300 * 1E3;

                const moeda = [300, 600, 200, 100, 960, 2000, 7000, 402, 340, 210, 2230, 240, 650, 890, 120, 289, 200, 20, 10, 30, 34, 76, 93, 21, 432];
                const moedaRandom = Math.floor(Math.random() * moeda.length);

                const moed = Math.floor(doc.moedas);
                doc.moedas = Math.floor(moed + moeda[moedaRandom]);
                doc.save().then(async () => {
                    await message.channel.send(`${c} \`${message.author.tag}\` você recebeu \`${moeda[moedaRandom]}\` moedas!`);
                })

            } else {
                let restante = current - Date.now();
                let humanize = require('humanize-duration');
                let humanize_config = {
                    language: 'pt',
                    conjunction: ' e ',
                    serialComma: false,
                    round: true,
                    units: ['d', 'h', 'm', 's']
                };

                message.channel.send(`${a} \`${message.author.tag}\` você precisa aguardar \`${humanize(restante, humanize_config)}\` para utilizar o comando novamente!`);
            }
        }
    })
}

module.exports.help = {
    name: 'daily',
    aliases: ['']
    }
