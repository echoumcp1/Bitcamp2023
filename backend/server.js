const express = require('express')
cors = require('cors')
const app = express()
const port = 2000
require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");

app.use(cors({origin: "http://localhost:3000", credentials: true}))
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const response = async (body)=> {
    const result = await openai.createCompletion({
      model: "ada:ft-personal-2023-04-08-22-14-08",
      prompt: `${body}`,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return result.data.choices[0].text;
    };

app.post('/api', async (req, res) => {
  console.log(req.body);
    const result = await response(req.body);
    let processed = result.replace(/#|!/g, "")
    let processed_array = processed.split(",")
    
  res.json(processed_array);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})