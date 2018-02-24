const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  return message.channel.send("All hail the Queen!");
}

module.exports.cmdCore = {
  name: "athaswind"
}
