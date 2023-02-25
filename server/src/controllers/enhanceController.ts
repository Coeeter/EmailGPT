import { Request, Response } from "express"
import promptGPT from "../api/promptOpenAI"

const enhanceEmail = async (req: Request, res: Response) => {
    try {
        const body = req.body

        const prompt = `
        PROMPT: Enhance the content of this email.
        SUBJECT: ${body.subject || ""} CONTENT: ${body.content}`

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

const enhanceReply = async (req: Request, res: Response) => {
    try {
        const body = req.body

        const prompt = `
        PROMPT: Enhance the content of this email reply based on the context of the parent email.
        SUBJECT: ${body.subject || ""} CONTENT: ${body.content} CONTEXT: ${
            body.context
        }`

        console.log("⚡Enhance Reply\n", prompt)

        const completion = await promptGPT(prompt)
        res.status(200)
        res.send({
            echo: body,
            content: completion.choices[0].text,
        })
        console.log(completion)
    } catch {
        res.status(500).send("Error")
    }
}

export default { enhanceEmail, enhanceReply }
