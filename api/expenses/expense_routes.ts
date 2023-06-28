import express from "express";
import { expense_controller } from "../expenses";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware";

const router = express.Router();
router.route("/filters").get(expense_controller.create_filters_expenses_c);
router.route("/monthly_expenses").put(expense_controller.findAllByDate_expenses_c);
router.route("/yearly_expenses").put(expense_controller.findAllByDate_expenses_c);
router.route("/").get(isAuth, isAdmin, expense_controller.findAll_expenses_c).post(isAuth, isAdmin, expense_controller.create_expenses_c);
router.route("/airtable").post(expense_controller.get_airtable_expenses_c);
router.route("/get_range_expenses").get(expense_controller.get_range_expenses_expenses_c);
router.route("/get_daily_expenses_expenses").get(expense_controller.get_daily_expenses_expenses_c);
router.route("/get_monthly_expenses_expenses").get(expense_controller.get_monthly_expenses_expenses_c);
router.route("/get_yearly_expenses_expenses").get(expense_controller.get_yearly_expenses_expenses_c);

router.route("/create_all_expenses_s").post(expense_controller.create_all_expenses_c);
router.route("/total_expenses").get(expense_controller.findAllByDate_expenses_c);

router
  .route("/:id")
  .get(isAuth, isAdmin, expense_controller.findById_expenses_c)
  .put(isAuth, isAdmin, expense_controller.update_expenses_c)
  .delete(isAuth, isAdmin, expense_controller.remove_expenses_c);

export default router;
