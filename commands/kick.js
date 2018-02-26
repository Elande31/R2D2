const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kickUser) return message.channel.send("Can't find user.");
  let kickReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Missing permissions.");
  if(kickUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can't be kicked!");
  let kickEmbed = new Discord.RichEmbed()
  .setDescription("Kick")
  .setColor("#e56b00")
  .addField("Kicked User", `${kickUser} with ID ${kickUser.id}`)
  .addField("Kicked By", `${message.author} with ID ${message.author.id}`)
  .addField("On", message.createdAt)
  .addField("Reason", kickReason);
  let kickChannel = message.guild.channels.find(`name`, "staff");
  if (!kickChannel) return message.channel.send("Couldn't find kick channel.");
  message.guild.member(kickUser).kick(kickReason);
  kickChannel.send(kickEmbed);
  return;
}

module.exports.cmdCore = {
  name: "kick"
}
