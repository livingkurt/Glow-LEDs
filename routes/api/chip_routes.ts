import express from 'express';
import { chip_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

router.route('/').get(chip_controller.findAll).post(isAuth, isAdmin, chip_controller.create);

router
	.route('/:id')
	.get(chip_controller.findById)
	.put(isAuth, isAdmin, chip_controller.update)
	.delete(isAuth, isAdmin, chip_controller.remove);

export default router;
