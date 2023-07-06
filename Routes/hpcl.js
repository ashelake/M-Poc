const express = require('express')
const Test = require('../Modal/test.modal')
const HPCL = require('../Modal/hpcl.modal')

const hpclrouter = express.Router()

hpclrouter.get("/hpcl", async (req, res) => {
    try {

        let allHPCL = await HPCL.find({})
        res.status(200).send(allHPCL)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

//scanner api
hpclrouter.get("/hpcl/:id", async (req, res) => {
    try {

        let allHPCL = await HPCL.findById({ _id: req.params.id })
        res.status(200).send(allHPCL)
    } catch (error) {
        res.status(404).send(error.message)
    }
})
hpclrouter.patch("/hpcl/:id", async (req, res) => {
    try {

        let updatedHPCL = await HPCL.findByIdAndUpdate({ _id: req.params.id }, req.body)
        res.status(200).send(updatedHPCL)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = { hpclrouter }