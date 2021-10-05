import express from 'express';
import { expense_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();
router.route('/monthly_expenses').put(expense_controller.findAllByDate_expenses_c);
router.route('/yearly_expenses').put(expense_controller.findAllByDate_expenses_c);
router
	.route('/')
	.get(isAuth, isAdmin, expense_controller.findAll_expenses_c)
	.post(isAuth, isAdmin, expense_controller.create_expenses_c);

router.route('/post_expense').post(expense_controller.create_all_expenses_c);
router.route('/total_expenses').get(expense_controller.findAllByDate_expenses_c);

router
	.route('/:id')
	.get(isAuth, isAdmin, expense_controller.findById_expenses_c)
	.put(isAuth, isAdmin, expense_controller.update_expenses_c)
	.delete(isAuth, isAdmin, expense_controller.remove_expenses_c);

export default router;
