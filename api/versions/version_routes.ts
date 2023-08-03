import express from "express";
import Version from "./version";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log({ version: "version" });
    const versionDoc = await Version.findOne();
    console.log({ versionDoc });
    res.json({ version: versionDoc.version });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/", async (req, res) => {
  try {
    console.log({ version: "version" });
    const versionDoc: any = await Version.create({ version: 1 });
    console.log({ versionDoc });
    res.json({ version: versionDoc.version });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put("/", async (req, res) => {
  try {
    console.log({ version: "version" });
    const version = await Version.findOne();
    const versionDoc = await Version.updateOne({ _id: version._id }, { version: version.version + 1 });
    console.log({ versionDoc });
    res.json({ version: versionDoc.version });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
