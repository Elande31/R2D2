const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const mikiEmoji = message.client.emojis.get("417662589997154315");
  return message.channel.send(`${mikiEmoji}`);
}

module.exports.cmdCore = {
  name: "miki"
}
