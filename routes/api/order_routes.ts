import express from 'express';
import { order_controller } from '../../controllers';
// import { isAuth } from '../../util';
const { isAuth, isAdmin } = require('../../util');
// const order_controller = require("../../controllers/order_controller");

const router = express.Router();

// // Matches with "/api/books"
// router.route('/').get(order_controller.findAll).post(order_controller.create);

// // Matches with "/api/books/:id"
// router.route('/:id').get(order_controller.findById).put(order_controller.update).delete(order_controller.remove);

router.route('/get_one_guest/:id').get(order_controller.get_one_guest);
router.route('/get_all').get(order_controller.get_all);
router.route('/get_mine').get(isAuth, order_controller.get_mine);
router.route('/get_user/:id').get(order_controller.get_user);
router.route('/get_one/:id').get(isAuth, order_controller.get_one);
router.route('/user_create_one').post(order_controller.user_create_one);
router.route('/guest_create_one').post(isAuth, order_controller.guest_create_one);
router.route('/update_one/:id').put(isAuth, isAdmin, order_controller.update_one);
router.route('/delete_one/:id').get(isAuth, isAdmin, order_controller.delete_one);
router.route('/occurrences').get(order_controller.occurrences);
router.route('/code_usage/:promo_code').get(order_controller.code_usage);
router.route('/all_orders').get(order_controller.all_orders);
router.route('/last_months_orders').get(order_controller.last_months_orders);
router.route('/total_orders').get(order_controller.total_orders);
router.route('/tax_rates').get(order_controller.tax_rates);
router.route('/promo_code_usage').get(order_controller.promo_code_usage);
router.route('/each_day_income/:date').get(order_controller.each_day_income);
router.route('/each_month_income/:date').get(order_controller.each_month_income);
router.route('/daily_income').get(order_controller.daily_income);
router.route('/weekly_income').get(order_controller.weekly_income);
router.route('/monthly_income').get(order_controller.monthly_income);

export default router;
