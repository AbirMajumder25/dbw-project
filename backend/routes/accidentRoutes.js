const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("ACCIDENT ROUTE IS RUNNING");
    
    // TODO: Add your database query here to fetch accidents
    const accidents = [];
    
    return res.status(200).json({
      success: true,
      data: accidents,
      message: "Accidents retrieved successfully"
    });
  } catch (error) {
    console.error("Error fetching accidents:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching accidents"
    });
  }
});

module.exports = router;