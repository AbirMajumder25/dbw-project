const Region = require("../models/Region");

/*
=====================================
GET ALL REGIONS
=====================================
*/

exports.getRegions = async (req, res) => {

  try {

    const search = req.query.search;

    let filter = {};

    if (search) {

      filter = {

        $or: [

          {
            municipality: {
              $regex: search,
              $options: "i"
            }
          },

          {
            district: {
              $regex: search,
              $options: "i"
            }
          },

          {
            state: {
              $regex: search,
              $options: "i"
            }
          },

          {
            ars: {
              $regex: search,
              $options: "i"
            }
          }

        ]

      };

    }

    const regions = await Region
      .find(filter)
      .limit(100);

    res.json(regions);

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


/*
=====================================
GET REGION BY ARS
=====================================
*/

exports.getRegionByARS = async (req, res) => {

  try {

    const region = await Region.findOne({

      ars: req.params.ars

    });

    if (!region) {

      return res.status(404).json({

        message: "Region not found"

      });

    }

    res.json(region);

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};