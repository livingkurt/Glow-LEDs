import axios from 'axios';

const promo_routes = {
	update_discount: (year: any, month: any) => {
		return axios.put(`/api/promos/update_discount/${year}${month ? '/' + month : ''}`);
	},
	// update_promo_code: (private_code_id: any, percentage_off: number) => {
	// 	return axios.put('/api/promos/update_discount', { private_code_id, percentage_off });
	// },
	get_promo: (promo_code: any) => {
		console.log({ get_promo: promo_code });
		return axios.get('/api/promos/code/' + promo_code);
	},
	create_one_time_use_code: () => {
		return axios.put('/api/promos/create_one_time_use_code');
	},
	promo_code_used: (promo_code: any) => {
		console.log({ promo_code_used: promo_code });
		return axios.put('/api/promos/code/' + promo_code);
	},
	get_code_usage: (promo_code: string) => {
		console.log({ promo_code });
		return axios.put('/api/orders/code_usage', { promo_code });
	}
};

export default promo_routes;
