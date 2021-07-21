import express from 'express';
import { category_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

router.route('/').get(category_controller.findAll).post(isAuth, isAdmin, category_controller.create);

router
	.route('/:id')
	.get(category_controller.findById)
	.put(isAuth, isAdmin, category_controller.update)
	.delete(isAuth, isAdmin, category_controller.remove);

export default router;
