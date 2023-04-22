import express from "express";
import { paycheck_controller } from "../paychecks";
const { isAuth, isAdmin } = require("../../util");

const router = express.Router();

router.route("/affiliate/:id").get(isAuth, paycheck_controller.findMy_paychecks);
router.route("/pay/:position/:year/:month").get(paycheck_controller.create_affiliate_paychecks_c);
router.route("/delete_multiple").put(paycheck_controller.remove_multiple_paychecks_c);
router.route("/filters").get(paycheck_controller.create_filters_paychecks_c);

router
  .route("/:id")
  .get(paycheck_controller.findById_paychecks_c)
  .put(isAuth, isAdmin, paycheck_controller.update_paychecks_c)
  .delete(isAuth, isAdmin, paycheck_controller.remove_paychecks_c);

router.route("/").get(isAuth, paycheck_controller.findAll_paychecks_c).post(paycheck_controller.create_paychecks_c);

export default router;
