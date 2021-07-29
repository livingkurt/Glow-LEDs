import axios from 'axios';

export default {
	last_months_orders: () => {
		return axios.get('/api/orders/last_months_orders');
	},
	total_orders: () => {
		return axios.get('/api/orders/total_orders');
	},
	mark_as_shipped: () => {
		// console.log({ get_email: email_id });
		return axios.put('/api/orders/mark_as_shipped');
	}
};
