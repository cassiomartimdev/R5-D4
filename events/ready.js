const Discord = require("discord.js");
require("dotenv").config()

module.exports.run = (r5, guild) => {

    console.log(`[R5-D4] iniciado para ${r5.users.size} usuários.`);
    r5.user.setActivity(`${process.env.PREFIX}help`, { type: "WATCHING"});
}