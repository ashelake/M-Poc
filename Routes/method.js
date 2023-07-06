const express = require('express')
const Test = require('../Modal/test.modal')

const router = express.Router()


router.get("/", (req, res) => {
    res.status(200).send("Hello World")
})

router.get("/test", async (req, res) => {

    try {
        let allTest = await Test.find({})
        res.status(200).send(allTest)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post("/createtest", async (req, res) => {
    try {

        let newTest = await Test.insertMany(req.body)

        res.status(201).send(newTest)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch("/edittest/:id", async (req, res) => {
    try {
        let newTest = await Test.findByIdAndUpdate({ _id: req.params.id }, req.body)
        res.status(200).send(newTest)
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = { router }