import express from 'express';
import { promo_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

router.route('/code/:promo_code').get(promo_controller.find_by_code).put(promo_controller.mark_code_used);
router.route('/update_discount').put(isAuth, isAdmin, promo_controller.update_discount);

router.route('/').get(promo_controller.findAll).post(isAuth, isAdmin, promo_controller.create);

router
	.route('/:id')
	.get(promo_controller.findById)
	.put(isAuth, isAdmin, promo_controller.update)
	.delete(isAuth, isAdmin, promo_controller.remove);

export default router;
