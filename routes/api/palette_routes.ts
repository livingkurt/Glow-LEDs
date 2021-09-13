import express from 'express';
import { palette_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

router.route('/').get(palette_controller.findAll).post(palette_controller.create);

router
	.route('/:id')
	.get(palette_controller.findById)
	.put(palette_controller.update)
	.delete(isAuth, isAdmin, palette_controller.remove);

export default router;
