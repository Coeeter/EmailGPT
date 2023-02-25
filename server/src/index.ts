import express from "express"
import cors from "cors"

import composeController from "./controllers/composeController"

const app = express()
app.use(express.json())

app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.route("/compose").post(composeController.composeEmail)

app.listen(8080, () => {
    console.log("Server started on http://localhost:8080")
})
