const mongoose = require("mongoose");

const RegionSchema = new mongoose.Schema({

  ars: String,

  stateCode: String,

  state: String,

  districtCode: String,

  district: String,

  municipalityCode: String,

  municipality: String,

  postalCode: String,

  area: Number,

  population: Number,

  latitude: Number,

  longitude: Number

});

module.exports = mongoose.model("Region", RegionSchema);