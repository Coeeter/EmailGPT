import express from "express"
import cors from "cors"

import enhanceController from "./controllers/enhanceController"

require("dotenv").config()

const app = express()
app.use(express.json())

app.use(cors())
app.use(express.json())

app.route("/enhance-email").post(enhanceController.enhanceEmail)
app.route("/enhance-reply").post(enhanceController.enhanceReply)

const port = 8080
app.listen(process.env.PORT || port, () =>
      console.log(`Web server running @ http://localhost:${port}`),
)

