const config = require("../config.json");
module.exports.func = function (bot, msg) {
  var arr = config.starters;
  var starter = arr[Math.floor(Math.random() * arr.length)];
  msg.channel.send(starter);
};