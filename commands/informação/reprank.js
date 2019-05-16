const { RichEmbed } = require("discord.js");
const sql = require("../../database/db.js");

module.exports.run = (r5, message) => {

    sql.Usuarios.findOne({
        _id: message.author.id
    }, function(erromano, documano) {
        sql.Usuarios.find({}, function (erro, documento) {
            if (documento) {
                var position = documento.map(function (docu) {
                    return {
                        id: docu._id,
                        guild: docu._guild,
                        rep: docu.rep

                    }

                });


                position = position.sort(function(a, b) {

                    return b.rep - a.rep;
                });
                position = position.filter(function(a) {

                    return message.guild.members.get(a.id)
                });


                const reprank = "\n" + position.slice(0, 10).map((a, posicao) => "`" + (posicao + 1)  + "`. " + message.guild.members.get(a.id).user.username + " | Reputação: `" + a.rep + "`").join("\n") + "";

                const rank = new RichEmbed();
                 rank.setAuthor(message.guild.name, message.guild.iconURL);
                 rank.addField(`**\`TOP 10 REPUTAÇÕES:\`**`, reprank.replace("⌟", "").replace("⌜", ""));
                 rank.setTimestamp();
                 rank.setFooter(`Sua reputação no rank: ${documano.rep ? documano.rep : 'Nenhuma'}`, message.author.avatarURL);
                 rank.setColor("RANDOM");

                message.channel.send(rank);
            }
        })
    })
}
        module.exports.help = {
            name: 'reprank',
            aliases: ['toprep']
    }