import express from "express";
import affiliate_controller from "./affiliate_controller.js";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(affiliate_controller.findAll_affiliates_c).post(isAuth, affiliate_controller.create_affiliates_c);

router.route("/table").get(affiliate_controller.table_affiliates_c);
// router.route("/reorder").put(affiliate_controller.reorder_affiliates_c);
router.route("/:id/generate_sponsor_codes").post(affiliate_controller.generate_sponsor_codes_affiliates_c);
router.route("/checkin_status").get(affiliate_controller.checkin_status_affiliates_c);
router.route("/question_concerns").get(affiliate_controller.question_concerns_affiliates_c);
router.route("/:id/monthly_checkin").put(affiliate_controller.sponsor_monthly_checkin_affiliates_c);
router.route("/:id/create_product_bundle/:cartId").put(affiliate_controller.create_product_bundle_affiliates_c);

router
  .route("/:id")
  .get(affiliate_controller.findById_affiliates_c)
  .put(isAuth, affiliate_controller.update_affiliates_c)
  .delete(isAuth, isAdmin, affiliate_controller.remove_affiliates_c);

export default router;
