import { Request, Response } from "express"
import promptGPT from "../api/promptOpenAI"

const enhanceEmail = async (req: Request, res: Response) => {
    try {
        const body = req.body

        const prompt = `
        PROMPT: Enhance the content of this email, do not change the subject line.
        SUBJECT: ${body.subject || ""} CONTENT: ${body.content}`

        console.log("⚡Enhance Email Prompt 🖊️\n", prompt)

        const completion = await promptGPT(prompt)

        res.status(200).send({
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
        PROMPT: Enhance the content of this email reply based on the context of the parent email, do not change the subject line.
        SUBJECT: ${body.subject || ""} CONTENT: ${body.content} CONTEXT: ${
            body.context
        }`

        console.log("⚡Enhance Reply Prompt 🖊️\n", prompt)

        const completion = await promptGPT(prompt)

        res.status(200).send({
            content: completion.choices[0].text,
        })
    } catch {
        res.status(500).send("Error")
    }
}

const enhanceQuirky = async (req: Request, res: Response) => {
    try {
        const body = req.body

        const prompt = `
        PROMPT: Make this email content more quirky with slang.
        SUBJECT: ${body.subject || ""} CONTENT: ${body.content}`

        console.log("⚡Enhance Quirky Prompt 🖊️\n", prompt)

        const completion = await promptGPT(prompt)

        res.status(200).send({
            content: completion.choices[0].text,
        })
    } catch {
        res.status(500).send("Error")
    }
}

const enhanceCorporate = async (req: Request, res: Response) => {
    try {
        const body = req.body

        const prompt = `
        PROMPT: Make the following email content more corporate, do not include the subject line in the completed response.
        SUBJECT: ${body.subject || ""} CONTENT: ${body.content}`

        console.log("⚡Enhance Corporate Prompt 🖊️\n", prompt)

        const completion = await promptGPT(prompt)

        res.status(200).send({
            content: completion.choices[0].text,
        })
    } catch {
        res.status(500).send("Error")
    }
}

const enhanceCasual = async (req: Request, res: Response) => {
    try {
        const body = req.body

        const prompt = `
        PROMPT: Enhance the content of this email, do not change the subject line.
        SUBJECT: ${body.subject || ""} CONTENT: ${body.content}`

        console.log("⚡Enhance Casual Prompt 🖊️\n", prompt)

        const completion = await promptGPT(prompt)

        res.status(200).send({
            content: completion.choices[0].text,
        })
    } catch {
        res.status(500).send("Error")
    }
}

export default {
    enhanceEmail,
    enhanceReply,
    enhanceQuirky,
    enhanceCorporate,
    enhanceCasual,
}
