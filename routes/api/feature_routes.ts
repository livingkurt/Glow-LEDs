import express from 'express';
import { feature_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

router.route('/').get(feature_controller.findAll).post(feature_controller.create);

router
	.route('/:id')
	.get(feature_controller.findById)
	.put(feature_controller.update)
	.delete(isAuth, isAdmin, feature_controller.remove);

export default router;
