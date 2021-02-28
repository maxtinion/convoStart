const db = require('quick.db');
const Discord = require('discord.js');

module.exports.func = function (bot, msg) {
    var user = msg.mentions.users.first() || msg.author
    if (db.get(`guild_${msg.guild.id}_user_${user.id}.bal`) === null) {
        msg.reply(`You need to first create an account using \`^register\``)
    }

    else {

        let bal = db.get(`guild_${msg.guild.id}_user_${user.id}.bal`)

        const embed = new Discord.MessageEmbed()
            .setTitle(`${user.username}'s Balance`)
            .setDescription(`${bal} quid`)
            .setColor("GREEN")
            .setTimestamp()

        msg.channel.send(embed)

    }
};