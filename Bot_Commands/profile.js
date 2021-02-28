const db = require('quick.db');
const config = require('../config');
module.exports.func = function (bot, msg) {
    var user = msg.mentions.users.first() || msg.author
    var level = db.get(`guild_${msg.guild.id}_user_${user.id}.level`);
    let xp = db.get(`guild_${msg.guild.id}_user_${user.id}.xp`);
    let totalxp = db.get(`guild_${msg.guild.id}_user_${user.id}.xpTotal`);
    var money = db.get(`guild_${msg.guild.id}_user_${user.id}.bal`)
    var totalMessages = db.get(`guild_${msg.guild.id}_totalMessages_${user.id}`)
    let badge = db.get(`guild_${msg.guild.id}_user_${user.id}.inv.badge`)

    rankURL = config.ranks[badge]

    msg.channel.send("", {
        embed: {
            title:  `${user.username}'s Profile`,
            color: 8677597,
            fields: [
                {
                    name: "Level",
                    value: `Level ${level}`,
                    inline: true
                },
                {
                    name: "XP",
                    value: `${xp} xp`,
                    inline: true
                },
                {
                    name:"total XP",
                    value: totalxp,
                    inline: true

                },
                {
                    name: "Balance",
                    value: `£${money}`,
                    inline: true
                },
                {
                    name: "Server Messages",
                    value: `${totalMessages} Total Messages`
                }
            ],
            footer: {
                text: "ConvoStart"
            },
            timestamp: new Date(),
            image: {
                url: user.avatarURL()
            },
            thumbnail: {
                url: rankURL
            }
        }
    })
};