# ConvoStart
a discord bot that starts and reinforces conversations within a server  
commercial [here](https://www.youtube.com/watch?v=6A32Cu7mEus)

# Prerequisites
1. Node.js
2. A Discord bot token
3. An account on brainshop.ai


# Deployment
1. Clone the repo or download as zip
2. open a terminal and run `npm install` in the root
3. edit the config.json
```javascript
    "token": "your token",
    "startupChannel": "startup channel",
    "guildchannelid": "guild channel",
    "errorid": "error channel",
    "chat": {
        "url": "your brainshop url",
        "bid": "brainshop id",
        "key": "brainshop key",
        "uid": "ConvoStart"
    },
```
3.open a terminal and run `node ./main.js` or put the same line in a .bat file in the root

# Commands
The bot has a multitude of commands, being as follows:
* ^help - gives a list of the available commands
* ^randomquote - fetches a random quote and sends it in an embed
* ^randomStarter - fetches a random conversation starter and sends it to the chat
* ^profile - used to show a user's profile only after they've been given an entry in the database.
* ^bal - used to show a user's currency balance, also only works after they have an entry in the database
* ^rank - shows a user's xp, level, and current ranking on the server's leaderboard
* ^buy - allows a user to upgrade their rank (shown on their profile) using currency built up over time
* You can also ping it and speak directly to it!

# License
ConvoStart is released under the [GNU GPL v3](https://www.gnu.org/licenses/gpl-3.0.en.html) license.
