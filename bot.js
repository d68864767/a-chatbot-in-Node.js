```javascript
const Botkit = require('botkit');
const config = require('./config.json');

const controller = Botkit.slackbot({
  debug: false,
});

controller.spawn({
  token: config.botkit.token,
}).startRTM(function(err) {
  if (err) {
    throw new Error(err);
  }
});

controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', function(bot, message) {
  bot.reply(message, 'Hello! How can I assist you today?');
});

controller.hears(['help'], 'direct_message,direct_mention,mention', function(bot, message) {
  bot.reply(message, 'Sure, I can help you. What do you need help with?');
});

controller.hears(['bye', 'goodbye'], 'direct_message,direct_mention,mention', function(bot, message) {
  bot.reply(message, 'Goodbye! Have a great day!');
});

module.exports = controller;
```
