const db = require('quick.db');
const Discord = require('discord.js');

module.exports.func = function (bot, msg) {
    var user = msg.mentions.users.first() || msg.author
    var args = msg.content.split(" ");
    args.splice(0, 1);
    args = args.join(" ");

    if (msg.author.id !== '204334658329116674') return;
    db.set(`guild_${msg.guild.id}_user_${user.id}.bal`, args)
    msg.reply(`set ${user.username}'s balance to ${args}`);
};