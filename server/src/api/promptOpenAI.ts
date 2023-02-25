import { Configuration, OpenAIApi } from "openai"

require("dotenv").config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

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

export default promptGPT
