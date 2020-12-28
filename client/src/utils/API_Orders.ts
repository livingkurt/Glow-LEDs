import axios from 'axios';

export default {
	get_all_shipping: () => {
		return axios.get('/api/orders/all_shipping');
	},
	create_label: (order: any) => {
		return axios.put('/api/orders/create_label', { order });
	}
};
