import express from 'express';
import { product_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

router.route('/reviews/:pathname').post(product_controller.reviews_products_c);

router.route('/best_sellers').post(product_controller.get_best_sellers_products_c);
router.route('/essentials').get(product_controller.get_essentials_products_c);

router.route('/update_stock').put(product_controller.update_stock_products_c);
router.route('/update_product_order').put(product_controller.update_product_order_products_c);
router.route('/save_item_group_id').put(product_controller.save_item_group_id_products_c);

// CRUD Actions

router
	.route('/:id')
	.get(product_controller.findById_products_c)
	.put(isAuth, isAdmin, product_controller.update_products_c)
	.delete(isAuth, isAdmin, product_controller.remove_products_c);

router.route('/').get(product_controller.findAll_products_c).post(product_controller.create_products_c);

export default router;
