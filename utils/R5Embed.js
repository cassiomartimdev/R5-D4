const { RichEmbed } = require('discord.js')

module.exports = class R5Embed extends RichEmbed {
  constructor (user, data = {}) {
    super(data);
  }
}