const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let sunsetEmbed = new Discord.RichEmbed()
  .setDescription("**Sunset**")
  .setColor("#fcef00")
  .addField("*The first tester.*", "*The Sun never sets.*");
  return message.channel.send(sunsetEmbed);
}

module.exports.cmdCore = {
  name: "sunset"
}
