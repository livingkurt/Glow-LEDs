import axios from 'axios';

export default {
	get_all_shipping: () => {
		return axios.get('/api/shipping/all_shipping');
	},
	get_shipping_rates: (order: any) => {
		return axios.put('/api/shipping/get_shipping_rates', { order });
	},
	create_label: (order: any, shipping_rate: number) => {
		return axios.put('/api/shipping/create_label', { order, shipping_rate });
	},
	add_tracking_number: (order: any, tracking_number: any, label: any) => {
		return axios.put('/api/shipping/tracking_number', { order, tracking_number, label });
	},
	buy_label: (order: any, shipping_rate: any) => {
		return axios.put('/api/shipping/buy_label', { order, shipping_rate });
	},
	create_return_label: (order: any, shipping_rate: number) => {
		return axios.put('/api/shipping/create_return_label', { order, shipping_rate });
	},
	add_return_tracking_number: (order: any, tracking_number: any, label: any) => {
		return axios.put('/api/shipping/return_tracking_number', { order, tracking_number, label });
	}
};
