import config from "../../config";
import express from "express";
import Version from "./version";
const router = express.Router();

router.get("/environment", async (req, res) => {
  try {
    res.status(201).send({ environment: config.ENVIRONMENT });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const versionDoc = await Version.findOne();
    res.json({ version: versionDoc?.version });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/create", async (req, res) => {
  try {
    const versionDoc = await Version.create({ version: 1 });
    res.json({ version: versionDoc.version });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put("/increment", async (req, res) => {
  try {
    let version = await Version.findOne();
    if (!version) {
      version = await Version.create({ version: 1 });
    }
    await Version.updateOne({ _id: version._id }, { version: version.version + 1 });
    res.json({ version: version.version + 1 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
