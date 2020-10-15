export {};
import express from 'express';
import { Log } from '../models';
import Expense from '../models/expense';
import { log_error, log_request } from '../util';
const { isAuth, isAdmin } = require('../util');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const category = req.query.category ? { category: req.query.category } : {};
		const searchKeyword = req.query.searchKeyword
			? {
					expense_name: {
						$regex: req.query.searchKeyword,
						$options: 'i'
					}
				}
			: {};

		let sortOrder = {};
		if (req.query.sortOrder === 'lowest') {
			sortOrder = { amount: 1 };
		} else if (req.query.sortOrder === 'highest') {
			sortOrder = { amount: -1 };
		} else if (req.query.sortOrder === 'newest') {
			sortOrder = { _id: -1 };
		} else if (req.query.sortOrder === 'date' || req.query.sortOrder === '') {
			sortOrder = { date_of_purchase: -1 };
		} else if (req.query.sortOrder === 'category') {
			sortOrder = { category: 1, createdAt: -1 };
		} else if (req.query.sortOrder === 'application') {
			sortOrder = { application: 1, createdAt: -1 };
		}

		const expenses = await Expense.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder);
		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Expense',
			data: expenses,
			error: {}
		});
		res.send(expenses);
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Expense',
			error
		});
	}
});

router.get('/:id', async (req, res) => {
	const expense = await Expense.findOne({ _id: req.params.id });
	console.log({ expense });
	console.log(req.params.id);
	if (expense) {
		res.send(expense);
	} else {
		res.status(404).send({ message: 'Expense Not Found.' });
	}
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
	console.log({ expense_routes_put: req.body });
	const expenseId = req.params.id;
	const expense: any = await Expense.findById(expenseId);
	if (expense) {
		const updatedExpense = await Expense.findById(expenseId);
		if (updatedExpense) {
			return res.status(200).send({ message: 'Expense Updated', data: updatedExpense });
		}
	}
	return res.status(500).send({ message: ' Error in Updating Expense.' });
});

router.delete('/:id', isAuth, isAdmin, async (req: { params: { id: any } }, res: { send: (arg0: string) => void }) => {
	const expense = await Expense.findById(req.params.id);
	const updated_expense = { ...expense, deleted: true };
	const message: any = { message: 'Expense Deleted' };
	// const deleted_expense = await updated_expense.save();
	const deleted_expense = await Expense.updateOne({ _id: req.params.id }, { deleted: true });
	if (deleted_expense) {
		// await deletedExpense.remove();
		res.send(message);
	} else {
		res.send('Error in Deletion.');
	}
});

router.post('/', async (req, res) => {
	const newExpense = await Expense.create(req.body);
	if (newExpense) {
		return res.status(201).send({ message: 'New Expense Created', data: newExpense });
	}
	return res.status(500).send({ message: ' Error in Creating Expense.' });
});

// module.exports = router;
export default router;
