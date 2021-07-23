import express from 'express';
import { setting_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

router
	.route('/:id')
	.get(setting_controller.findById)
	.put(isAuth, isAdmin, setting_controller.update)
	.delete(isAuth, isAdmin, setting_controller.remove);

router.route('/').get(isAuth, isAdmin, setting_controller.findAll).post(isAuth, isAdmin, setting_controller.create);

export default router;
