import express from "express";
import Version from "./version";
const router = express.Router();

router.get("/version", async (req, res) => {
  try {
    const versionDoc = await Version.findOne();
    res.json({ version: versionDoc.version });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
