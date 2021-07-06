import express from 'express';
import { expense_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

// Matches with "/api/books"
router.route('/').get(isAuth, isAdmin, expense_controller.findAll).post(isAuth, isAdmin, expense_controller.create);

router.route('/post_expense').post(expense_controller.create_all);

// Matches with "/api/books/:id"
router
	.route('/:id')
	.get(isAuth, isAdmin, expense_controller.findById)
	.put(isAuth, isAdmin, expense_controller.update)
	.delete(isAuth, isAdmin, expense_controller.remove);

export default router;
