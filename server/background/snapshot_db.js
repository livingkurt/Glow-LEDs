const mongoose = require("mongoose");
const fs = require("fs");

async function snapshotDatabase() {
  await mongoose.connect("mongodb://localhost/glow_leds_db", { useNewUrlParser: true, useUnifiedTopology: true });

  const collections = mongoose.connection.db.listCollections().toArray();
  const snapshot = {};

  for (const { name } of await collections) {
    const Model = mongoose.model(name, new mongoose.Schema({}, { strict: false }));
    snapshot[name] = await Model.find().lean();
  }

  fs.writeFileSync("db-snapshot.json", JSON.stringify(snapshot));

  await mongoose.disconnect();
}

snapshotDatabase();
