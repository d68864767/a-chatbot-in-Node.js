```javascript
const openai = require('openai');
const config = require('./config.json');

openai.apiKey = config.openai.apiKey;

async function generateResponse(prompt) {
  const gptResponse = await openai.Completion.create({
    engine: 'davinci-codex',
    prompt: prompt,
    max_tokens: 60
  });

  return gptResponse.choices[0].text.trim();
}

module.exports = {
  generateResponse
};
```
