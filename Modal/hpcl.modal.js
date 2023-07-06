const mongoose = require('mongoose');

const HPCLSchema = new mongoose.Schema({
    name: String,
    location: String,
    installation_date: Date,
    status: Boolean,
    is_Use: Boolean,
    is_maintenance: Boolean,
    is_calibration: Boolean,
    logs: Array
})

const HPCL = mongoose.model("hpcls", HPCLSchema)

module.exports = HPCL