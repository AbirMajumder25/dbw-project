const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/dbw");

const accidentSchema = new mongoose.Schema({}, {
  strict: false
});

const Accident = mongoose.model(
  "Accident",
  accidentSchema,
  "accidents"
);

async function importData() {

  try {

    console.log("Deleting old data...");
    await Accident.deleteMany({});

    const datasetsPath = path.join(__dirname, "../datasets");

    const files = fs.readdirSync(datasetsPath);

    const accidentFiles = files.filter(file =>
      file.startsWith("Unfallorte")
    );

    console.log(`Found ${accidentFiles.length} files`);

    for (const file of accidentFiles) {

      console.log(`Importing ${file}...`);

      const stream = fs
        .createReadStream(path.join(datasetsPath, file))
        .pipe(csv({ separator: ";" }));

      let count = 0;

      for await (const row of stream) {

        await Accident.create(row);
        count++;

      }

      console.log(`${count} records imported from ${file}`);
    }

    console.log("All datasets imported successfully");

    mongoose.connection.close();

  } catch (error) {

    console.log(error);

  }

}

importData();