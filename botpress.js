```javascript
const Botpress = require('botpress');
const config = require('./config.json');

// Initialize Botpress with your bot ID and bot secret
const botpress = new Botpress({
  botId: config.botpress.botId,
  botSecret: config.botpress.botSecret
});

// Define a function to send a message to the bot
async function sendMessageToBot(message) {
  try {
    // Send a message to the bot and get the bot's response
    const response = await botpress.sendMessage({
      type: 'text',
      text: message
    });

    // Log the bot's response
    console.log('Bot response:', response);

  } catch (error) {
    console.error('Error sending message to bot:', error);
  }
}

// Export the sendMessageToBot function so it can be used in other files
module.exports = {
  sendMessageToBot
};
```
