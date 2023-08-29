import express from "express";
import Version from "./version";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const versionDoc = await Version.findOne();
    res.json({ version: versionDoc?.version });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/create", async (req, res) => {
  try {
    const versionDoc: any = await Version.create({ version: 1 });
    res.json({ version: versionDoc.version });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});
router.put("/increment", async (req, res) => {
  try {
    const version: any = await Version.findOne();
    await Version.updateOne({ _id: version._id }, { version: version.version + 1 });
    res.json({ version: version.version + 1 });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
