import axios from 'axios';

export default {
	get_all_shipping: () => {
		return axios.get('/api/orders/all_shipping');
	},
	create_label: (order: any) => {
		return axios.put('/api/orders/create_label', { order });
	},
	get_shipping_rates: (order: any) => {
		return axios.put('/api/orders/get_shipping_rates', { order });
	},
	buy_label: (order: any) => {
		return axios.put('/api/orders/buy_label', { order });
	}
	// save_easy_post_id: (order: any, easy_post_id: string) => {
	// 	return axios.put('/api/orders/easy_post_id', { order, easy_post_id });
	// }
};
