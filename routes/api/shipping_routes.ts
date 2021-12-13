import express from 'express';
import { shipping_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

router.route('/all_shipping').get(shipping_controller.all_shipping_shipping_c);
router.route('/create_label').put(isAuth, isAdmin, shipping_controller.create_label_shipping_c);
router.route('/buy_label').put(isAuth, isAdmin, shipping_controller.buy_label_shipping_c);
router
	.route('/get_custom_shipping_rates')
	.put(isAuth, isAdmin, shipping_controller.get_custom_shipping_rates_shipping_c);
router
	.route('/get_different_shipping_rates')
	.put(isAuth, isAdmin, shipping_controller.different_shipping_rates_shipping_c);
router.route('/create_return_label').put(isAuth, isAdmin, shipping_controller.create_return_label_shipping_c);
router.route('/get_shipping_rates').put(shipping_controller.get_shipping_rates_shipping_c);
router.route('/tracking_number').put(isAuth, isAdmin, shipping_controller.tracking_number_shipping_c);
router.route('/return_tracking_number').put(isAuth, isAdmin, shipping_controller.return_tracking_number_shipping_c);

export default router;
