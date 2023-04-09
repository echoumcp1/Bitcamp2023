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
      model: "ada:ft-personal-2023-04-08-22-14-08",
      prompt: "University of Maryland ->",
      temperature: 0,
      max_tokens: 20,
      top_p: 1,
      frequency_penalty: 2,
      presence_penalty: -2,
    });
    return result.data.choices[0].text;
    };

app.get('/', async (req, res) => {
    const result = await response();
    let processed = result.replace(/#|!/g, "")
    console.log(processed)
    
  res.json(result);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})