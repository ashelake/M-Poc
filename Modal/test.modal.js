const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    name: String,
    column: String,
    flow_ramp: String,
    detector: String,
    wavelength: String,
    injection_volume: String,
    column_temprature: String,
    cooler_temprature: String

})

const Test = mongoose.model("tests", TestSchema)

module.exports = Test