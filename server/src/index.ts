import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World!")

    // res.json({ message: "Hello World!" })
})

const port = 8080
app.listen(process.env.PORT || port, () =>
    console.log(`Web server running @ http://localhost:${port}`),
)
