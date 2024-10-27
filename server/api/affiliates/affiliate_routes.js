import express from "express";
import affiliate_controller from "./affiliate_controller.js";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware.js";
const router = express.Router();

router
  .route("/:pathname/pathname")
  .get(affiliate_controller.findByPathname_affiliates_c)
  .put(isAuth, affiliate_controller.update_affiliates_c);

router.route("/").get(affiliate_controller.findAll_affiliates_c).post(isAuth, affiliate_controller.create_affiliates_c);

router.route("/table").get(isAuth, isAdmin, affiliate_controller.table_affiliates_c);
// router.route("/reorder").put(isAuth, isAdmin,affiliate_controller.reorder_affiliates_c);
router
  .route("/:id/generate_sponsor_codes")
  .post(isAuth, isAdmin, affiliate_controller.generate_sponsor_codes_affiliates_c);
router.route("/checkin_status").get(isAuth, isAdmin, affiliate_controller.checkin_status_affiliates_c);
router.route("/question_concerns").get(isAuth, isAdmin, affiliate_controller.question_concerns_affiliates_c);
router.route("/:id/monthly_checkin").put(isAuth, affiliate_controller.sponsor_monthly_checkin_affiliates_c);
router.route("/:id/create_product_bundle/:cartId").put(isAuth, affiliate_controller.create_product_bundle_affiliates_c);

router
  .route("/:id")
  .get(affiliate_controller.findById_affiliates_c)
  .put(isAuth, affiliate_controller.update_affiliates_c)
  .delete(isAuth, isAdmin, affiliate_controller.remove_affiliates_c);

export default router;
