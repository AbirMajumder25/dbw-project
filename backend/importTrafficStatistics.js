require("dotenv").config();

const fs = require("fs");
const mongoose = require("mongoose");
const csv = require("csv-parser");

const connectDB = require("./config/db");
const TrafficStatistics = require("./models/TrafficStatistics");

connectDB();

const results = [];

fs.createReadStream("./46241-0001_en_flat.csv")
  .pipe(csv({ separator: ";" }))
  .on("data", (row) => {

    const year = Number(row.time);

    // Only import 2016-2024
    if (year >= 2016 && year <= 2024) {

      results.push({
        year: year,
        accidentType: row["2_variable_attribute_label"],
        roadType: row["3_variable_attribute_label"],
        value: Number(row.value)
      });

    }

  })
  .on("end", async () => {

    try {

      await TrafficStatistics.deleteMany({});
      await TrafficStatistics.insertMany(results);

      console.log(`${results.length} records imported successfully.`);

      mongoose.connection.close();

    } catch (err) {

      console.error(err);
      mongoose.connection.close();

    }

  });