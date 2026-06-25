const express = require("express");
const router = express.Router();

const {
  getSources
} = require("../controllers/metadataController");

/**
 * @openapi
 * /api/v1/metadata/sources:
 *   get:
 *     summary: Get integrated data sources
 *     responses:
 *       200:
 *         description: Source metadata
 */

router.get("/sources", getSources);

module.exports = router;