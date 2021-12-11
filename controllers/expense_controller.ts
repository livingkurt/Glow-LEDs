import { expense_services } from '../services';

export default {
	findAll_expenses_c: async (req: any, res: any) => {
		const { query } = req;
		try {
			const expenses = await expense_services.findAll_expenses_s(query);
			if (expenses) {
				return res.status(200).send(expenses);
			}
			return res.status(404).send({ message: 'Expenses Not Found' });
		} catch (error) {
			console.log({ findAll_expenses_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Expenses' });
		}
	},
	findAllByDate_expenses_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const expenses = await expense_services.findAllByDate_expenses_s(body);
			if (expenses) {
				return res.status(200).send(expenses);
			}
			return res.status(404).send({ message: 'Expenses Not Found' });
		} catch (error) {
			console.log({ findAll_expenses_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Expenses' });
		}
	},
	findById_expenses_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const expense = await expense_services.findById_expenses_s(params);
			console.log({ expense });
			if (expense) {
				return res.status(200).send(expense);
			}
			return res.status(404).send({ message: 'Expense Not Found' });
		} catch (error) {
			console.log({ findById_expenses_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Expense' });
		}
	},
	create_expenses_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const expense = await expense_services.create_expenses_s(body);
			if (expense) {
				return res.status(201).send(expense);
			}
			return res.status(500).send({ message: 'Error Creating Expense' });
		} catch (error) {
			console.log({ create_expenses_c_error: error });
			res.status(500).send({ error, message: 'Error Creating Expense' });
		}
	},
	create_all_expenses_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const expense = await expense_services.create_all_expenses_s(body);
			if (expense) {
				return res.status(201).send(expense);
			}
			return res.status(500).send({ message: 'Error Creating Expense' });
		} catch (error) {
			console.log({ create_expenses_c_error: error });
			res.status(500).send({ error, message: 'Error Creating Expense' });
		}
	},
	update_expenses_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const expense = await expense_services.update_expenses_s(params, body);
			if (expense) {
				return res.status(200).send(expense);
			}
			return res.status(500).send({ message: 'Error Updating Expense' });
		} catch (error) {
			console.log({ update_expenses_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Expense' });
		}
	},
	remove_expenses_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const expense = await expense_services.remove_expenses_s(params);
			if (expense) {
				return res.status(204).send({ message: 'Expense Deleted' });
			}
			return res.status(500).send({ message: 'Error Deleting Expense' });
		} catch (error) {
			console.log({ remove_expenses_c_error: error });
			res.status(500).send({ error, message: 'Error Deleting Expense' });
		}
	}
};
