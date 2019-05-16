const { RichEmbed } = require("discord.js");
const sql = require("../../database/db.js");

module.exports.run = (r5, message, args) => {

    const s = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'setad');
    const e = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'erro');
    const c = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'certo');
    const a = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'aviso');

        sql.Usuarios.findOne({_id: message.author.id}, function(erro, usuario) {
            sql.Servidores.findOne({_id: message.guild.id}, function(erro, server) {


                const embedShop = new RichEmbed();
                embedShop.setAuthor(message.author.tag, message.author.avatarURL);
                embedShop.setDescription(`Todos os \`itens\` de nossa loja podem ser comprados com \`moedas\`, para consegui-las você deve usar o comando \`${server.prefix}daily\`!`);
                embedShop.addField(`**Suas moedas:**`, `**${usuario.moedas}**`);
                embedShop.addField(`**Para comprar:**`,
                `\`VIP\`: Vantagens: \`Poder alterar o sobre mim\` | Preço: \`9000 moedas\``);
                embedShop.setColor("RANDOM");
                embedShop.setTimestamp();

                if(!args[0]) return message.channel.send(embedShop);

                switch (args[0]) {

                    case 'vip': {

                        if (usuario.vip === true) {
                            return message.channel.send(`${a} \`${message.author.tag}\` você já possui o cargo \`VIP\`!`);
                        }

                        if (usuario.moedas == 9000) {
                            usuario.vip = true;
                            usuario.moedas -= 9000;
                            usuario.save();
                             return message.channel.send(`${c} \`${message.author.tag}\` você comprou o cargo \`VIP\`!`);
                        } else if (usuario.moedas < 9000) {
                            return message.channel.send(`${e} \`${message.author.tag}\` você precisa ter mais \`${9000 - usuario.moedas}\` moedas para comprar o \`VIP\`!`);
                        }
                    }
                }
            })
        })
}

module.exports.help = {
    name: 'shop',
    aliases: ['loja']
}