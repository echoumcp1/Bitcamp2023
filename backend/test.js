const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: "ft-8vPYupUNlaXvKyzgS31Uid4S",
  prompt: "University of Maryland",
  temperature: 0,
  max_tokens: 60,
  top_p: 1,
  frequency_penalty: 0.5,
  presence_penalty: 0,
});

console.log(response)