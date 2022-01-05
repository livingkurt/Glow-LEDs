import express from 'express';
import { promo_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

router
	.route('/code/:promo_code')
	.get(promo_controller.findByCode_promos_c)
	.put(promo_controller.update_code_used_promos_c);

router.route('/update_discount/:year?/:month?').put(isAuth, isAdmin, promo_controller.update_affiliate_codes_promos_c);
router.route('/create_one_time_use_code').put(promo_controller.create_one_time_use_code_promos_c);

router.route('/').get(promo_controller.findAll_promos_c).post(isAuth, isAdmin, promo_controller.create_promos_c);

router
	.route('/:id')
	.get(promo_controller.findById_promos_c)
	.put(isAuth, isAdmin, promo_controller.update_promos_c)
	.delete(isAuth, isAdmin, promo_controller.remove_promos_c);

export default router;
