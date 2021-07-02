import express from 'express';
import { shipping_controller } from '../../controllers';
// const shipping_controller = require("../../controllers/shipping_controller");

const router = express.Router();

// Matches with "/api/books"
router.route('/all_shipping').get(shipping_controller.all_shipping);
router.route('/create_label').put(shipping_controller.create_label);
router.route('/create_return_label').put(shipping_controller.create_return_label);
router.route('/get_shipping_rates').put(shipping_controller.get_shipping_rates);
router.route('/buy_label').put(shipping_controller.buy_label);
router.route('/tracking_number').put(shipping_controller.tracking_number);
router.route('/return_tracking_number').put(shipping_controller.return_tracking_number);

export default router;
