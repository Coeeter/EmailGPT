import { Request, Response } from "express"
import promptGPT from "../api/promptOpenAI"

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

export default { enhanceEmail }
