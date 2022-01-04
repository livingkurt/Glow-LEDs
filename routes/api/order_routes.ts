import express from 'express';
import { order_controller } from '../../controllers';
// import { isAuth } from '../../util';
const { isAuth, isAdmin } = require('../../util');
// const order_controller = require("../../controllers/order_controller");

const router = express.Router();

router.route('/').get(isAuth, isAdmin, order_controller.findAll_orders_c);
router.route('/occurrences').get(order_controller.occurrences_orders_c);

router.route('/top_customers').get(order_controller.top_customers_orders_c);
router.route('/category_occurrences').get(order_controller.category_occurrences_orders_c);
router.route('/code_usage').put(order_controller.code_usage_orders_c);
router.route('/tax_rates').get(order_controller.tax_rates_orders_c);
router.route('/affiliate_code_usage/:year?/:month?').get(order_controller.affiliate_code_usage_orders_c);
router.route('/promo_code_usage/:year?/:month?').get(order_controller.promo_code_usage_orders_c);
router.route('/income/:year/:month?').get(order_controller.income_orders_c);
router.route('/each_day_income/:date').get(order_controller.each_day_income_orders_c);
router.route('/each_month_income/:date').get(order_controller.each_month_income_orders_c);
router.route('/previous_income/:days').get(order_controller.previous_income_orders_c);
router.route('/mark_as_shipped').put(order_controller.mark_as_shipped_orders_c);

router.route('/user/:id').get(isAuth, order_controller.findMy_orders_c);
router.route('/guest').post(order_controller.create_orders_c);
router.route('/guest/:id').get(order_controller.findById_orders_c);
router.route('/secure').post(isAuth, order_controller.create_orders_c);
router.route('/secure/:id').get(isAuth, order_controller.findById_orders_c);

// router.route('/income/:year').get(order_controller.yearly_income_orders_c);

router
	.route('/glow/:id')
	.get(isAuth, isAdmin, order_controller.findMy_orders_c)
	.put(isAuth, isAdmin, order_controller.update_orders_c)
	.delete(isAuth, isAdmin, order_controller.remove_orders_c);

export default router;
