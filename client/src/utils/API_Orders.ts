import axios from 'axios';

const order_routes = {
	last_months_orders: () => {
		return axios.get('/api/orders/last_months_orders');
	},
	total_orders: () => {
		return axios.get('/api/orders/total_orders');
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
