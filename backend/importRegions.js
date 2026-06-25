require("dotenv").config();

const mongoose = require("mongoose");
const XLSX = require("xlsx");

const connectDB = require("./config/db");
const Region = require("./models/Region");

connectDB();

async function importRegions() {

  try {

    const workbook = XLSX.readFile("./31122024_Auszug_GV.xlsx");

    const sheet =
      workbook.Sheets["Onlineprodukt_Gemeinden31122024"];

    const rows = XLSX.utils.sheet_to_json(sheet, {
      header: 1
    });

    const regions = [];

    // Municipality records start from row 10
    for (let i = 9; i < rows.length; i++) {

      const row = rows[i];

      // Ignore empty rows
      if (!row[7]) continue;

      // Only import municipality records
      if (row[0] !== "60") continue;

      regions.push({

        ars:
          `${row[2] || ""}${row[3] || ""}${row[4] || ""}${row[5] || ""}${row[6] || ""}`,

        stateCode: String(row[2] || ""),

        districtCode: String(row[4] || ""),

        municipalityCode: String(row[6] || ""),

        municipality: row[7],

        area: Number(row[8]) || 0,

        population: Number(row[9]) || 0,

        postalCode: String(row[13] || ""),

        longitude: parseFloat(
          String(row[14] || "0").replace(",", ".")
        ),

        latitude: parseFloat(
          String(row[15] || "0").replace(",", ".")
        )

      });

    }

    await Region.deleteMany({});

    await Region.insertMany(regions);

    console.log(`${regions.length} regions imported successfully.`);

    mongoose.connection.close();

  } catch (err) {

    console.error(err);

    mongoose.connection.close();

  }

}

importRegions();