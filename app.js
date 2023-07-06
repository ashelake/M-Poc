const express = require("express");
const connectDatabase = require("./config/db");
const { router } = require("./Routes/method");
const { reportrouter } = require("./Routes/report");
require('dotenv').config()
const cors = require("cors");
const { hpclrouter } = require("./Routes/hpcl");
const app = express();
app.use(cors())
app.use(express.json())
app.use("/", router)
app.use("/", reportrouter);
app.use("/", hpclrouter)

app.listen(process.env.PORT || 4004, async () => {
    try {
        await connectDatabase()
        console.log(`listening on port ${process.env.PORT}`)
    } catch (error) {
        console.log(error.message)
    }
})