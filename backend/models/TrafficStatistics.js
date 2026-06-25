const mongoose = require("mongoose");

const TrafficStatisticsSchema = new mongoose.Schema({
  year: Number,
  accidentType: String,
  roadType: String,
  value: Number
});

module.exports = mongoose.model(
  "TrafficStatistics",
  TrafficStatisticsSchema
);