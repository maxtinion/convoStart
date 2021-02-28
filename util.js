const request = require('request-promise-native');
const db = require('quick.db');
const config = require('./config.json');
const chat = config.chat

const handleTalk = async (msg) => {
    try {
        msg.content = msg.content.replace(/^<@!?[0-9]{1,20}> ?/i, '');
        if (msg.content.length < 2) return;
        msg.channel.startTyping(true);
        const options = {
            method: 'GET',
            url: chat.url,
            qs: {
                bid: chat.bid,
                key: chat.key,
                uid: chat.uid,
                msg: msg.content
            },
            json: true
        };
        let reply = await request(options);
        msg.channel.stopTyping(true);
        if (reply) {
            await msg.channel.send(reply.cnt);
        }
    } catch (e) {
        msg.channel.stopTyping(true);
        console.log(e);
    }
};

const xpMoney = async (msg) => {
    let decider = Math.round(Math.random() * (5 - 1) + 1);
    if (decider == 1) {
        let user = db.get(`guild_${msg.guild.id}_user_${msg.author.id}`);
        let xpGen = Math.round(Math.random() * (50 - 10) + 10);
        let moneyGen = Math.round(Math.random() * (50 - 20) + 20);
        let xpNeeded = db.get(`guild_${msg.guild.id}_user_${msg.author.id}.level`) * 500

        if (user === null) {

            db.set(`guild_${msg.guild.id}_user_${msg.author.id}`, { bal: moneyGen, xp: xpGen, xpTotal: xpGen, level: 1, inv: { badge: 0 } })
            msg.reply("An account has been created for you, use ^profile to check it out!")
        }

        else {
            db.add(`guild_${msg.guild.id}_user_${msg.author.id}.bal`, moneyGen)
            db.add(`guild_${msg.guild.id}_user_${msg.author.id}.xp`, xpGen)
            db.add(`guild_${msg.guild.id}_user_${msg.author.id}.xpTotal`, xpGen)
            msg.react('💸');

            if (db.get(`guild_${msg.guild.id}_user_${msg.author.id}.xp`) > xpNeeded) {
                db.add(`guild_${msg.guild.id}_user_${msg.author.id}.level`, 1);
                db.set(`guild_${msg.guild.id}_user_${msg.author.id}.xpTotal`, db.get(`guild_${msg.guild.id}_user_${msg.author.id}.xp`) + db.get(`guild_${msg.guild.id}_user_${msg.author.id}.xpTotal`));
                db.set(`guild_${msg.guild.id}_user_${msg.author.id}.xp`, 0);
                msg.reply(`congrats, you've reached level ${db.get(`guild_${msg.guild.id}_user_${msg.author.id}.level`)}!`);
            }
        }
    } else return;
}

module.exports = {
    handleTalk,
    xpMoney
};