import express from "express";
import mongoose from "mongoose";
import { isAdmin, isAuth } from "../middlewares/authMiddleware";

const router = express.Router();

const collectionModelMap = {
  "affiliates": "Affiliate",
  "carts": "Cart",
  "categorys": "Category",
  "chips": "Chip",
  "contents": "Content",
  "emails": "Email",
  "expenses": "Expense",
  "features": "Feature",
  "filaments": "Filament",
  "images": "Image",
  "orders": "Order",
  "palettes": "Palette",
  "parcels": "Parcel",
  "paychecks": "Paycheck",
  "products": "Product",
  "promos": "Promo",
  "surveys": "Survey",
  "teams": "Team",
  "tutorials": "Tutorial",
  "users": "User",
  "versions": "Version",
  "wholesalers": "Wholesaler",
};

Object.entries(collectionModelMap).forEach(([collection, modelName]) => {
  router.route(`/${collection}`).put(isAuth, isAdmin, async (req, res) => {
    try {
      const { method, query, update } = req.body;
      console.log(`Received request for ${collection}:`, { method, query, update });

      const Model = mongoose.model(modelName);
      let result;

      switch (method) {
        case "updateMany":
          result = await Model.updateMany(query, update);
          break;
        case "updateOne":
          result = await Model.updateOne(query, update);
          break;
        case "find":
          result = await Model.find(query);
          break;
        default:
          throw new Error(`Invalid method: ${method}`);
      }

      console.log(`Operation result for ${collection}:`, result);
      res.json(result);
    } catch (error) {
      console.error(`Error in batch operation for ${collection}:`, error);
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  });
});

export default router;
