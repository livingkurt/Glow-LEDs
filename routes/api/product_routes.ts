import express from 'express';
import { product_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

router.route('/update_pathname').get(product_controller.update_pathname);

router.route('/imperfect').get(product_controller.get_all_imperfect);

router.route('/best_sellers').post(product_controller.get_best_sellers);
router.route('/essentials').get(product_controller.get_essentials);

router.route('/get_all_options').get(product_controller.get_all_options);
router.route('/get_all_diffuser_caps').get(product_controller.get_all_diffuser_caps);
router.route('/get_all_products').get(product_controller.get_all_products);
router.route('/get_shown').get(product_controller.get_shown);
router.route('/get_caps').get(product_controller.get_caps);
router.route('/get_mega_caps').get(product_controller.get_mega_caps);

router.route('/get_options/:pathname').get(product_controller.get_options);
router.route('/get_all_categories').get(product_controller.get_all_categories);
router.route('/get_all_subcategories').get(product_controller.get_all_subcategories);
router.route('/get_images/:category').get(product_controller.get_images);
router.route('/update_stock').put(product_controller.update_stock);
router.route('/update_product_order').put(product_controller.update_product_order);
router.route('/update_product_option_stock').put(product_controller.update_product_option_stock);
router.route('/save_item_group_id').put(product_controller.save_item_group_id);
router.route('/create_product_option').post(product_controller.create_product_option);

router.route('/reviews/:pathname').post(product_controller.reviews);

router.route('/get_products_by_category').get(product_controller.get_products_by_category);

// CRUD Actions

router.route('/').get(product_controller.findAll).post(product_controller.create);

router
	.route('/:pathname')
	.get(product_controller.findById)
	.put(isAuth, isAdmin, product_controller.update)
	.delete(isAuth, isAdmin, product_controller.remove);

export default router;
