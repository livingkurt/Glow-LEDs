import express from 'express';
import { paycheck_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

router.route('/user').get(isAuth, paycheck_controller.get_my_paychecks);

router
	.route('/:id')
	.get(paycheck_controller.findById)
	.put(isAuth, isAdmin, paycheck_controller.update)
	.delete(isAuth, isAdmin, paycheck_controller.remove);

router.route('/').get(isAuth, isAdmin, paycheck_controller.findAll).post(isAuth, isAdmin, paycheck_controller.create);

export default router;
