const TrafficStatistics = require("../models/TrafficStatistics");

/*
=====================================
GET ALL TRAFFIC STATISTICS
=====================================
*/

exports.getTrafficStatistics = async (req, res) => {

  try {

    let data = await TrafficStatistics.find();

    data = data.filter(item => {

      const year = Number(item.year);

      return year >= 2016 && year <= 2024;

    });

    if (req.query.year) {

      data = data.filter(
        item => Number(item.year) === Number(req.query.year)
      );

    }

    res.json(data);

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


/*
=====================================
YEARLY TRAFFIC STATISTICS
=====================================
*/

exports.getTrafficStatisticsYearly = async (req, res) => {

  try {

    const yearly = await TrafficStatistics.aggregate([

      {

        $project: {

          year: {
            $toInt: "$year"
          },

          value: {
            $toInt: "$value"
          }

        }

      },

      {

        $match: {

          year: {
            $gte: 2016,
            $lte: 2024
          }

        }

      },

      {

        $group: {

          _id: "$year",

          total: {
            $sum: "$value"
          }

        }

      },

      {

        $sort: {
          _id: 1
        }

      }

    ]);

    res.json(yearly);

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};