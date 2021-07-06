import axios from 'axios';

export default {
	get_all_orders: () => {
		return axios.get('/api/orders/all_orders');
	},
	last_months_orders: () => {
		return axios.get('/api/orders/last_months_orders');
	}
};
