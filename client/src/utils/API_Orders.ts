import axios from 'axios';

export default {
	get_all_orders: () => {
		return axios.get('/api/orders/all_orders');
	},
	promo_code_used: (promo_code: any) => {
		console.log({ promo_code_used: promo_code });
		return axios.put('/api/promos/used', { promo_code });
	},
	get_promo: (promo_code: any) => {
		console.log({ get_promo: promo_code });
		return axios.get('/api/promos/code/' + promo_code);
	},
	get_code_usage: (promo_code: string) => {
		return axios.get('/api/orders/code_usage/' + promo_code);
	}
};
