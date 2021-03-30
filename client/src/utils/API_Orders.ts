import axios from 'axios';

export default {
	get_all_shipping: () => {
		return axios.get('/api/orders/all_shipping');
	},
	create_label: (order: any, shipping_rate: number) => {
		return axios.put('/api/orders/create_label', { order, shipping_rate });
	},
	create_return_label: (order: any, shipping_rate: number) => {
		return axios.put('/api/orders/create_return_label', { order, shipping_rate });
	},
	get_shipping_rates: (order: any) => {
		return axios.put('/api/orders/get_shipping_rates', { order });
	},
	buy_label: (order: any, shipping_rate: any) => {
		return axios.put('/api/orders/buy_label', { order, shipping_rate });
	},
	add_tracking_number: (order: any, tracking_number: any, label: any) => {
		return axios.put('/api/orders/tracking_number', { order, tracking_number, label });
	},
	add_return_tracking_number: (order: any, tracking_number: any, label: any) => {
		return axios.put('/api/orders/return_tracking_number', { order, tracking_number, label });
	},
	// add_shipment_tracking: (order: any, shipment_tracking: any, label: any) => {
	// 	return axios.put('/api/orders/shipment_tracking', { order, shipment_tracking, label });
	// },
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
