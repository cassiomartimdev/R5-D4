const sql = require("../database/db.js");

module.exports.run = async (r5, member) => {

           sql.Servidores.findOne({_id: member.guild.id}, function(erro, servidor) {

                if (member.guild.channels.get(servidor.byebyechannel)) {

                    if (!servidor.byebye)
                         return;

                    member.guild.channels.get(servidor.byebyechannel).createWebhook(member.guild.name, member.guild.iconURL).then(byebye => {
                        byebye.sendMessage(servidor.byebyemsg.replace(/{usuario.id}/g, `<@${member.id}>`).replace(/{usuario.tagnome}/g, `${member.user.tag}`).replace(/{usuario.tag}/g, `${member.user.discriminator}`).replace(/{servidor}/g, `${member.guild.name}`).replace(/{usuario.nome}/g, `${member.user.username}`).replace(/{usuarios}/g, `${member.guild.members.size}`));
                        setTimeout(() => {
                            byebye.delete()
                        }, 2500)
                    }).catch(err => {
                        member.guild.channels.get(servidor.byebyechannel).sendMessage(servidor.byebyemsg.replace(/{usuario.id}/g, `<@${member.id}>`).replace(/{usuario.tagnome}/g, `${member.user.tag}`).replace(/{usuario.tag}/g, `${member.user.discriminator}`).replace(/{servidor}/g, `${member.guild.name}`).replace(/{usuario.nome}/g, `${member.user.username}`).replace(/{usuarios}/g, `${member.guild.members.size}`));
                    })
                } else {
                    servidor.byebye = false
                    servidor.byebyechannel = 'None'
                    servidor.byebyemsg = 'None'
                    servidor.save()
                }

            if (servidor.contador) {
                if (servidor.chatContador) {

                    if (!servidor.contador) return;

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

                    let membross =  `${r5.guilds.get(member.guild.id).memberCount.toString()}`;
                    let contadora = membross.split('').map(i => [n0, n1, n2, n3, n4, n5, n6, n7, n8, n9][i]).join('');
                    r5.guilds.get(member.guild.id).channels.find(r => servidor.chatContador.includes(r.id)).setTopic(servidor.contadormsg.replace("{membros}", `${contadora}`));
                } else { }
            } else { } 
 })
}