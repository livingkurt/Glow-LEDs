import express from "express";
import order_controller from "./order_controller.js";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/table/:user_id/user").get(order_controller.get_user_table_orders_c);
router.route("/filters").get(order_controller.create_filters_orders_c);
router.route("/").get(isAuth, order_controller.findAll_orders_c).post(order_controller.create_orders_c);
router.route("/old").get(order_controller.findAllOld_orders_c);
router.route("/occurrences").get(order_controller.occurrences_orders_c);

router.route("/top_customers").get(order_controller.top_customers_orders_c);
router.route("/category_occurrences").get(order_controller.category_occurrences_orders_c);
router.route("/affiliate_code_usage/:promo_code").get(order_controller.affiliate_code_usage_orders_c);
router.route("/tax_rates").get(order_controller.tax_rates_orders_c);
router.route("/all_affiliate_code_usage/:year?/:month?").get(order_controller.all_affiliate_code_usage_orders_c);
router.route("/promo_code_usage/:year?/:month?").get(order_controller.promo_code_usage_orders_c);
router.route("/code_usage/:promo_code").get(order_controller.code_usage_orders_c);
router.route("/monthly_code_usage/:promo_code").get(order_controller.monthly_code_usage_orders_c);
router.route("/:id/invoice").get(order_controller.invoice_orders_c);
router.route("/eligible_for_review").post(order_controller.eligible_for_review_orders_c);

router.route("/:id/user").get(isAuth, order_controller.findMy_orders_c);
router.route("/guest").post(order_controller.create_orders_c);
router.route("/guest/:id").get(order_controller.findById_orders_c);
router.route("/secure").post(isAuth, order_controller.create_orders_c);
router.route("/secure/:id").get(isAuth, order_controller.findById_orders_c);
// router.route("/get_product_quantities").put(order_controller.get_product_quantities);
// router.route("/get_category_quantities").put(order_controller.get_category_quantities);

router.route("/affiliate_earnings").get(order_controller.affiliate_earnings_c);
router.route("/get_product_quantities_orders").get(order_controller.get_product_quantities_orders_c);
router.route("/get_all_shipping_orders").get(order_controller.get_all_shipping_orders_c);
router.route("/get_all_time_revenue_orders").get(order_controller.get_all_time_revenue_orders_c);
router.route("/:product_id/product_range_revenue_orders").get(order_controller.get_product_range_revenue_orders_c);
router.route("/get_all_product_range_revenue_orders").get(order_controller.get_all_product_range_revenue_orders_c);
router.route("/get_range_revenue_orders").get(order_controller.get_range_revenue_orders_c);
router.route("/get_daily_revenue_orders").get(order_controller.get_daily_revenue_orders_c);
router.route("/get_monthly_revenue_orders").get(order_controller.get_monthly_revenue_orders_c);
router.route("/get_yearly_revenue_orders").get(order_controller.get_yearly_revenue_orders_c);
router
  .route("/get_monthly_revenue_product_orders/:product_id/product")
  .get(order_controller.get_monthly_revenue_product_orders_c);
router
  .route("/get_yearly_revenue_product_orders/:product_id/product")
  .get(order_controller.get_yearly_revenue_product_orders_c);
router.route("/get_range_category_revenue_orders").get(order_controller.get_range_category_revenue_orders_c);
router.route("/get_all_time_category_revenue_orders").get(order_controller.get_all_time_category_revenue_orders_c);
router.route("/get_range_tips_revenue_orders").get(order_controller.get_range_tips_revenue_orders_c);
router.route("/get_all_time_tips_revenue_orders").get(order_controller.get_all_time_tips_revenue_orders_c);
router.route("/get_range_gloves_data_orders").get(order_controller.get_range_gloves_data_orders_c);

router.route("/glow/sample_testing").post(order_controller.sample_testing_orders_c);
router.route("/glow/delete_multiple").put(order_controller.remove_multiple_orders_c);
router.route("/glow/update_multiple_status").put(order_controller.update_multiple_status_orders_c);

router.route("/glow/:old_user_id/transfer/:new_user_id").put(order_controller.transfer_orders_c);
router.route("/test_delete/:id").delete(order_controller.test_delete_orders_c);

router.route("/table").get(order_controller.get_table_orders_c);

router.route("/place_order").post(order_controller.place_order_orders_c);

router
  .route("/glow/:id")
  .get(isAuth, isAdmin, order_controller.findMy_orders_c)
  .put(isAuth, isAdmin, order_controller.update_orders_c)
  .delete(isAuth, isAdmin, order_controller.remove_orders_c);

export default router;
