import mongoose from "mongoose";
import fs from "fs";

async function restoreDatabase() {
  const snapshot = JSON.parse(fs.readFileSync("db-snapshot.json"));

  await mongoose.connect("mongodb://localhost/glow_leds_db", { useNewUrlParser: true, useUnifiedTopology: true });

  for (const [name, docs] of Object.entries(snapshot)) {
    const Model = mongoose.model(name, new mongoose.Schema({}, { strict: false }));
    await Model.deleteMany({});
    if (docs.length > 0) {
      await Model.insertMany(docs);
    }
  }

  await mongoose.disconnect();
}

restoreDatabase();
