export {};
import express from 'express';
import Expense from '../models/expense';
const { isAuth, isAdmin } = require('../util');

const router = express.Router();

router.get('/', async (req, res) => {
	const category = req.query.category ? { category: req.query.category } : {};
	const searchKeyword = req.query.searchKeyword
		? {
				name: {
					$regex: req.query.searchKeyword,
					$options: 'i'
				}
			}
		: {};

	let sortOrder = {};
	if (req.query.sortOrder === 'lowest') {
		sortOrder = { price: 1 };
	} else if (req.query.sortOrder === 'highest') {
		sortOrder = { price: -1 };
	} else if (req.query.sortOrder === 'newest') {
		sortOrder = { _id: -1 };
	} else if (req.query.sortOrder === 'category' || req.query.sortOrder === '') {
		sortOrder = { category: -1, createdAt: -1 };
	}

	// const expenses = await Expense.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder);
	const expenses = await Expense.find({});
	// console.log(expenses);
	res.send(expenses);
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
	const expense = await Expense.findById(expenseId);
	if (expense) {
		expense.expense_name = req.body.expense_name;
		expense.application = req.body.application;
		expense.url = req.body.url;
		expense.place_of_purchase = req.body.place_of_purchase;
		expense.date_of_purchase = new Date(req.body.date_of_purchase);
		expense.category = req.body.category;
		expense.card = req.body.card;
		expense.amount = req.body.amount;
		expense.deleted = req.body.deleted || false;
		const updatedExpense = await expense.save();
		console.log({ expense_routes_post: updatedExpense });
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
	// const converted_id = req.body.id.toLowerCase()
	console.log('Post');
	// ISODate('2020-08-21T00:13:08.879Z');
	// const converted_id = req.body.id.split(' ').join('_')
	// const expense = new Expense({
	// 	expense_name: req.body.expense_name,
	// 	application: req.body.application,
	// 	url: req.body.url,
	// 	place_of_purchase: req.body.place_of_purchase,
	// 	date_of_purchase: new Date(req.body.date_of_purchase),
	// 	category: req.body.category,
	// 	card: req.body.card,
	// 	amount: req.body.amount,
	// 	deleted: req.body.deleted || false
	// });
	// console.log({ expense_routes_post: expense });
	// const newExpense = await expense.save();
	const newExpense = await Expense.create({
		expense_name: req.body.expense_name,
		application: req.body.application,
		url: req.body.url,
		place_of_purchase: req.body.place_of_purchase,
		date_of_purchase: new Date(req.body.date_of_purchase),
		category: req.body.category,
		card: req.body.card,
		amount: req.body.amount,
		deleted: req.body.deleted || false
	});
	// console.log({ expense_routes_post: expense });
	if (newExpense) {
		return res.status(201).send({ message: 'New Expense Created', data: newExpense });
	}
	return res.status(500).send({ message: ' Error in Creating Expense.' });
});

// module.exports = router;
export default router;
