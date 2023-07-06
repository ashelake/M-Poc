const mongoose = require('mongoose');

const HPCLSchema = new mongoose.Schema({
    name: String,
    location: String,
    installation_date: Date,
    status: Boolean,
    logs: Array
})

const HPCL = mongoose.model("hpcls", HPCLSchema)

module.exports = HPCL