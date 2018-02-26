const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }
  var commandsLoaded = 0;
  jsfile.forEach((f) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} is loaded!`);
    bot.commands.set(props.cmdCore.name, props);
    commandsLoaded++;
  });
  console.log("Loaded "+commandsLoaded+" commands.");
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("the Jedi die", {type:"WATCHING"});
  // console.log(bot.channels);
  // bot.sendMessage('264040694170124289', "test");
  var channelTest = bot.channels.get('416233283739844610');
  channelTest.send("I have been restarted.");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let pureTextCmd = message.content;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);
  let commandFile = bot.commands.get(cmd.slice(prefix.length));
  let prefixCheck = message.content.charAt(0);
  if(commandFile && prefixCheck === prefix) commandFile.run(bot, message, args);

  if (pureTextCmd.match(/bye/i)){
   message.channel.send("Bye-bye!");
  }
  if (pureTextCmd.match(/bad bot/i)){
   message.channel.send(":sob:");
  }
  if (pureTextCmd.toLowerCase() === "sorry"){
   message.channel.send("It's fine.");
  }
  if(pureTextCmd.toLowerCase() === "get whipped") {
    const gotWhippedEmoji = message.client.emojis.get("401147112751890432");
    message.channel.send(`${gotWhippedEmoji}`);
  }
  if(pureTextCmd.toLowerCase() === "guess whos back") {
    message.channel.send("back again, R2's back, tell the friends!");
  }
});

bot.login(process.env.token);
