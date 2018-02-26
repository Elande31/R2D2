const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let cmdType = args[0];
  let roleName = args[1];
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Missing permissions.");
  if(!cmdType) return message.channel.send("Usage: `?role add|remove|assign|unassign|list`");
  if(cmdType.toLowerCase() === "create"){
    if(!roleName) return message.channel.send("Usage: `?role create <role>`");
    message.guild.createRole({
      name: roleName,
      color: "#ffffff",
      permissions:[]
    })
    message.reply(`Role ${roleName} created.`);
    return;
  }
  else if(cmdType.toLowerCase() === "remove"){
    if(!roleName) return message.channel.send("Usage `?role remove <role>`");
    let roleToDelete = message.guild.roles.find(`name`, roleName);
    if(!roleToDelete) return message.channel.send("The role doesn't exist!");
    roleToDelete.delete();
    message.reply(`Role ${roleName} deleted.`);
    return;
  }
  else if(cmdType.toLowerCase() === "assign"){
    if(!roleName) return message.channel.send("Usage `?role assign <role> <user>");
    let userToAssign = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[2]));
    let roleToAssign = message.guild.roles.find(`name`, roleName);
    if(!roleToAssign) return message.channel.send("Couldn't find the role!");
    if(!userToAssign) return message.channel.send("Couldn't find the user!");
    if(userToAssign.roles.has(roleToAssign.id)) return message.channel.send("The user already has the role!");
    userToAssign.addRole(roleToAssign.id);
    message.reply(`Role ${roleName} assigned to ${userToAssign}.`);
    return;
  }
  else if(cmdType.toLowerCase() === "unassign"){
    if(!roleName) return message.channel.send("Usage `?role unassign <role> <user>");
    let userToUnassign = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[2]));
    let roleToUnassign = message.guild.roles.find(`name`, roleName);
    if(!roleToUnassign) return message.channel.send("Couldn't find the role!");
    if(!userToUnassign) return message.channel.send("Couldn't find the user!");
    if(!userToUnassign.roles.has(roleToUnassign.id)) return message.channel.send("The user doesn't have the role!");
    userToUnassign.removeRole(roleToUnassign.id);
    message.reply(`Role ${roleName} taken from ${userToUnassign}.`);
    return;
  }
  else if(cmdType.toLowerCase() === "list"){
    const roleList = message.guild.roles.map(e=>e.toString()).join(" ");
    message.channel.send(roleList);
    return;
  }
  else {
    message.reply("Invalid arguments.");
  }
}

module.exports.cmdCore = {
  name: "role"
}
