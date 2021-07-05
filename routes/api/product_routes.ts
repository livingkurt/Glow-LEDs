import express from 'express';
import { product_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

router.route('/get_all/imperfect').get(product_controller.get_all_imperfect);
router.route('/get_all').get(product_controller.findAll);
router.route('/get_one/:pathname').get(product_controller.findById);
router.route('/update_one/:pathname').put(isAuth, isAdmin, product_controller.update);
router.route('/create_one').post(isAuth, isAdmin, product_controller.create);
router.route('/delete_one/:id').delete(isAuth, isAdmin, product_controller.remove);

router.route('/get_categories/:category/subcategory/:subcategory').get(product_controller.get_categories);
router.route('/get_all_products').get(product_controller.get_all_products);
router.route('/get_shown').get(product_controller.get_shown);
router.route('/get_caps').get(product_controller.get_caps);
router.route('/get_mega_caps').get(product_controller.get_mega_caps);
router.route('/get_essentials').get(product_controller.get_essentials);
router.route('/get_best_sellers').get(product_controller.get_best_sellers);
router.route('/get_options/:pathname').get(product_controller.get_options);
router.route('/categories').get(product_controller.categories);
router.route('/subcategories').get(product_controller.subcategories);
router.route('/get_images/:category').get(product_controller.get_images);
router.route('/update_stock').get(product_controller.update_stock);
router.route('/update_product_order').get(product_controller.update_product_order);
router.route('/update_product_option_stock').get(product_controller.update_product_option_stock);
router.route('/update_pathname').get(isAuth, isAdmin, product_controller.update_pathname);
router.route('/reviews/create_one/:pathname').get(product_controller.reviews);

export default router;
