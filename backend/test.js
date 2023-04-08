const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Decide whether this payment is tax deductable\n\nPayment: \"payment for mortgage interest\"\nTax-Deducitable: \nYes, this payment is tax-deductible.",
  temperature: 0,
  max_tokens: 60,
  top_p: 1,
  frequency_penalty: 0.5,
  presence_penalty: 0,
});

console.log(response)