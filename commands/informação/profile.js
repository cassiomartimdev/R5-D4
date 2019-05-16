const { Constants, R5Embed } = require("../../utils");
const Discord = require("discord.js");
const db = require("../../database/db.js");
const jimp = require("jimp");

module.exports.run = (r5, message) => {

    try {

        const member = message.mentions.members.first();

        if (member) {

            jimp.loadFont('./commands/fonts/mouse_memoirs/teste.fnt').then(function (letra) {
                jimp.read(`${member.user.avatarURL}`).then(function (avatar) {
                    jimp.read(`${message.guild.iconURL}`).then( function (guild) {
                        jimp.read('https://www.horusits.com.br/wp-content/uploads/2017/07/background-cinza.png', function (erre, img) {
                            jimp.read('https://cloud.githubusercontent.com/assets/414918/11165709/051d10b0-8b0f-11e5-864a-20ef0bada8d6.png').then(function (mascara) {

                                avatar.resize(350, 350)
                                mascara.resize(350, 350)

                                guild.resize(350, 350)
                                guild.mask(mascara, 0, 0)
                                img.composite(guild, 1522, 19)

                                avatar.mask(mascara, 0, 0)
                                img.composite(avatar, 610, 13)

                                img.print(letra, 69, 39, `Nome: ${member.user.username}`);
                                img.print(letra, 70, 95, `ID: ${member.user.id}`);
                                img.print(letra, 68, 158, `Tag: ${member.user.discriminator}`)
                                img.print(letra, 68, 228, `Robô: ${member.user.bot ? 'Sim' : 'Não'}`)

                                img.getBuffer(jimp.MIME_PNG, (erri, buffer) => {
                                    message.channel.startTyping();
                                    message.channel.send(`${Constants.SETAD} Informações sobre o usuário **${member.user.username}**`, new Discord.Attachment(buffer, 'Profile.png'));
                                    message.channel.stopTyping();
                                });
                            })
                        })
                    })
                })
            })
        } else {

            jimp.loadFont('./commands/fonts/mouse_memoirs/teste.fnt').then(function (letra) {
                jimp.read(`${message.author.avatarURL}`).then(function (avatar) {
                    jimp.read(`${message.guild.iconURL}`).then( function (guild) {
                    jimp.read('https://www.horusits.com.br/wp-content/uploads/2017/07/background-cinza.png', function (erre, img) {
                        jimp.read('https://cloud.githubusercontent.com/assets/414918/11165709/051d10b0-8b0f-11e5-864a-20ef0bada8d6.png').then(function (mascara) {

                            avatar.resize(350, 350)
                            mascara.resize(350, 350)

                            guild.resize(350, 350)
                            guild.mask(mascara, 0, 0)
                            img.composite(guild, 1522, 19)

                            avatar.mask(mascara, 0, 0)
                            img.composite(avatar, 610, 13)

                            img.print(letra, 69, 39, `Nome: ${message.author.username}`);
                            img.print(letra, 70, 95, `ID: ${message.author.id}`);
                            img.print(letra, 68, 158, `Tag: ${message.author.discriminator}`)
                            img.print(letra, 68, 228, `Robô: ${message.author.bot ? 'Sim' : 'Não'}`)

                            img.getBuffer(jimp.MIME_PNG, (erri, buffer) => {
                                message.channel.startTyping();
                                message.channel.send(`${Constants.SETAD} Informações sobre sua conta **${message.author.username}**`, new Discord.Attachment(buffer, 'Profile.png'));
                                message.channel.stopTyping();
                            });
                        })
                        })
                    })
                })
            })

        }
    } catch (err) {
            console.log(`[R5-D4] Ocorreu um erro no comando profile.js:\n${err}`);
    }
}

module.exports.help = {
    name: 'profile',
    aliases: ['']
}