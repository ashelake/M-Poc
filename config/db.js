const mongoose = require('mongoose')
require("dotenv").config();
const connectDatabase = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongoose connected to ${connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDatabase