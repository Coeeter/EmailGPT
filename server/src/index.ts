import express from "express"
import cors from "cors"

import enhanceController from "./controllers/enhanceController"

require("dotenv").config()

const app = express()
app.use(express.json())

app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.route("/enhance-email").post(enhanceController.enhanceEmail)

app.listen(8080, () => {
    console.log("Server started on http://localhost:8080")
})
