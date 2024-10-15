import config from "../../config";
import express from "express";
import Version from "./version";
import { Product } from "../products";
import Affiliate from "../affiliates/affiliate";
import Team from "../teams/team";
import Article from "../articles/article";
import Event from "../events/event";
import Content from "../contents/content";
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
router.put("/sitemap", async (req, res) => {
  try {
    const [products, sponsors, teams, articles, events, contents] = await Promise.all([
      Product.find(
        { deleted: false, isVariation: false, hidden: false },
        "pathname name category subcategory product_collection updatedAt"
      ).lean(),
      Affiliate.find({ deleted: false, active: true, sponsor: true }, "artist_name pathname updatedAt").lean(),
      Team.find({ deleted: false, active: true }, "team_name pathname updatedAt").lean(),
      Article.find({ deleted: false, active: true }, "title pathname updatedAt").lean(),
      Event.find({ deleted: false, active: true }, "name pathname updatedAt").lean(),
      Content.findOne({ deleted: false, active: true }).sort({ updatedAt: -1 }).select("menus").lean(),
    ]);

    const normalizeData = data =>
      data.map(item => ({
        name: item.name || item.artist_name || item.title || item.team_name,
        pathname: item.pathname,
        lastmod: item?.updatedAt?.toISOString()?.split("T")[0],
      }));

    const normalizedProducts = products.map(product => ({
      name: product.name,
      pathname: product.pathname,
      lastmod: product?.updatedAt?.toISOString()?.split("T")[0],
    }));

    res.json({
      products: normalizedProducts,
      sponsors: normalizeData(sponsors),
      teams: normalizeData(teams),
      articles: normalizeData(articles),
      events: normalizeData(events),
      contents: normalizeData(contents.menus),
      articles: normalizeData(articles),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
