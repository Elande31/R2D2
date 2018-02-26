const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let suggestionMsg = args.join(" ");
  let suggestEmbed = new Discord.RichEmbed()
  .setDescription("Suggestion")
  .setColor("#15f153")
  .addField("Suggested By", `${message.author} with ID: ${message.author.id}`)
  .addField("Suggestion", suggestionMsg);
  let bsChannel = bot.channels.get(`416241186509029396`);
  if(!bsChannel) return message.channel.send("Couldn't find suggestions channel.");
  message.delete().catch(O_o=>{});
  bsChannel.send(suggestEmbed);
  return;
}

module.exports.cmdCore = {
  name: "botsuggest"
}
