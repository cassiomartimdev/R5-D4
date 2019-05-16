const { Constants, R5Embed } = require("../utils");
const sql = require("../database/db.js");
require("dotenv").config()

module.exports.run = (r5, message) => {

    const l = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'like');
    const d = r5.guilds.get('568636670346526724').emojis.find(l => l.name === 'dislike');

    if (message.author.bot) return;
    if (message.channel.type === "dm") return; 
    if (message.content) {
        //save()
    }
    sql.Servidores.findOne({ _id: message.guild.id }, function (servro, servidor) {
        if (servidor) {
            sql.Usuarios.findOne({ _id: message.author.id }, function (erro, usuario) {
                if (usuario) {

                    if (servidor.ignore.includes(message.channel.id)) {
                        return;
                    }

                    if (servidor.ignoremembers.includes(message.channel.id) && !message.member.hasPermission('ADMINISTRATOR')) {
                        return;
                    }


                    if (message.content.startsWith(r5.user || r5.user.nickname || r5.user.username || r5.user.id)) {

                        const embed = new R5Embed(message.author);

                        embed.setAuthor(r5.user.username, r5.user.avatarURL);
                        embed.setDescription(`${Constants.SETAD} Use o comando \`${servidor.prefix}help\` para saber mais informações!
                        
                        **__Está com dúvidas relacionadas ao uso do R5-D4?__**
                         Caso sim, entre no servidor de [suporte](https://discord.gg/rqREBrM) dele!`);
                        embed.setTimestamp();
                        embed.setColor("RANDOM");

                        message.channel.send(embed);
                    }

                    if (servidor && servidor.sugestchannel && message.channel.id == servidor.sugestchannel) {

                        if (!servidor.sugest) return;
                        
                      message.react(l).then(r => {
                          message.react(d);
                      })
                    }

                    if (message.content.indexOf(servidor.prefix) !== 0) return;
                    const args = message.content.slice(servidor.prefix.length).trim().split(/ +/g);
                    const buscCommand = args.shift()
                    const command = r5.commands.get(buscCommand) || r5.commands.find(c => c.help && c.help.aliases && c.help.aliases.includes(buscCommand))
                    if (command) {
                        sql.Comandos.findOne({ _id: command.help.name }, function (cerro, comando) {
                            if (comando) {
                                if (comando.manutenção && !usuario.fundador) {

                                    const s = r5.guilds.get('568636670346526724').emojis.find(a => a.name == 'setad');
                                    message.channel.send(`${s} \`${message.author.tag}\` o comando \`${comando._id}\` está em \`manutenção\`. Tente usá-lo mais \`tarde\`.`)
                                } else {

                                    comando.usos = comando.usos + 1

                                    comando.save()

                                    command.run(r5, message, args);

                                }

                            } else {

                                var comandoC = new sql.Comandos({
                                    _id: command.help.name,
                                    usos: 0,
                                    manutenção: false
                                })
                                const s = r5.guilds.get('568636670346526724').emojis.find(a => a.name == 'setad');
                                message.channel.send(`${s} \`${message.author.tag}\` o comando \`${command.help.name}\` não estava registrado na \`SQL\`. Utilize-o novamente!`);
                                comandoC.save()
                            };

                        })

                    } else {



                    }

                } else {
                    var b = new sql.Usuarios({
                        _id: message.author.id,
                        nome: message.author.tag
                    })
                    b.save()
                }
            })

        } else {
            var a = new sql.Servidores({
                nome: message.guild.name,
                _id: message.guild.id
            })
            a.save()
        }

        async function save() {

            if (!servidor) {
                var a = new sql.Servidores({
                    nome: message.guild.name,
                    _id: message.guild.id
                })
                a.save()
            }

            if (!usuario) {
                var b = new sql.Usuarios({
                    nome: message.author.tag,
                    _id: message.author.id
                })
                b.save()
            }


        }

    })

}