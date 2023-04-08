const express = require('express')
const app = express()
const port = 2000
require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const response = async ()=> {
    const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Decide whether this payment is tax deductable? why?\n\nPayment: \"payment for sales tax\"\nTax-Deducitable:"
        });
    return result.data.choices[0].text;
    };

app.get('/', async (req, res) => {
    const result = await response();
    console.log(result);
  res.send(result);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})