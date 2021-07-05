import express from 'express';
import { promo_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

// Matches with "/api/books"
router.route('/').get(promo_controller.findAll).post(isAuth, isAdmin, promo_controller.create);

// Matches with "/api/books/:id"
router
	.route('/:id')
	.get(promo_controller.findById)
	.put(isAuth, isAdmin, promo_controller.update)
	.delete(isAuth, isAdmin, promo_controller.remove);

router.route('/code/:promo_code').get(promo_controller.find_by_code);
router.route('used').put(promo_controller.used);
router.route('update_discount').put(isAuth, isAdmin, promo_controller.update_discount);

export default router;
