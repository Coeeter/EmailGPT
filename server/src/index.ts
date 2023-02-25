import express from "express"
import cors from "cors"

import enhanceController from "./controllers/enhanceController"
import composeController from "./controllers/composeController"

require("dotenv").config()

const app = express()
app.use(express.json())

app.use(cors())
app.use(express.json())

app.route("/enhance-email").post(enhanceController.enhanceEmail)
app.route("/enhance-reply").post(enhanceController.enhanceReply)
app.route("/enhance-quirky").post(enhanceController.enhanceQuirky)
app.route("/enhance-corporate").post(enhanceController.enhanceCorporate)
app.route("/enhance-casual").post(enhanceController.enhanceCasual)

app.route("/compose-email").post(composeController.composeEmail)
app.route("/compose-reply").post(composeController.composeReply)

const port = 8080
app.listen(process.env.PORT || port, () =>
    console.log(`Express server running @ http://localhost:${port}`),
)
