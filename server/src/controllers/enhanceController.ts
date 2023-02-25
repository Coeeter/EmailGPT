import { Request, Response } from "express"
import { Configuration, OpenAIApi } from "openai"

require("dotenv").config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const enhanceEmail = async (req: Request, res: Response) => {
    try {
        const body = req.body

        const prompt = `SUBJECT: ${body.subject || ""} CONTENT: ${
            body.content
        } PROMPT: Enhance the content of this email.`

        const completion = await promptGPT(prompt)
        res.status(200)
        res.send({
            echo: body,
            content: completion.choices[0].text,
        })
    } catch {
        res.status(500).send("Error")
    }
}

const promptGPT = async (prompt: string) => {
    try {
        // console.log("🔑🔑🔑", process.env.OPENAI_API_KEY)

        const completion = await openai.createCompletion({
            prompt: prompt,
            model: "text-davinci-003",
            max_tokens: 200,
            temperature: 0.4,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
        return completion.data
    } catch (err) {
        console.log("Error Request ❌", err)
        console.log("Error Data ❌❌", err.config)
        return err
    }
}

export default { enhanceEmail }
