import express from 'express';
import { affiliate_controller } from '../../controllers';
// const affiliate_controller = require("../../controllers/affiliate_controller");
const { isAuth, isAdmin } = require('../../util');
const router = express.Router();

router.route('/upload_rave_mob_csv').put(affiliate_controller.upload_rave_mob_csv_affiliates_c);
// router.route('/code_usage').get(affiliate_controller.upload_rave_mob_csv_affiliates_c);
router.route('/').get(affiliate_controller.findAll_affiliates_c).post(isAuth, affiliate_controller.create_affiliates_c);

router
	.route('/:pathname')
	.get(affiliate_controller.findById_affiliates_c)
	.put(isAuth, affiliate_controller.update_affiliates_c)
	.delete(isAuth, isAdmin, affiliate_controller.remove_affiliates_c);

export default router;
