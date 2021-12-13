import axios from 'axios';

const order_routes = {
	last_months_orders: () => {
		return axios.get('/api/orders/previous_income/30');
	},
	findAll_orders_a: () => {
		return axios.get('/api/orders/?limit=0&page=1');
	},
	top_customers: () => {
		return axios.get('/api/orders/top_customers');
	},
	// monthly_income: (dates: any) => {
	// 	console.log({ dates });
	// 	return axios.get('/api/orders/monthly_income', {dates});
	// },
	specific_time_income: (date_1: string, date_2: string) => {
		return axios.put('/api/orders/specific_time_income', { date_1, date_2 });
	},
	monthly_expenses: (date_1: string, date_2: string) => {
		return axios.put('/api/expenses/monthly_expenses', { date_1, date_2 });
	},
	yearly_expenses: (date_1: string, date_2: string) => {
		return axios.put('/api/expenses/yearly_expenses', { date_1, date_2 });
	},
	total_expenses: () => {
		return axios.get('/api/expenses/total_expenses');
	},
	mark_as_shipped: () => {
		// console.log({ get_email: email_id });
		return axios.put('/api/orders/mark_as_shipped');
	}
};

export default order_routes;
