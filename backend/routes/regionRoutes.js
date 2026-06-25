const express = require("express");
const router = express.Router();

const {
  getRegions,
  getRegionByARS
} = require("../controllers/regionController");

// GET all regions
router.get("/", getRegions);

// GET region by ARS
router.get("/:ars", getRegionByARS);

module.exports = router;