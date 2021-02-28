const request = require('request');

module.exports.func = function (bot, msg) {
  request("http://quotes.stormconsultancy.co.uk/random.json", function (error, response, body) {
    if (!error) {
      let apiResponse = JSON.parse(body);
      msg.channel.send("", {
        embed: {
          title: "Here's a random quote:",
          description: `${apiResponse.quote} \n-${apiResponse.author}`,
          timestamp: new Date(),
          color: 0xcc6600
        }
      });
    }
  });
};