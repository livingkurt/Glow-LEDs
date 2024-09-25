import config from "../../config";
import express from "express";
import Version from "./version";
import { Product } from "../products";
import Affiliate from "../affiliates/affiliate";
import Team from "../teams/team";
import Article from "../articles/article";
import Event from "../events/event";
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
    const [products, sponsors, teams, articles, events] = await Promise.all([
      Product.find(
        { deleted: false, isVariation: false, hidden: false },
        "pathname name category subcategory product_collection updatedAt"
      ).lean(),
      Affiliate.find({ deleted: false, active: true, sponsor: true }, "pathname updatedAt").lean(),
      Team.find({ deleted: false, active: true }, "pathname updatedAt").lean(),
      Article.find({ deleted: false, active: true }, "pathname updatedAt").lean(),
      Event.find({ deleted: false, active: true }, "pathname updatedAt").lean(),
    ]);

    console.log({ products, sponsors, teams, articles, events });

    const normalizeData = data =>
      data.map(item => ({
        pathname: item.pathname,
        lastmod: item.updatedAt.toISOString().split("T")[0],
      }));

    const normalizedProducts = products.map(product => ({
      pathname: product.pathname,
      lastmod: product.updatedAt.toISOString().split("T")[0],
      category: product.category?.toLowerCase().replace(/\s+/g, "-") || "",
      subcategory: product.subcategory?.toLowerCase().replace(/\s+/g, "-") || "",
      collection: product.product_collection?.toLowerCase().replace(/\s+/g, "-") || "",
    }));

    const categories = [...new Set(normalizedProducts.map(p => p.category))].filter(Boolean);
    const subcategories = [...new Set(normalizedProducts.map(p => p.subcategory))].filter(Boolean);
    const collections = [...new Set(normalizedProducts.map(p => p.collection))].filter(Boolean);

    res.json({
      products: normalizedProducts,
      sponsors: normalizeData(sponsors),
      teams: normalizeData(teams),
      articles: normalizeData(articles),
      events: normalizeData(events),
      categories: categories.map(c => ({ pathname: c })),
      subcategories: subcategories.map(s => ({ pathname: s })),
      collections: collections.map(c => ({ pathname: c })),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
