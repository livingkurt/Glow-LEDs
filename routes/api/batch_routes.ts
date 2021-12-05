import express from 'express';
import { batch_controller } from '../../controllers';
// const batch_controller = require("../../controllers/batch_controller");
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

router.route('/users').put(isAuth, isAdmin, batch_controller.find_all_users);
router.route('/expenses').put(isAuth, isAdmin, batch_controller.find_all_expenses);
router.route('/products').put(isAuth, isAdmin, batch_controller.find_all_products);
router.route('/features').put(isAuth, isAdmin, batch_controller.find_all_features);
router.route('/orders').put(isAuth, isAdmin, batch_controller.find_all_orders);
router.route('/emails').put(isAuth, isAdmin, batch_controller.find_all_emails);
router.route('/affiliates').put(isAuth, isAdmin, batch_controller.find_all_affiliates);
router.route('/paychecks').put(isAuth, isAdmin, batch_controller.find_all_paychecks);
router.route('/product_sale_price').put(isAuth, isAdmin, batch_controller.update_product_sale_price);
router.route('/clear_sale').put(isAuth, isAdmin, batch_controller.update_clear_sale);
router.route('/update_order_items').put(batch_controller.update_order_items);
router.route('/find_duplicate_emails').put(isAuth, isAdmin, batch_controller.find_duplicate_emails);
router.route('/make_emails_lowercase').put(isAuth, isAdmin, batch_controller.make_emails_lowercase);
router.route('/update_diffuser_caps_product_name').put(batch_controller.update_diffuser_caps_product_name);
router.route('/convert_away_from_count_in_stock').put(batch_controller.convert_away_from_count_in_stock);
router.route('/remove_countInStock').put(batch_controller.remove_countInStock);
router.route('/remove_size').put(batch_controller.remove_size);
router.route('/change_size_to_string').put(batch_controller.change_size_to_string);
router.route('/remove_product_options').put(batch_controller.remove_product_options);
router.route('/rename_sizing_to_size').put(batch_controller.rename_sizing_to_size);

// router.route('/create_categories').post();

export default router;
