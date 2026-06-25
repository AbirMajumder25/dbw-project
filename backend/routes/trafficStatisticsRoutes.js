const express = require("express");
const router = express.Router();

const {
  getTrafficStatistics,
  getTrafficStatisticsYearly
} = require("../controllers/trafficStatisticsController");

/*
=====================================
GET ALL TRAFFIC STATISTICS
=====================================
*/

router.get("/", getTrafficStatistics);

/*
=====================================
YEARLY TRAFFIC STATISTICS
=====================================
*/

router.get("/yearly", getTrafficStatisticsYearly);

module.exports = router;