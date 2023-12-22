```javascript
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const config = require('./config.json');

const sessionId = uuid.v4();

const sessionClient = new dialogflow.SessionsClient({
  projectId: config.dialogflow.projectId,
  credentials: {
    private_key: config.dialogflow.privateKey,
    client_email: config.dialogflow.clientEmail
  }
});

const sessionPath = sessionClient.projectAgentSessionPath(config.dialogflow.projectId, sessionId);

async function sendToDialogFlow(text) {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: text,
        languageCode: 'en-US',
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  return result.fulfillmentText;
}

module.exports = {
  sendToDialogFlow
};
```
