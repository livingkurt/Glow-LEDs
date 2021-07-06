import express from 'express';
import { shipping_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

router.route('/all_shipping').get(shipping_controller.all_shipping);
router.route('/create_label').put(isAuth, isAdmin, shipping_controller.create_label);
router.route('/create_return_label').put(isAuth, isAdmin, shipping_controller.create_return_label);
router.route('/get_shipping_rates').put(shipping_controller.get_shipping_rates);
router.route('/buy_label').put(isAuth, isAdmin, shipping_controller.buy_label);
router.route('/tracking_number').put(isAuth, isAdmin, shipping_controller.tracking_number);
router.route('/return_tracking_number').put(isAuth, isAdmin, shipping_controller.return_tracking_number);

export default router;
