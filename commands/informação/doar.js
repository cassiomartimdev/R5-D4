const Discord = require("discord.js");

module.exports.run = (r5, message) => {

    const r = r5.guilds.get('568636670346526724').emojis.find(r => r.name === 'raio');


    const embed = new Discord.RichEmbed()
     .setAuthor(r5.user.username, r5.user.avatarURL)
     .setDescription(`${r} \`${message.author.tag}\` torne-se um doador do \`R5-D4\` e receba \`vantagens\` ótimos para o uso do \`R5-D4\`.
     Porém a doação é mensal e possui um custo de \`R$4,00\`
     
     Para saber mais \`informações\` sobre as \`vantagens\` de ser um \`doador\` ou qualquer dúvida entre no [servidor de suporte](https://discord.gg/dWrSXxF)
     **__Atualmente estamos aceitando somente: Paypal e PagSeguro__**`)
     .setColor("#f8dd05")

     message.channel.send(embed);
}

module.exports.help = {
    name: 'doar',
    aliases: ['']
}