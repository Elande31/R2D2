const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const mozEmoji = message.client.emojis.get("413359254687318018");
  return message.channel.send(`${mozEmoji}`);
}

module.exports.cmdCore = {
  name: "moz"
}
