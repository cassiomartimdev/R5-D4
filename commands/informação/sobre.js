const { RichEmbed } = require("discord.js");
const sql = require("../../database/db.js");

module.exports.run = (r5, message, args) => {

    const e = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'erro');
    const c = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'certo');
    const a = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'aviso');

        sql.Usuarios.findOne({_id: message.author.id}, function(erro, usuario) {
            sql.Servidores.findOne({_id: message.guild.id}, function (erro, doc) {

                if (!usuario.vip) return message.channel.send(`${e} \`${message.author.tag}\` você precisa ser \`VIP\` para utilizar o comando!`);

                const info = new RichEmbed();
                info.setAuthor(message.author.tag, message.author.avatarURL);
                info.setDescription(`\`${message.author.tag}\` altere sua descrição utilizando: \`${doc.prefix}sobre msg <mensagem>\``);
                info.setColor("RANDOM");
                info.setTimestamp();

                if (!args[0]) return message.channel.send(info);

                  switch (args[0]) {

                      case 'msg': {

                          const sobremsg = args.slice(1).join(' ');

                          if (usuario.sobre === sobremsg) {
                               return message.channel.send(`${e} \`${message.author.tag}\` a mensagem digitada ja está setada como \`sobre\`!`);
                          } else {

                              usuario.sobre = sobremsg;
                              usuario.save().then(async() => {
                                  await message.channel.send(`${c} \`${message.author.tag}\` você alterou seu \`sobre\` com sucesso! Utilize \`${doc.prefix}userinfo\` para ve-lo!`);
                              })
                          }
                      }
                  }
            })
        })
}

module.exports.help = {
    name: 'sobre',
    aliases: ['']
}