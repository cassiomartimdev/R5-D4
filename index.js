const Discord = require("discord.js");
const r5 = new Discord.Client();
const sql = require("./database/db.js");
const Enmap = require("enmap");
const fs = require("fs");
require("dotenv").config()

r5.commands = new Enmap();

fs.readdir("./events/", (err, files) => {
    if (err) return console.error("Os eventos não foram carregados " + err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        r5.on(eventName, (...args) => eventFunction.run(r5, ...args));
    });
});

fs.readdir("./commands/admin/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/admin/${file}`);
      let commandName = file.split(".")[0];
      r5.commands.set(commandName, props);
  });
  });

  fs.readdir("./commands/config/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/config/${file}`);
      let commandName = file.split(".")[0];
      r5.commands.set(commandName, props);
  });
  });

  fs.readdir("./commands/economia/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/economia/${file}`);
      let commandName = file.split(".")[0];
      r5.commands.set(commandName, props);
  });
  });

  fs.readdir("./commands/informação/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/informação/${file}`);
      let commandName = file.split(".")[0];
      r5.commands.set(commandName, props);
  });
  });

  fs.readdir("./commands/staff/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/staff/${file}`);
      let commandName = file.split(".")[0];
      r5.commands.set(commandName, props);
  });
  });

  fs.readdir("./commands/utilitários/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/utilitários/${file}`);
      let commandName = file.split(".")[0];
      r5.commands.set(commandName, props);
  });
  });

r5.login(process.env.TOKEN).catch(a => {
    console.log(`[R5-D4] Ocorreu um erro ao tentar logar.\n${a}`);
})