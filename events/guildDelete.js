const sql = require("../database/db.js");

module.exports.run = (r5, guild) => {

        sql.Servidores.findOne({_id: guild.id}, function(erro, doc) {

                doc.delete().catch(async() => {
                    await console.log(`[R5-D4] Fui removido do servidor ${guild.name}, ao mesmo tempo ele foi deletado da minha DB!`);
                })
        })
}