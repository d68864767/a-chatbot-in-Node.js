```javascript
const { BotFrameworkAdapter, ConversationState, MemoryStorage, UserState } = require('botbuilder');
const { BotActivityHandler } = require('./botActivityHandler');
const config = require('./config.json');
const restify = require('restify');

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about how bots work.
const adapter = new BotFrameworkAdapter({
    appId: config.botframework.appId,
    appPassword: config.botframework.appPassword
});

// Define the state store for your bot.
// See https://aka.ms/about-bot-state to learn more about using MemoryStorage.
const memoryStorage = new MemoryStorage();

// Create conversation and user state with in-memory storage provider.
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);

// Create the main dialog.
const botActivityHandler = new BotActivityHandler(conversationState, userState);

// Create HTTP server.
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log(`\n${server.name} listening to ${server.url}`);
    console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator');
    console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
});

// Listen for incoming requests.
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        // Route to main dialog.
        await botActivityHandler.run(context);
    });
});

module.exports = server;
```
