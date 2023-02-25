import express, { Request, Response } from "express"

const composeEmail = async (req: Request, res: Response) => {
    try {
        const body = req.body
        res.status(200)
        res.send({
            echo: body,
            content: "Hello World!",
        })
    } catch {
        res.status(500).send("Error")
    }
}

export default { composeEmail }
