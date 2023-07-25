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

        // if (status === "is_Use") {
        //     if (statusValue) {
        //         singlehpcl.is_Use = statusValue
        //         singlehpcl.is_maintenance = false
        //         // singlehpcl.is_calibration = false
        //     } else {
        //         singlehpcl.is_Use = statusValue
        //         singlehpcl.is_calibration = false
        //     }
        // } else if (status === "is_maintenance") {
        //     singlehpcl.is_maintenance = statusValue
        //     if (!singlehpcl.is_Use) { //is  OFF
        //         // singlehpcl.is_maintenance = statusValue
        //         // if (singlehpcl.is_Use) singlehpcl.is_Use = false
        //         if (singlehpcl.is_calibration) singlehpcl.is_calibration = false
        //     } else { // is ON
        //         // singlehpcl.is_maintenance = statusValue
        //         singlehpcl.is_Use = false
        //         if (singlehpcl.is_calibration) singlehpcl.is_calibration = false
        //     }
        // } else if (status === "is_calibration") {
        //     singlehpcl.is_calibration = statusValue
        //     if (singlehpcl.is_Use) { //is  ON
        //         if (singlehpcl.is_maintenance) singlehpcl.is_maintenance = false
        //     } else { //is  OFF
        //         singlehpcl.is_Use = true
        //         if (singlehpcl.is_maintenance) singlehpcl.is_maintenance = false
        //     }
        // }

        if (status === "is_Use") {
            singlehpcl.is_Use = statusValue
            if (singlehpcl.is_calibration) singlehpcl.is_calibration = false
            if (singlehpcl.is_maintenance) singlehpcl.is_maintenance = false
        } else if (status === "is_maintenance") {
            singlehpcl.is_maintenance = statusValue
            if (singlehpcl.is_Use) singlehpcl.is_Use = false
            if (singlehpcl.is_calibration) singlehpcl.is_calibration = false
        } else if (status === "is_calibration") {
            singlehpcl.is_calibration = statusValue
            if (singlehpcl.is_Use) singlehpcl.is_Use = false
            if (singlehpcl.is_maintenance) singlehpcl.is_maintenance = false
        }

        let updatedHPCL = await HPCL.findByIdAndUpdate({ _id: req.params.id }, singlehpcl)
        res.status(200).send(updatedHPCL)
    } catch (error) {
        res.status(404).send(error.message)
    }
})


hpclrouter.get("/calendar", async (req, res) => {
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

        let allHPCL = await HPCL.find({})



        // ..........................................................

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        class UniqueRandomSelector {
            constructor(array) {
                this.originalArray = array.slice();
                this.shuffledArray = [];
                this.currentIndex = 0;
            }

            initialize() {
                this.currentIndex = 0;
                if (this.shuffledArray.length === 0) {
                    this.shuffledArray = this.originalArray.slice();
                    shuffleArray(this.shuffledArray);
                }
            }

            getNext() {
                if (this.currentIndex >= this.shuffledArray.length) {
                    this.initialize();
                }

                const element = this.shuffledArray[this.currentIndex];
                this.currentIndex++;
                return element;
            }

            getRandomElements(count) {
                const selectedElements = [];
                for (let i = 0; i < count; i++) {
                    selectedElements.push(this.getNext());
                }
                return selectedElements;
            }
        }

        // Usage example:




        const randomSelector = new UniqueRandomSelector(allHPCL);


        // ............................................................


        // {
        //     date: "2023-07-06",
        //     used: 5,
        //     calibration: 6,
        //     maintenance: 10
        // }
        let result = []
        // for (let i = 0; i < array.length; i++) {
        //     if (date == array[i].date) {

        //         let resObject = {
        //             date: array[i].date,
        //             used: array[i].used,
        //             calibration: array[i].calibration,
        //             maintenance: array[i].maintenance,
        //             usedArray: [],
        //             calibrationArray: [],
        //             maintenanceArray: [],
        //         }
        //         // for (let i = 0; i < 3; i++) {

        //         if (array[i].used) {
        //             const numberOfElementsToSelect = Number(array[i].used);
        //             const randomElements = randomSelector.getRandomElements(numberOfElementsToSelect);
        //             resObject.usedArray = randomElements
        //         }
        //         if (array[i].calibration) {
        //             const numberOfElementsToSelect = Number(array[i].calibration);
        //             const randomElements = randomSelector.getRandomElements(numberOfElementsToSelect);
        //             resObject.calibrationArray = randomElements
        //         }
        //         if (array[i].maintenance) {
        //             const numberOfElementsToSelect = Number(array[i].maintenance);
        //             const randomElements = randomSelector.getRandomElements(numberOfElementsToSelect);
        //             resObject.maintenanceArray = randomElements
        //         }
        //         // }


        //         return res.status(200).send(resObject)
        //     }
        // }



        let used1 = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
        let calibration1 = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
        let maintenance1 = Math.floor(Math.random() * (20 - 10 + 1)) + 10;

        let resObject1 = {
            date: date,
            used: used1,
            calibration: calibration1,
            maintenance: maintenance1,
            usedArray: [],
            calibrationArray: [],
            maintenanceArray: [],
            notUsedArray: []
        }
        // for (let i = 0; i < 3; i++) {

        if (resObject1.used) {
            const numberOfElementsToSelect = Number(resObject1.used);
            const randomElements = randomSelector.getRandomElements(numberOfElementsToSelect);
            resObject1.usedArray = randomElements
        }
        if (resObject1.calibration) {
            const numberOfElementsToSelect = Number(resObject1.calibration);
            const randomElements = randomSelector.getRandomElements(numberOfElementsToSelect);
            resObject1.calibrationArray = randomElements
        }
        if (resObject1.maintenance) {
            const numberOfElementsToSelect = Number(resObject1.maintenance);
            const randomElements = randomSelector.getRandomElements(numberOfElementsToSelect);
            resObject1.maintenanceArray = randomElements
        }
        if (resObject1.notUsedArray) {
            const numberOfElementsToSelect = Math.abs(65 - (Number(resObject1.maintenance) + Number(resObject1.calibration) + Number(resObject1.used)));
            const randomElements = randomSelector.getRandomElements(numberOfElementsToSelect);
            resObject1.notUsedArray = randomElements
        }
        res.status(200).send(resObject1)

    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = { hpclrouter }