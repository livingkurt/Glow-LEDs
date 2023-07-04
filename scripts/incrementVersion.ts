import mongoose from "mongoose";
import Version from "../api/versions/version";
import config from "../config";

mongoose
  .connect(config.MONGODB_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .catch(error => console.log(error));

const db = mongoose.connection;

db.on("error", error => console.error(error));
db.once("open", async () => {
  try {
    let versionDoc = await Version.findOne();

    if (!versionDoc) {
      // If no version document exists, create one with version 1
      versionDoc = new Version({ version: 1 });
    } else {
      // If a version document exists, increment the version
      versionDoc.version += 1;
    }

    await versionDoc.save();
    console.log(`Version incremented to ${versionDoc.version}`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
