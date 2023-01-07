import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config({ path: '../.env' });

console.log(process.env.OPENAI_API_KEY)

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from CodeX!'
    })
})

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        console.log("ErroSSS", prompt)

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0.7,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        console.log("ErroSSS", response.data.error)
        res.status(200).send({
            bot: response.data.choices[0].text
        });

    } catch (error) {
        console.log('Err:', error)
        res.status(500).send(error || 'Something went wrong');
    }
})

app.listen(3400, () => console.log('AI server started on http://localhost:3400'))