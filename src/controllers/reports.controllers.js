import Report from '../models/report.model.js';

const addReport = async (req, res, next) => {
    try {
        const {groupName, numberOfBooksDistributed, krishnaKathaPoints, sankirtanPoints, gaurNitaiPleasingPoints, date} = req.body;

        const report = await Report.create({
            groupName,
            numberOfBooksDistributed,
            krishnaKathaPoints,
            sankirtanPoints,
            gaurNitaiPleasingPoints,
            date
        });

        res.status(201).json(report);
    } catch(error){
        next(error);
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
    } catch(error){
        next(error);
    }
}

const groupReportByName = async (req, res, next) => {
    try {
        const {groupName} = req.body;

        const groupReport = await Report.aggregate([
            {
                $match: {
                    groupName: groupName,
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
        if (groupReport.length === 0) {
            return res.status(404).json({ message: "No reports found for this group" });
        }

        res.status(200).json(groupReport);
    } catch(error){
        next(error);
    }   
}


export {
    addReport,
    groupWiseReport,
    groupReportByName
}