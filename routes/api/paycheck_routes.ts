import express from 'express';
import { paycheck_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

// Matches with "/api/books"
router.route('/').get(isAuth, isAdmin, paycheck_controller.findAll).post(isAuth, isAdmin, paycheck_controller.create);
router.route('/get_mine').get(isAuth, paycheck_controller.get_mine);

// Matches with "/api/books/:id"
router
	.route('/:id')
	.get(paycheck_controller.findById)
	.put(isAuth, isAdmin, paycheck_controller.update)
	.delete(isAuth, isAdmin, paycheck_controller.remove);

export default router;
