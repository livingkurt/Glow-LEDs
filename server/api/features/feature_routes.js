import express from "express";
import feature_controller from "./feature_controller.js";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(feature_controller.findAll_features_c).post(feature_controller.create_features_c);

router.route("/table").get(feature_controller.get_table_features_c);

router
  .route("/:id")
  .get(feature_controller.findByPathname_features_c)
  .put(feature_controller.update_features_c)
  .delete(isAuth, isAdmin, feature_controller.remove_features_c);

export default router;
