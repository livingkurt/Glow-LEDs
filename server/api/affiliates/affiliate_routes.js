import express from "express";
import affiliate_controller from "./affiliate_controller.js";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(affiliate_controller.findAll_affiliates_c).post(isAuth, affiliate_controller.create_affiliates_c);

router.route("/table").get(affiliate_controller.table_affiliates_c);
router.route("/:id/generate_sponsor_codes").post(affiliate_controller.generate_sponsor_codes_affiliates_c);
router.route("/:id/create_product_bundle/:cartId").put(affiliate_controller.create_product_bundle_affiliates_c);

router.route("/filters").get(affiliate_controller.create_filters_affiliates_c);
router
  .route("/:id")
  .get(affiliate_controller.findById_affiliates_c)
  .put(isAuth, affiliate_controller.update_affiliates_c)
  .delete(isAuth, isAdmin, affiliate_controller.remove_affiliates_c);

router.route("/payout").post(affiliate_controller.payout_affiliates_c);

router.post("/:id/tasks", isAuth, isAdmin, affiliate_controller.addSponsorTask);

export default router;
