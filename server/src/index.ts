import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

app.post("/compose", (req, res) => {
    res.send({ message: "Hello World!" })
    console.log(req.body.subject, req.body.content)
    // res.json({ message: "Hello World!" })
})

const port = 8080
app.listen(process.env.PORT || port, () =>
    console.log(`Web server running @ http://localhost:${port}`),
)
