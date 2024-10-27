import express from "express";
import paycheck_controller from "./paycheck_controller.js";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/affiliate/:id").get(isAuth, paycheck_controller.findMy_paychecks);
router.route("/pay/:position/:year/:month").get(paycheck_controller.create_affiliate_paychecks_c);
router.route("/delete_multiple").put(isAuth, isAdmin, paycheck_controller.remove_multiple_paychecks_c);
router.route("/filters").get(paycheck_controller.create_filters_paychecks_c);
router.route("/get_range_payouts").get(paycheck_controller.get_range_payouts_paychecks_c);
router.route("/get_daily_paychecks_paychecks").get(paycheck_controller.get_daily_paychecks_paychecks_c);
router.route("/get_monthly_paychecks_paychecks").get(paycheck_controller.get_monthly_paychecks_paychecks_c);
router.route("/get_yearly_paychecks_paychecks").get(paycheck_controller.get_yearly_paychecks_paychecks_c);
router.route("/table").get(isAuth, isAdmin, paycheck_controller.get_table_paychecks_c);
router.route("/table/filter").get(paycheck_controller.get_affiliate_table_paychecks_c);
router.route("/table/:affiliate_id/affiliate").get(paycheck_controller.get_affiliate_table_paychecks_c);
router.route("/table/:team_id/team").get(paycheck_controller.get_team_table_paychecks_c);

router
  .route("/:id")
  .get(paycheck_controller.findById_paychecks_c)
  .put(isAuth, isAdmin, paycheck_controller.update_paychecks_c)
  .delete(isAuth, isAdmin, paycheck_controller.remove_paychecks_c);

router.route("/").get(isAuth, paycheck_controller.findAll_paychecks_c).post(paycheck_controller.create_paychecks_c);

export default router;
