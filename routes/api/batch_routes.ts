import express from 'express';
import { batch_controller } from '../../controllers';
// const batch_controller = require("../../controllers/batch_controller");

const router = express.Router();

// Matches with "/api/books"
router.route('/users').put(batch_controller.find_all_users);
router.route('/expenses').put(batch_controller.find_all_expenses);
router.route('/products').put(batch_controller.find_all_products);
router.route('/features').put(batch_controller.find_all_features);
router.route('/orders').put(batch_controller.find_all_orders);
router.route('/emails').put(batch_controller.find_all_emails);
router.route('/affiliates').put(batch_controller.find_all_affiliates);
router.route('/paychecks').put(batch_controller.find_all_paychecks);
router.route('/product_sale_price').put(batch_controller.update_product_sale_price);
router.route('/clear_sale').put(batch_controller.update_clear_sale);

export default router;
