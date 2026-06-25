const express = require("express");
const router = express.Router();

const {
  getCount,
  getMonthly,
  getTopStates,
  getYearly,
  getDashboardSummary,
  getPersonalInjuryAccidents,
  getEarliestYear,
  getPedestrianAccidents,
  getAccidentPopulation,
  getAccidentTrafficSummary
} = require("../controllers/statsController");

/**
 * @openapi
 * /api/v1/stats/count:
 *   get:
 *     summary: Get total accident count
 *     responses:
 *       200:
 *         description: Total accident count
 */
router.get("/count", getCount);

/**
 * @openapi
 * /api/v1/stats/monthly:
 *   get:
 *     summary: Get monthly accident statistics
 *     responses:
 *       200:
 *         description: Monthly accident statistics
 */
router.get("/monthly", getMonthly);

/**
 * @openapi
 * /api/v1/stats/top-states:
 *   get:
 *     summary: Get top 5 federal states
 *     responses:
 *       200:
 *         description: Top states by accident count
 */
router.get("/top-states", getTopStates);

/**
 * @openapi
 * /api/v1/stats/yearly:
 *   get:
 *     summary: Get yearly accident statistics
 *     responses:
 *       200:
 *         description: Yearly accident statistics
 */
router.get("/yearly", getYearly);

/**
 * @openapi
 * /api/v1/stats/dashboard-summary:
 *   get:
 *     summary: Dashboard summary
 *     responses:
 *       200:
 *         description: Dashboard summary
 */
router.get("/dashboard-summary", getDashboardSummary);

/**
 * @openapi
 * /api/v1/stats/personal-injury:
 *   get:
 *     summary: Get personal injury accidents by state and year
 *     parameters:
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: State code (e.g. 14) or state name (e.g. Saxony)
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Accident year (default 2023)
 *     responses:
 *       200:
 *         description: Personal injury accident count
 */
router.get("/personal-injury", getPersonalInjuryAccidents);

/**
 * @openapi
 * /api/v1/stats/earliest-year:
 *   get:
 *     summary: Get the earliest available accident year
 *     parameters:
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: State code (e.g. 05) or state name (e.g. North Rhine-Westphalia)
 *     responses:
 *       200:
 *         description: Earliest available year
 */
router.get("/earliest-year", getEarliestYear);

/**
 * @openapi
 * /api/v1/stats/pedestrian-accidents:
 *   get:
 *     summary: Get pedestrian accidents by state and year
 *     parameters:
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: State code (e.g. 11) or state name (e.g. Berlin)
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Accident year (default 2023)
 *     responses:
 *       200:
 *         description: Pedestrian accident count
 */
router.get("/pedestrian-accidents", getPedestrianAccidents);

/**
 * @openapi
 * /api/v1/stats/accidents-per-population:
 *   get:
 *     summary: Calculate accidents per 100,000 inhabitants
 *     parameters:
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: State code (e.g. 14) or state name (e.g. Saxony)
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Accident year (default 2023)
 *     responses:
 *       200:
 *         description: Accident rate per 100,000 inhabitants
 */
router.get("/accidents-per-population", getAccidentPopulation);

/**
 * @openapi
 * /api/v1/stats/accident-traffic-summary:
 *   get:
 *     summary: Compare accident data with official traffic statistics
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Year to compare (default 2023)
 *     responses:
 *       200:
 *         description: Combined accident and traffic statistics
 */
router.get("/accident-traffic-summary", getAccidentTrafficSummary);

module.exports = router;