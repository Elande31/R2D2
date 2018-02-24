const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!banUser) return message.channel.send("Can't find user.");
  let banReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Missing permissions.");
  if(banUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can't be banned!");
  let banEmbed = new Discord.RichEmbed()
  .setDescription("Ban")
  .setColor("#e56b00")
  .addField("Banned User", `${banUser} with ID ${banUser.id}`)
  .addField("Banned By", `${message.author} with ID ${message.author.id}`)
  .addField("On", message.createdAt)
  .addField("Reason", banReason);
  let banChannel = message.guild.channels.find(`name`, "staff");
  if (!banChannel) return message.channel.send("Couldn't find ban channel.");
  message.guild.member(banUser).ban(banReason);
  banChannel.send(banEmbed);
  return;
}

module.exports.cmdCore = {
  name: "ban"
}
