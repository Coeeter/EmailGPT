import { Request, Response } from "express"
import promptGPT from "../api/promptOpenAI"

const composeEmail = async (req: Request, res: Response) => {
    try {
        const body = req.body

        const prompt = `
        PROMPT: Create a new email based on the user’s prompt (identified with USER_PROMPT)
        USER_PROMPT: ${body.userPrompt || ""}    
        `

        console.log("⚡Compose Email Prompt 🖊️\n", prompt)

        const completion = await promptGPT(prompt)

        res.status(200).send({
            content: completion.choices[0].text,
        })
    } catch {
        res.status(500).send("Error")
    }
}

const composeReply = async (req: Request, res: Response) => {
    try {
        const body = req.body

        const prompt = `
        PROMPT: Create a reply based on the user’s prompt (identified with USER_PROMPT) and the context of the most recent email in the thread (identified with CONTEXT)
        USER_PROMPT: ${body.userPrompt || ""} 
        SUBJECT: ${body.subject || ""} 
        CONTEXT: ${body.context || ""}    
        `

        console.log("⚡Compose Reply Prompt 🖊️\n", prompt)

        const completion = await promptGPT(prompt)

        res.status(200).send({
            content: completion.choices[0].text,
        })
    } catch {
        res.status(500).send("Error")
    }
}

export default { composeEmail, composeReply }
