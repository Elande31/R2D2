const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  return message.channel.send("Oh, hello there!");
}

module.exports.cmdCore = {
  name: "hello"
}
