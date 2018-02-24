const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  let {body} = await superagent
  .get(`https://random.dog/woof.json`);
  let dogMsg = body.url;
  message.channel.send("Doggo", {
    file: dogMsg // Or replace with FileOptions object
  });
}

module.exports.cmdCore = {
  name: "dog"
}
