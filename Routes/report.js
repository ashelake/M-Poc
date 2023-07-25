const express = require('express')
const fs = require('fs');
const pdf = require('pdf-parse');

const multer = require('multer');
const Report = require('../Modal/report.modal');
const Test = require('../Modal/test.modal');
const reportrouter = express.Router()




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './pdf/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

reportrouter.post('/pdf', upload.single('file'), async function (req, res) {

    let report = {
        originalname: req.file.originalname,
        path: req.file.path,
        upload_date: new Date()
    }
    let uploadedFile = await Report.insertMany(report)

    res.status(200).json(uploadedFile)
})

reportrouter.get("/report", async (req, res) => {
    try {

        let getAllReport = await Report.find({})

        res.status(200).json(getAllReport)
    } catch (error) {
        res.status(404).json(error.message)
    }
})

reportrouter.post("/calculate", async (req, res) => {
    try {

        let getReport = await Report.findById({ _id: req.body.report_id })
        let testMethod = await Test.findById({ _id: req.body.test_id })
        let dataBuffer = fs.readFileSync(`${getReport.path}`);


        // const testMethod = {
        //     name: "1",
        //     flow_rate: "2",
        //     wave_length: "3",
        //     injection_volume: "4",
        //     column: "5",
        //     column_temperature: "6",
        //     sample_cooler_temperature: "7",
        //     pump_mode: "Gradient",
        //     high_limit: "5000",
        //     // high_limit: "5000.0",
        //     stroke_volume: '130uL (flow rates <= 10.000 mL/min)',
        //     sample_temp_target: '5.1',
        //     sample_temp_range: '2.0',
        //     flow: '2.0',
        //     flow_ramp: '2.0',
        // }

        const wordList = [
            "Stroke Volume",
            "Flow",
            "Flow Ramp",
            "Pump Mode",
            "High Limit",
            "Sample Temp Target",
            "Sample Temp Range",
            "Column Temp Target",
            "Column Temp Range",
        ];
        pdf(dataBuffer).then(function (data) {
            var text = data.text;
            var eachLine = text.split('\n');

            let returnData = [];
            for (var i = 0, l = eachLine.length; i < l; i++) {

                for (var j = 0, k = wordList.length; j < k; j++) {

                    var pattern = new RegExp('\\b(' + wordList[j] + ')\\b', 'i');

                    var matchedWord = eachLine[i].match(pattern);
                    if (matchedWord) {
                        var remainingWords = returnRemainingWords(eachLine[i], matchedWord);

                        let reportData = compareValues(wordList[j], remainingWords);

                        let matchedObject = {

                            matchedWord: matchedWord[0],
                            matchedFor: wordList[j],

                            isCorrect: reportData.isValid,
                            standardVal: reportData.std_val,
                            reportedVal: reportData.live_val,
                        }

                        returnData.push(matchedObject);

                    }
                }

            }
            // console.log("returnData", returnData)
            res.status(200).json(returnData)
        }).catch(function (error) {

            console.log("pdf extraction error", error)
        });
        const returnRemainingWords = (inputString, matchedWord) => {
            try {
                var remainingWords = inputString.substring(matchedWord.index + matchedWord[0].length).trim();

                return remainingWords;
            } catch (error) {
                console.log("returnRemainingWords  error", error)
            }
        }
        const compareValues = (standard, live) => {
            let details = {
                std_val: null,
                live_val: null,
                isValid: false,
            };
            var name = standard.toLowerCase().replace(/\s+/g, '_');
            let stdVal = testMethod[name];
            if (!stdVal)
                details.std_val = 'No Standard Value';
            else {
                details.isValid = (stdVal === live);
                details.live_val = live;
                details.std_val = stdVal;
            }

            // return stdVal ? stdVal : null;
            return details;
        }



    } catch (error) {
        res.status(404).json(error.message)
    }
})
module.exports = { reportrouter }