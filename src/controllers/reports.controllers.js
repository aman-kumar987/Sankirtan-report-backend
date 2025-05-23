import Report from '../models/report.model.js';
import { validationResult } from 'express-validator';
import { ekadashiArray } from "../constants.js";


const addReport = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const message = errors.array().map(error => error.msg).join('\n');
            return res.status(400).json({
                status: "fail",
                message
            });
        }

        const { groupName, numberOfBooksDistributed, krishnaKathaPoints, sankirtanPoints, gaurNitaiPleasingPoints, date } = req.body;

        const report = await Report.create({
            groupName,
            numberOfBooksDistributed,
            krishnaKathaPoints,
            sankirtanPoints,
            gaurNitaiPleasingPoints,
            date
        });

        res.status(201).json({
            message: "Report added successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "adding report failed"
        })
    }
}

const groupWiseReport = async (req, res, next) => {
    try {
        const groupsReport = await Report.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(new Date("2025-05-08")),
                        $lt: new Date(new Date("2025-05-23"))
                    }
                }
            },
            {
                $group: {
                    _id: "$groupName",
                    totalNumberOfBooksDistributed: { $sum: "$numberOfBooksDistributed" },
                    totalKrishnaKathaPoints: { $sum: "$krishnaKathaPoints" },
                    totalSankirtanPoints: { $sum: "$sankirtanPoints" },
                    totalGaurNitaiPleasingPoints: { $sum: "$gaurNitaiPleasingPoints" }
                }
            },
            {
                $project: {
                    _id: 0,
                    groupName: "$_id",
                    totalNumberOfBooksDistributed: 1,
                    totalKrishnaKathaPoints: 1,
                    totalSankirtanPoints: 1,
                    totalGaurNitaiPleasingPoints: 1
                }
            }
        ]);

        if (groupsReport.length === 0) {
            return res.status(404).json({ message: "No reports found for this group" });
        }


        res.status(200).json(groupsReport);
    } catch (error) {
        res.status(500).json({
            message: "failed fetching groups"
        })
    }
}

const groupReportByName = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const message = errors.array().map(error => error.msg).join('\n');
            return res.status(400).json({
                status: "fail",
                message
            });
        }
        const { groupName } = req.body;
        let latestPreviousDate = getLatestPreviousDate(ekadashiArray, new Date("2025-05-24").toDateString())
        
        const groupReport = await Report.aggregate([
            {
                $match: {
                    groupName: groupName,
                    date: {
                        $gte: [new Date(new Date(latestPreviousDate))]
                    }
                }
            },
            {
                $group: {
                    _id: "$groupName",
                    totalNumberOfBooksDistributed: { $sum: "$numberOfBooksDistributed" },
                    totalKrishnaKathaPoints: { $sum: "$krishnaKathaPoints" },
                    totalSankirtanPoints: { $sum: "$sankirtanPoints" },
                    totalGaurNitaiPleasingPoints: { $sum: "$gaurNitaiPleasingPoints" }
                }
            },
            {
                $project: {
                    _id: 0,
                    groupName: "$_id",
                    totalNumberOfBooksDistributed: 1,
                    totalKrishnaKathaPoints: 1,
                    totalSankirtanPoints: 1,
                    totalGaurNitaiPleasingPoints: 1
                }
            }
        ]);
        if (groupReport.length === 0) {
            return res.status(404).json(groupReport);
        }

        res.status(200).json(groupReport);
    } catch (error) {
        console.log(error);
        // res.status(500).json({
        //     message: "failed fetching group's report"
        // })
    }
}

function getLatestPreviousDate(dateArray, userDateInput) {
    const userDate = new Date(userDateInput);

    // Filter dates that are before the user date
    const previousDates = dateArray
        .map(dateStr => new Date(dateStr))
        .filter(date => date < userDate);

    if (previousDates.length === 0) return null;

    // Find the latest (most recent) of the previous dates
    const latestPreviousDate = new Date(Math.max(...previousDates));

    return latestPreviousDate; // return in YYYY-MM-DD format
}

export {
    addReport,
    groupWiseReport,
    groupReportByName
}