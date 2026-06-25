const mongoose = require("mongoose");

const accidentSchema = new mongoose.Schema({}, {
  strict: false
});

module.exports = mongoose.model(
  "Accident",
  accidentSchema,
  "accidents"
);