const db = require('quick.db');
const Canvacord = require('canvacord');
const Discord = require('discord.js');
const canvacord = require('canvacord');

module.exports.func = function (bot, msg) {
    var user = msg.mentions.users.first() || msg.author
    if (db.get(`guild_${msg.guild.id}_user_${user.id}`) == null) return;
    var level = db.get(`guild_${msg.guild.id}_user_${user.id}.level`);
    //level = level.toString();
    let xp = db.get(`guild_${msg.guild.id}_user_${user.id}.xp`);

    var xpNeeded = db.get(`guild_${msg.guild.id}_user_${user.id}.level`) * 500
    var money = db.get(`guild_${msg.guild.id}_user_${user.id}.bal`)
    let every = db
        .all()
        .filter(i => i.ID.startsWith(`guild_${msg.guild.id}_totalMessages_`))
        .sort((a, b) => b.data - a.data)
    var rank = every.map(x => x.ID).indexOf(`guild_${msg.guild.id}_totalMessages_${user.id}`) + 1
    //rank = rank.toString()
    var image = new canvacord.Rank()
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setAvatar(user.displayAvatarURL({ format: 'png' }))
        .setStatus(user.presence.status)
        .setCurrentXP(xp)
        .setRequiredXP(xpNeeded)
        .setProgressBar('PURPLE')
        .setRank(rank)
        .setLevel(level)
    image.build()
        .then(data => {
            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
            msg.channel.send(attachment);
        });
};