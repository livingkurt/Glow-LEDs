import express from 'express';
import { feature_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

router.route('/').get(feature_controller.findAll_features_c).post(feature_controller.create_features_c);

router
	.route('/:id')
	.get(feature_controller.findByPathname_features_c)
	.put(feature_controller.update_features_c)
	.delete(isAuth, isAdmin, feature_controller.remove_features_c);

export default router;
