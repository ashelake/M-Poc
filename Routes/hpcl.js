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

        let singlehpcl = await HPCL.findById({ _id: req.params.id })

        let status = req.body.status
        let statusValue = req.body.statusValue

        if (status === "is_Use") {
            if (statusValue) {
                singlehpcl.is_Use = statusValue
                singlehpcl.is_maintenance = false
                // singlehpcl.is_calibration = false
            } else {
                singlehpcl.is_Use = statusValue
                singlehpcl.is_calibration = false
            }
        } else if (status === "is_maintenance") {
            singlehpcl.is_maintenance = statusValue
            if (!singlehpcl.is_Use) { //is  OFF
                // singlehpcl.is_maintenance = statusValue
                // if (singlehpcl.is_Use) singlehpcl.is_Use = false
                if (singlehpcl.is_calibration) singlehpcl.is_calibration = false
            } else { // is ON
                // singlehpcl.is_maintenance = statusValue
                singlehpcl.is_Use = false
                if (singlehpcl.is_calibration) singlehpcl.is_calibration = false
            }
        } else if (status === "is_calibration") {
            singlehpcl.is_calibration = statusValue
            if (singlehpcl.is_Use) { //is  ON
                if (singlehpcl.is_maintenance) singlehpcl.is_maintenance = false
            } else { //is  OFF
                singlehpcl.is_Use = true
                if (singlehpcl.is_maintenance) singlehpcl.is_maintenance = false
            }
        }


        // if (status === "is_maintenance" || status === "is_calibration") {
        //     if (singlehpcl.is_Use) {
        //         if (singlehpcl.is_maintenance) {
        //             singlehpcl.is_maintenance = false
        //             singlehpcl.is_Use = false
        //         }
        //         if (!singlehpcl.is_calibration) {
        //             singlehpcl.is_maintenance = true
        //         }
        //     }
        //     else {
        //         if (!singlehpcl.is_maintenance) {
        //             singlehpcl.is_maintenance = true
        //         }
        //         if (singlehpcl.is_calibration) {
        //             singlehpcl.is_maintenance = false
        //         }
        //     }
        // }
        // else {
        //     singlehpcl.is_Use = req.body.statusValue
        // }

        let updatedHPCL = await HPCL.findByIdAndUpdate({ _id: req.params.id }, singlehpcl)
        res.status(200).send(updatedHPCL)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

hpclrouter.get("/calendar", (req, res) => {
    try {

        let date = req.query.date


        let array = [
            {
                date: "2023-07-06",
                used: 5,
                calibration: 6,
                maintenance: 10
            },
            {
                date: "2023-07-05",
                used: 10,
                calibration: 6,
                maintenance: 20
            },
            {
                date: "2023-07-04",
                used: 12,
                calibration: 16,
                maintenance: 2
            },
            {
                date: "2023-07-03",
                used: 15,
                calibration: 16,
                maintenance: 30
            },
            {
                date: "2023-07-02",
                used: 25,
                calibration: 0,
                maintenance: 3
            },
            {
                date: "2023-07-01",
                used: 7,
                calibration: 16,
                maintenance: 20
            },
            {
                date: "2023-06-30",
                used: 45,
                calibration: 6,
                maintenance: 10
            }
        ]
        for (let i = 0; i < array.length; i++) {
            if (date == array[i].date) {
                res.status(200).send(array[i])
            }
        }
        res.status(200).send({
            date: "2023-07-06",
            used: 0,
            calibration: 0,
            maintenance: 0

        })

    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = { hpclrouter }