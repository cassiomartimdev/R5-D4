const Discord = require("discord.js");
const sql = require("../database/db.js");

module.exports.run = (r5, guild) => {

    try {

                const a = new sql.Servidores({
                    nome: guild.name,
                    _id: guild.id
                })
                a.save();

                console.log(`[R5-D4] Novo servidor gerado na SQL: ${guild.name}`);
            }
        catch
            (err)
            {
                console.log(`[R5-D4] Ocorreu um erro ao gerar o servidor ${guild.name}, erro:\n${err}`);
            }
    };
