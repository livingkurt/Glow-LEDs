import express from "express";
import { affiliate_controller } from ".";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware";
const router = express.Router();

router
  .route("/:pathname/pathname")
  .get(affiliate_controller.findByPathname_affiliates_c)
  .put(isAuth, affiliate_controller.update_affiliates_c);

router.route("/").get(affiliate_controller.findAll_affiliates_c).post(isAuth, affiliate_controller.create_affiliates_c);
// router.route("/reorder").put(affiliate_controller.reorder_affiliates_c);
router.route("/checkin_status").get(affiliate_controller.checkin_status_affiliates_c);
router.route("/:id/monthly_checkin").put(affiliate_controller.monthly_checkin_affiliates_c);

router
  .route("/:id")
  .get(affiliate_controller.findById_affiliates_c)
  .put(isAuth, affiliate_controller.update_affiliates_c)
  .delete(isAuth, isAdmin, affiliate_controller.remove_affiliates_c);

export default router;
