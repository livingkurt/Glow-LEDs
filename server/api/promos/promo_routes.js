import express from "express";
import promo_controller from "./promo_controller.js";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/code/:promo_code")
  .get(promo_controller.findByCode_promos_c)
  .put(promo_controller.update_code_used_promos_c);
router.route("/:affiliate_id/sponsor_codes").get(promo_controller.findByAffiliateId_promos_c);

router.route("/update_discount/:year?/:month?").put(promo_controller.update_affiliate_codes_promos_c);
router.route("/create_one_time_use_code").put(promo_controller.create_one_time_use_code_promos_c);
router.route("/refresh_sponsor_codes").post(promo_controller.refresh_sponsor_codes_promos_c);
router.route("/filters").get(promo_controller.create_filters_promos_c);

router.route("/delete_multiple").put(promo_controller.remove_multiple_promos_c);
router.route("/table").get(promo_controller.findAllTable_promos_c);
router.route("/:promo_code/validate").put(promo_controller.validate_promo_code_promos_c);
router.route("/").get(promo_controller.findAll_promos_c).post(isAuth, isAdmin, promo_controller.create_promos_c);

router
  .route("/:id")
  .get(promo_controller.findById_promos_c)
  .put(promo_controller.update_promos_c)
  .delete(isAuth, isAdmin, promo_controller.remove_promos_c);

export default router;
