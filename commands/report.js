const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let repUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!repUser) return message.channel.send("Couldn't find user.");
  if(repUser.id === message.author.id) return message.channel.send("Can't report yourself.");
  let repReason = args.join(" ").slice(22);
  let reportEmbed = new Discord.RichEmbed()
  .setDescription("Reports")
  .setColor("#15f153")
  .addField("Reported User", `${repUser} with ID: ${repUser.id}`)
  .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("On", message.createdAt)
  .addField("Reason", repReason);
  let reportsChannel = message.guild.channels.find(`name`, "staff");
  if(!reportsChannel) return message.channel.send("Couldn't find reports channel.");
  message.delete().catch(O_o=>{});
  reportsChannel.send(reportEmbed);
  return;
}

module.exports.cmdCore = {
  name: "report"
}
