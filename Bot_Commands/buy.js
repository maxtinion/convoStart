const db = require('quick.db');
const config = require('../config.json');

module.exports.func = function (bot, msg) {
    if (db.get(`guild_${msg.guild.id}_user_${msg.author.id}`) == null) return;

    let ranks = ["Unranked", "Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Immortal", "Radiant"]
    let currentRank = db.get(`guild_${msg.guild.id}_user_${msg.author.id}.inv.badge`)
    let rankCost = currentRank * 500 + 500
    let nextRank = ranks[currentRank + 1]
    let rank = ranks[currentRank]
    let rankURL = config.ranks[nextRank]

    var args = msg.content.split(" ");
    args.splice(0, 1);
    args = args.join(" ");

    if (args == '' && currentRank < 8) {
        msg.channel.send("", {
            embed: {
                title: 'Rank Shop',
                description: 'Here you can purchase a rank up with your accumulated currency! type "^buy rank" to upgrade your rank.',
                color: 15496,
                fields: [
                    {
                        name: 'Current Rank',
                        value: rank,
                        inline: true
                    },
                    {
                        name: 'Next Rankup',
                        value: nextRank,
                        inline: true
                    },
                    {
                        name: 'Cost of Rankup',
                        value: `£${rankCost}`,
                        inline: true
                    }
                ],
                footer: {
                    text: 'ConvoStart'
                },
                timestamp: new Date(),
                image: {
                    url: 'https://cdn.discordapp.com/attachments/553222961663049749/813219098405896242/ranks.png'
                }
            }
        })
    } else if (args == '' && currentRank >= 8) {
        msg.reply("you've already reached the top!")
    } else if (args == 'rank') {
        if (db.get(`guild_${msg.guild.id}_user_${msg.author.id}.bal`) >= rankCost) {
            db.subtract(`guild_${msg.guild.id}_user_${msg.author.id}.bal`, rankCost)
            db.add(`guild_${msg.guild.id}_user_${msg.author.id}.inv.badge`, 1)
            msg.channel.send("", {
                embed: {
                    title: 'Rank Upgraded!',
                    description: `${msg.author.username} has upgraded their rank from ${ranks[currentRank]} to ${nextRank}`,
                    color: 15496,
                    footer: {
                        text: 'ConvoStart'
                    },
                    timestamp: new Date(),
                    image: {
                        url: rankURL
                    }
                }
            })
        } else {
            msg.reply("you don't have enough to buy that!")
        }
    } else return;
};