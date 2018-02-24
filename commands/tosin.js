const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const tosinEmoji = message.client.emojis.get("415500520699199488");
  return message.channel.send(`${tosinEmoji}`);
}

module.exports.cmdCore = {
  name: "tosin"
}
