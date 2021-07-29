import express from 'express';
import { order_controller } from '../../controllers';
// import { isAuth } from '../../util';
const { isAuth, isAdmin } = require('../../util');
// const order_controller = require("../../controllers/order_controller");

const router = express.Router();

router.route('/').get(isAuth, isAdmin, order_controller.findAll);

router.route('/user').get(isAuth, order_controller.get_my_orders);

router.route('/guest').post(order_controller.create_guest_order);
router.route('/guest/:id').get(order_controller.get_guest_order);

router.route('/secure').post(isAuth, order_controller.create_user_order);
router.route('/secure/:id').get(isAuth, order_controller.get_one_order);

router.route('/glow').post(isAuth, isAdmin, order_controller.create_user_order);

router
	.route('/glow/:id')
	.get(isAuth, isAdmin, order_controller.get_user_orders)
	.put(isAuth, isAdmin, order_controller.update)
	.delete(isAuth, isAdmin, order_controller.remove);

router.route('/occurrences').get(order_controller.occurrences);
router.route('/code_usage').put(order_controller.code_usage);
// router.route('/all_orders').get(order_controller.all_orders);
router.route('/last_months_orders').get(order_controller.last_months_orders);
router.route('/total_orders').get(order_controller.total_orders);
router.route('/tax_rates').get(order_controller.tax_rates);
router.route('/promo_code_usage').get(order_controller.promo_code_usage);
router.route('/each_day_income/:date').get(order_controller.each_day_income);
router.route('/each_month_income/:date').get(order_controller.each_month_income);
router.route('/daily_income').get(order_controller.daily_income);
router.route('/weekly_income').get(order_controller.weekly_income);
router.route('/monthly_income').get(order_controller.monthly_income);
router.route('/mark_as_shipped').put(order_controller.mark_as_shipped);

export default router;
