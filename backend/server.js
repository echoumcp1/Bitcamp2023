const express = require('express')
cors = require('cors')
const app = express()
const port = 2000
require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");

app.use(cors({origin: "http://localhost:3000", credentials: true}))


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const response = async ()=> {
    const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Decide whether this payment is tax credit eligible? why? \n\nPayment: \"University of Maryland\"\nYes or No, tax credit eligible:",
        max_tokens: 30
        });
    return result.data.choices[0].text;
    };

app.get('/', async (req, res) => {
    const result = await response();
    console.log(result);
  res.json(result);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})