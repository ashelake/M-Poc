const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    originalname: String,
    path: String,
    upload_date: Date,
})

const Report = mongoose.model("reports", ReportSchema)

module.exports = Report