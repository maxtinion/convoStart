module.exports.func = function (bot, msg) {
  let startTime = Date.now();
  msg.reply("Calculating roundtrip....").then((message) => {
    let endTime = Date.now();
    message.edit(":ice_cream: | Delay is:" + Math.round(endTime - startTime) + "ms");
  }
  )
};