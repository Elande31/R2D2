const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
let warnFile = JSON.parse(fs.readFileSync("./warn.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Missing permissions.");
  let warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!warnUser) return message.reply("Couldn't find the user.");
  if(warnUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't warn this user.");
  let warnReason = args.join(" ").slice(22);
  if(!warnReason) return message.reply("Usage `?warn <user> <reason>`");

  if(!warnFile[warnUser.id]) warnFile[warnUser.id] = {
    warns: 0
  };

  if(warnReason === "reset"){
    warnFile[warnUser.id].warns = 0;
    fs.writeFile("./warn.json", JSON.stringify(warnFile), (err) => {
      if(err) console.log(err)
    });
    message.channel.send("The warnings have been reset.");
    return;
  };

  warnFile[warnUser.id].warns++;
  fs.writeFile("./warn.json", JSON.stringify(warnFile), (err) => {
    if(err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Warnings")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Warned User", `${warnUser}`)
  .addField("Warned", warnFile[warnUser.id].warns+" times")
  .addField("Reason", warnReason);

  let warnChannel = message.guild.channels.find(`name`, "staff");
  if(!warnChannel) return message.reply("The staff channel hasn't been found.");
  warnChannel.send(warnEmbed);

  if(warnFile[warnUser.id].warns == 2){
  let muteRole = message.guild.roles.find(`name`, "Mutee");
    if(!muteRole) return message.reply("The Mutee role doesn't exist, therefore the user couldn't be muted.");
    let muteTime = "5s";
    await(warnUser.addRole(muteRole.id));
    message.reply("User has reached 2 warnings and therefore has been muted for 5 seconds.");
    setTimeout(function(){
      warnUser.removeRole(muteRole.id);
      message.reply("The user has been unmuted.");
    }, ms(muteTime));
  }
}

module.exports.cmdCore = {
  name: "warn"
}
