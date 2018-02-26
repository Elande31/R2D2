const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Missing permissions.");
  let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!toMute) return message.reply("Couldn't find user.");
  if(toMute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute the selected person!");
  let muteRole = message.guild.roles.find(`name`, "Mutee");
  if(!muteRole){
    try{
      muteRole = await message.guild.createRole({
        name: "Mutee",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  let muteTime = args[1];
  if(!muteTime) return message.reply("You didn't specify time.");
  await(toMute.addRole(muteRole.id));
  message.reply(`User ${toMute} has been muted for ${ms(muteTime)}.`);
  setTimeout(function(){
    toMute.removeRole(muteRole.id);
    message.channel.send(`${toMute} has been unmuted.`);
  }, ms(muteTime));
}

module.exports.cmdCore = {
  name: "tempmute"
}
