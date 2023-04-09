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
      prompt: `${body.payee}`,
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
    let index_of_Y = processed.indexOf("Y")
    let index_of_N = processed.indexOf("N")

    let new_string = ""
    if (index_of_Y === -1) {
      new_string = processed.substring(index_of_N)
    } else {
      new_string = processed.substring(index_of_Y)
    }
    console.log("new_string")
    let processed_array = new_string.split(",")
    
  res.json(processed_array);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})