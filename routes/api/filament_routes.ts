import express from 'express';
import { palette_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

router.route('/').get(palette_controller.findAll_palettes_c).post(palette_controller.create_palettes_c);

router
	.route('/:id')
	.get(palette_controller.findById_palettes_c)
	.put(palette_controller.update_palettes_c)
	.delete(isAuth, isAdmin, palette_controller.remove_palettes_c);

export default router;
