import Report from '../models/report.model.js';

const allGroups = async (req, res) => {
  try {
    const { minDate, maxDate } = req.body;
    const reports = await Report.aggregate([
        {
            $match: {
                date: {
                    $gte: new Date(new Date(minDate)),
                    $lte: new Date(new Date(maxDate))
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

    res.status(200).json({
      status: "success",
      message: "All groups fetched successfully",
      data: reports
    });
  } catch (error) {
    console.log(error);
  }
}

const byGroupName = async (req, res) => {
    try {
    const { minDate, maxDate, groupName } = req.body;
    const reports = await Report.aggregate([
        {
            $match: {
                groupName: groupName,
                date: {
                    $gte: new Date(new Date(minDate)),
                    $lte: new Date(new Date(maxDate))
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

    res.status(200).json({
      status: "success",
      message: "All groups fetched successfully",
      data: reports
    });
  } catch (error) {
    console.log(error);
  }
}

export {
    allGroups,
    byGroupName
}