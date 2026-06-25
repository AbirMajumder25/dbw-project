const Accident = require("../models/Accident");

const Region = require("../models/Region");

const TrafficStatistics = require("../models/TrafficStatistics");

const stateCodes = {
  "01": "01",
  "02": "02",
  "03": "03",
  "04": "04",
  "05": "05",
  "06": "06",
  "07": "07",
  "08": "08",
  "09": "09",
  "10": "10",
  "11": "11",
  "12": "12",
  "13": "13",
  "14": "14",
  "15": "15",
  "16": "16",

  "baden-wurttemberg": "08",
  "baden württemberg": "08",

  "bavaria": "09",
  "bayern": "09",

  "berlin": "11",

  "brandenburg": "12",

  "bremen": "04",

  "hamburg": "02",

  "hesse": "06",
  "hessen": "06",

  "lower-saxony": "03",
  "lower saxony": "03",
  "niedersachsen": "03",

  "north-rhine-westphalia": "05",
  "north rhine westphalia": "05",
  "nrw": "05",

  "rhineland-palatinate": "07",
  "rhineland palatinate": "07",
  "rheinland-pfalz": "07",

  "saarland": "10",

  "saxony": "14",
  "sachsen": "14",

  "saxony-anhalt": "15",
  "saxony anhalt": "15",
  "sachsen-anhalt": "15",

  "schleswig-holstein": "01",
  "schleswig holstein": "01",

  "thuringia": "16",
  "thüringen": "16",

  "mecklenburg-western-pomerania": "13",
  "mecklenburg western pomerania": "13",
  "mecklenburg-vorpommern": "13",
  "mecklenburg vorpommern": "13"
};

function getStateCode(state) {

  if (!state) return null;

  // Already a numeric code
  if (/^\d+$/.test(state)) {
    return state;
  }

  return stateCodes[state.trim().toLowerCase()] || state;

}

/*
=====================================
GET TOTAL ACCIDENT COUNT
=====================================
*/

exports.getCount = async (req, res) => {
  try {

    const filter = {};

    if (req.query.year) {
      filter.UJAHR = req.query.year;
    }

    if (req.query.state) {
      filter.ULAND = req.query.state;
    }

    const count = await Accident.countDocuments(filter);

    res.json({
      totalAccidents: count
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


/*
=====================================
MONTHLY STATISTICS
=====================================
*/

exports.getMonthly = async (req, res) => {

  try {

    const filter = {};

    if (req.query.year) {
      filter.UJAHR = req.query.year;
    }

    const monthly = await Accident.aggregate([

      {
        $match: filter
      },

      {
        $group: {

          _id: {
            $toInt: "$UMONAT"
          },

          totalAccidents: {
            $sum: 1
          }

        }

      },

      {
        $sort: {
          _id: 1
        }
      }

    ]);

    res.json(monthly);

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


/*
=====================================
YEARLY STATISTICS
=====================================
*/

exports.getYearly = async (req, res) => {

  try {

    const yearly = await Accident.aggregate([

      {

        $group: {

          _id: "$UJAHR",

          totalAccidents: {
            $sum: 1
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


/*
=====================================
TOP STATES
=====================================
*/

exports.getTopStates = async (req, res) => {

  try {

    const filter = {};

    if (req.query.year) {
      filter.UJAHR = req.query.year;
    }

    const states = await Accident.aggregate([

      {
        $match: filter
      },

      {

        $group: {

          _id: "$ULAND",

          totalAccidents: {
            $sum: 1
          }

        }

      },

      {

        $sort: {
          totalAccidents: -1
        }

      },

      {
        $limit: 5
      }

    ]);

    res.json(states);

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

/*
=====================================
YEARLY STATISTICS
=====================================
*/

exports.getYearly = async (req, res) => {

  try {

    const yearly = await Accident.aggregate([

      {

        $group: {

          _id: "$UJAHR",

          totalAccidents: {
            $sum: 1
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


/*
=====================================
TOP STATES
=====================================
*/

exports.getTopStates = async (req, res) => {

  try {

    const filter = {};

    if (req.query.year) {
      filter.UJAHR = req.query.year;
    }

    const states = await Accident.aggregate([

      {
        $match: filter
      },

      {

        $group: {

          _id: "$ULAND",

          totalAccidents: {
            $sum: 1
          }

        }

      },

      {

        $sort: {
          totalAccidents: -1
        }

      },

      {
        $limit: 5
      }

    ]);

    res.json(states);

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

/*
=====================================
DASHBOARD SUMMARY
=====================================
*/

exports.getDashboardSummary = async (req, res) => {

  try {

    // Severity Distribution
    const severity = await Accident.aggregate([
      {
        $group: {
          _id: "$UKATEGORIE",
          value: { $sum: 1 }
        }
      }
    ]);

    const severityLabels = {
      "1": "Fatal",
      "2": "Serious Injury",
      "3": "Minor Injury"
    };

    const severityData = severity.map(item => ({
      label: severityLabels[item._id] || "Unknown",
      value: item.value
    }));


    // Lighting Distribution
    const lighting = await Accident.aggregate([
      {
        $group: {
          _id: "$LICHT",
          value: { $sum: 1 }
        }
      }
    ]);

    const lightingLabels = {
      "0": "Unknown",
      "1": "Daylight",
      "2": "Twilight",
      "3": "Darkness"
    };

    const lightingData = lighting.map(item => ({
      label: lightingLabels[item._id] || "Other",
      value: item.value
    }));


    // Road Surface Distribution
    const roadSurface = await Accident.aggregate([
      {
        $group: {
          _id: "$STRZUSTAND",
          value: { $sum: 1 }
        }
      }
    ]);

    const roadLabels = {
      "0": "Unknown",
      "1": "Dry",
      "2": "Wet",
      "3": "Snow / Ice"
    };

    const roadSurfaceData = roadSurface.map(item => ({
      label: roadLabels[item._id] || "Other",
      value: item.value
    }));

        // Vehicle Distribution
    const cars = await Accident.countDocuments({
      IstPKW: "1"
    });

    const bicycles = await Accident.countDocuments({
      IstRad: "1"
    });

    const motorcycles = await Accident.countDocuments({
      IstKrad: "1"
    });

    const pedestrians = await Accident.countDocuments({
      IstFuss: "1"
    });

    const vehicleData = [
      {
        label: "Cars",
        value: cars
      },
      {
        label: "Bicycles",
        value: bicycles
      },
      {
        label: "Motorcycles",
        value: motorcycles
      },
      {
        label: "Pedestrians",
        value: pedestrians
      }
    ];

    res.json({

      severity: severityData,

      lighting: lightingData,

      roadSurface: roadSurfaceData,

      vehicles: vehicleData

    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

/*
=====================================
EARLIEST ACCIDENT YEAR
=====================================
*/

exports.getEarliestYear = async (req, res) => {

  try {

    const earliest = await Accident
      .findOne({})
      .sort({ UJAHR: 1 })
      .select("UJAHR -_id");

    res.json({
      earliestYear: earliest?.UJAHR
    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

/*
=====================================
PERSONAL INJURY ACCIDENTS
=====================================
*/

exports.getPersonalInjuryAccidents = async (req, res) => {

  try {

    const year = req.query.year || "2023";
const state = getStateCode(req.query.state || "Saxony");

    const count = await Accident.countDocuments({

      UJAHR: year,

      ULAND: state,

      UKATEGORIE: {
        $in: ["2", "3"]
      }

    });

    res.json({

      state,

      year,

      personalInjuryAccidents: count

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

/*
=====================================
EARLIEST AVAILABLE YEAR
=====================================
*/

exports.getEarliestYear = async (req, res) => {

  try {

    const filter = {};

    if (req.query.state) {
      filter.ULAND = req.query.state;
    }

    const earliest = await Accident
      .findOne(filter)
      .sort({ UJAHR: 1 });

    if (!earliest) {

      return res.status(404).json({
        message: "No data found."
      });

    }

    res.json({

      state: req.query.state || "All",

      earliestYear: earliest.UJAHR

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

/*
=====================================
PEDESTRIAN ACCIDENTS
=====================================
*/

exports.getPedestrianAccidents = async (req, res) => {

  try {

    const year = req.query.year || "2023";
const state = getStateCode(req.query.state || "Berlin");

    const count = await Accident.countDocuments({

      UJAHR: year,

      ULAND: state,

      IstFuss: "1"

    });

    res.json({

      state,

      year,

      pedestrianAccidents: count

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

/*
=====================================
ACCIDENTS PER 100K POPULATION
=====================================
*/

exports.getAccidentPopulation = async (req, res) => {

  try {

    const stateCode = getStateCode(req.query.state || "Saxony");
    const year = req.query.year || "2023";

    const regions = await Region.find({
      stateCode
    });

    if (!regions.length) {

      return res.status(404).json({
        message: "Region not found"
      });

    }

    const population = regions.reduce(
      (sum, region) => sum + (region.population || 0),
      0
    );

    const stateName = regions[0].state;

    const accidents = await Accident.countDocuments({
      ULAND: stateCode,
      UJAHR: year
    });

    res.json({

      state: stateName,
      year,
      population,
      accidents,

      accidentsPer100000: Number(
        ((accidents / population) * 100000).toFixed(2)
      )

    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

/*
=====================================
ACCIDENTS + TRAFFIC STATISTICS
=====================================
*/

exports.getAccidentTrafficSummary = async (req, res) => {

  try {

    const year = Number(req.query.year || 2023);

    const accidents = await Accident.countDocuments({
      UJAHR: String(year)
    });

    const traffic = await TrafficStatistics.aggregate([

      {
        $match: {
          year: year
        }
      },

      {
        $group: {

          _id: "$year",

          totalTrafficValue: {
            $sum: "$value"
          }

        }

      }

    ]);

    res.json({

      year,

      accidentCount: accidents,

      trafficStatisticTotal:
        traffic.length ? traffic[0].totalTrafficValue : 0

    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};