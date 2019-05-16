const sql = require("../database/db.js");

module.exports.run = async (r5, member) => {


    try {
        sql.Servidores.findOne({_id: member.guild.id}, function (erro, doc) {

            if (!doc.welcome)
                return;

            if (member.guild.channels.get(doc.welcomechannel)) {
                try {
                    member.guild.channels.get(doc.welcomechannel).send(doc.welcomemsg.replace(/{usuario.id}/g, `<@${member.id}>`).replace(/{usuario.tagnome}/g, `${member.user.tag}`).replace(/{usuario.tag}/g, `${member.user.discriminator}`).replace(/{servidor}/g, `${member.guild.name}`).replace(/{usuario.nome}/g, `${member.user.username}`).replace(/{usuarios}/g, `${member.guild.members.size}`));
                } catch (e) {
                    console.log(e)
                }
            }

            if (!doc.autorole) return;

            if (member.guild.roles.get(doc.autoroleid)) {
                member.guild.members.get(member.id).addRole(doc.autoroleid).catch(err => {
                    doc.autorole = false
                    doc.autoroleid = 'Nenhuma'
                    doc.save()
                })
            } else {
                doc.autorole = false
                doc.autoroleid = 'Nenhuma'
                doc.save()
            }


            if (doc.contador) {
                if (doc.chatContador) {

                    if (!doc.contador) return;

                    const n0 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'zero1');
                    const n1 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'um');
                    const n2 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'dois');
                    const n3 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'tres');
                    const n4 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'quatro');
                    const n5 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'cinco');
                    const n6 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'seis');
                    const n7 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'sete');
                    const n8 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'oito');
                    const n9 = r5.guilds.get('568636670346526724').emojis.find(o => o.name === 'nove');

                    let membross = `${r5.guilds.get(member.guild.id).memberCount.toString()}`;
                    let contadora = membross.split('').map(i => [n0, n1, n2, n3, n4, n5, n6, n7, n8, n9][i]).join('');
                    r5.guilds.get(member.guild.id).channels.find(r => doc.chatContador.includes(r.id)).setTopic(doc.contadormsg.replace("{membros}", `${contadora}`));
                } else {
                }
            }
        })
    } catch (err) {
        console.log('');
    }
}