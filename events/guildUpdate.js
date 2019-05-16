const Discord = require("discord.js");
const sql = require("../database/db.js");

module.exports.run = (r5, oldGuild, newGuild) => {

    let s = r5.guilds.get('568636670346526724').emojis.find(s => s.name === 'star');

    sql.Servidores.findOne({_id: newGuild.id}, function(erro, doc) {

        let logChannel = r5.guilds.get(newGuild.id).channels.find(search => search.id === doc.logschannel);

        if (!doc.logs) return;

        let serverRegion = {
            'amsterdam' : ':flag_nl: `Amsterdã`',
            'brazil'    : ':flag_br: `Brasil`',
            'eu-central': ':flag_eu: `Europa Central`',
            'eu-west'   : ':flag_eu: `Europa Ocidental`',
            'frankfurt' : ':flag_de: `Frankfurt`',
            'hongkong'  : ':flag_hk: `Hong Kong`',
            'japan'     : ':flag_ja: `Japão`',
            'london'    : ':flag_gb: `Londres`',
            'russia'    : ':flag_ru: `Russia`',
            'singapore' : ':flag_sg: `Singapura`',
            'sydney'    : ':flag_au: `Sydney`',
            'us-central': ':flag_us: `EUA Central`',
            'us-east'   : ':flag_us: `EUA Oriental`',
            'us-west'   : ':flag_us: `EUA Ocidental`',
            'us-south'  : ':flag_us: `EUA Sul`',
        }[oldGuild.region];

        let serverRegion2 = {
            'amsterdam' : ':flag_nl: `Amsterdã`',
            'brazil'    : ':flag_br: `Brasil`',
            'eu-central': ':flag_eu: `Europa Central`',
            'eu-west'   : ':flag_eu: `Europa Ocidental`',
            'frankfurt' : ':flag_de: `Frankfurt`',
            'hongkong'  : ':flag_hk: `Hong Kong`',
            'japan'     : ':flag_ja: `Japão`',
            'london'    : ':flag_gb: `Londres`',
            'russia'    : ':flag_ru: `Russia`',
            'singapore' : ':flag_sg: `Singapura`',
            'sydney'    : ':flag_au: `Sydney`',
            'us-central': ':flag_us: `EUA Central`',
            'us-east'   : ':flag_us: `EUA Oriental`',
            'us-west'   : ':flag_us: `EUA Ocidental`',
            'us-south'  : ':flag_us: `EUA Sul`',
        }[newGuild.region];

        const embed = new Discord.RichEmbed()
            .setAuthor(newGuild.name, newGuild.iconURL)
            .setDescription(`${s} - O servidor foi atualizado (\`${newGuild.name}/${newGuild.id}\`)`)
            .addField(`Antes:`, `Nome: \`${oldGuild.name}\`
ID: \`${oldGuild.id}\`
Dono: \`${oldGuild.owner.user.tag}\`
Região: ${serverRegion}
Icone: [**\`Download\`**](${oldGuild.iconURL})`)

            .addField(`Depois:`, `Nome: \`${newGuild.name}\`
ID: \`${newGuild.id}\`
Dono: \`${newGuild.owner.user.tag}\`
Região: ${serverRegion2}
Icone: [**\`Download\`**](${newGuild.iconURL})`)
            .setThumbnail(newGuild.iconURL)
            .setTimestamp()

        logChannel.send(embed);
    })
}