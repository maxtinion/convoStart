const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const db = require('quick.db');

const util = require('./util.js');

const fs = require("fs");
const request = require('request');
const { xpMoney } = require("./util.js");

client.on("ready", () => {

  client.user.setPresence({ activity: { name: `^help for cmds | I am in ${client.guilds.cache.size} servers!` }, status: 'idle' })

  client.channels.cache.get(config.startupChannel).send("", {
    embed: {
      title: "ConvoStart online!",
      description: `I have started up again, I am in ${client.guilds.cache.size} guilds, ${client.channels.cache.size} channels, and I can see ${client.users.cache.size} people! :ice_cream:`,
      timestamp: new Date(),
      color: 0x0049FF
    }
  });

  console.log(`Logged in as ${client.user.username}!`);

});

client.on("guildMemberAdd", member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
  if (!channel) return;
  channel.send(`Everyone welcome ${member} to the server!`);
});

client.on("guildMemberRemove", member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
  if (member.guild.id === "110373943822540800") return;
  let guild = member.guild;
  guild.defaultChannel.send(`${member.user.username} has left. :ice_cream:`);
});

client.on("guildCreate", guild => {
  guild.channels.cache.find(ch => ch.name === 'member-log' || 'general').send(`Hi! I'm ConvoStart, a bot created with the sole purpose of pushing you out of awkward silence and other social hitches!`);
  client.user.setPresence({ activity: { name: `^help for cmds | I am in ${client.guilds.cache.size} servers!` }, status: 'idle' })
});

client.on("guildDelete", guild => {
  client.user.setPresence({ activity: { name: `^help for cmds | I am in ${client.guilds.cache.size} servers!` }, status: 'idle' })
  client.channels.cache.find(config.guildchannelid).send(`:envelope_with_arrow: OAuth left ${guild.name}. I am now in ${client.guilds.size} guilds. :ice_cream:`);
});

client.on("message", msg => {
  if (msg.author.bot) return;
  let prefix = "^";
  var commands = fs.readdirSync("./bot_commands/");
  if (msg.content.startsWith(prefix)) {
    var command = msg.content.split(" ")[0].replace("^", "");
    if (commands.indexOf(command + ".js") > -1) {
      var cmd = require("./bot_commands/" + command + ".js");
      var args = msg.content.split(" ");
      args.splice(0, 1);
      args = args.join(" ");
      try {
        cmd.func(client, msg, args);
      } catch (err) {
        console.log("error", "Command " + command + " error! " + err.stack);
        msg.channel.send(":warning: Error in the `COMMAND_LOAD` event! This has been reported! :ice_cream:");
        client.channels.cache.get(config.errorid).send("", {
          embed: {
            title: ":warning: Error :warning:",
            description: "Error during the `COMMAND_LOAD` event. Stack trace in console. **Shortened Error:**\n```js\n" + err + "```",
            timestamp: new Date(),
            color: 0xFF0000
          }
        });
      }
    }
  } else if (msg.content.startsWith(`<@${msg.client.user.id}>`) || msg.content.startsWith(`<@!${msg.client.user.id}>`)) {
    util.handleTalk(msg);
  } else {
    xpMoney(msg)
    db.add(`guild_${msg.guild.id}_totalMessages_${msg.author.id}`, 1);
  }

});

client.login(config.token);