const express = require("express");
const router = express.Router();

const Accident = require("../models/Accident");

/**
 * @swagger
 * /api/v1/accidents:
 *   get:
 *     summary: Get accident records
 *     description: Returns up to 50 accident records with optional filtering by year, state, and month.
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Accident year (2016-2024)
 *       - in: query
 *         name: state
 *         schema:
 *           type: integer
 *         description: German state code
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *         description: Month (1-12)
 *     responses:
 *       200:
 *         description: List of accident records
 *       500:
 *         description: Server error
 */
router.get("/", async (req, res) => {
  try {

    const filter = {};

    if (req.query.year) {
      filter.UJAHR = Number(req.query.year);
    }

    if (req.query.state) {
      filter.ULAND = Number(req.query.state);
    }

    if (req.query.month) {
      filter.UMONAT = Number(req.query.month);
    }

    const accidents = await Accident.find(filter).limit(50);

    res.json(accidents);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});

module.exports = router;