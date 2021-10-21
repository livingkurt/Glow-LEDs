import axios from 'axios';

const shipping_routes = {
	get_all_shipping: () => {
		return axios.get('/api/shipping/all_shipping');
	},
	get_shipping_rates: (order: any) => {
		return axios.put('/api/shipping/get_shipping_rates', { order });
	},
	create_label: (order: any, shipping_rate: number) => {
		return axios.put('/api/shipping/create_label', { order, shipping_rate });
	},
	get_custom_shipping_rates: (data: any) => {
		return axios.put(
			'/api/shipping/get_custom_shipping_rates',
			{ data },
			{
				headers: {
					Authorization: 'Bearer ' + data.userInfo.access_token
				}
			}
		);
	},
	get_different_shipping_rates: (data: any) => {
		return axios.put(
			'/api/shipping/get_different_shipping_rates',
			{ data },
			{
				headers: {
					Authorization: 'Bearer ' + data.userInfo.access_token
				}
			}
		);
	},
	add_tracking_number: (order: any, tracking_number: any, label: any) => {
		return axios.put('/api/shipping/tracking_number', { order, tracking_number, label });
	},
	buy_label: (shipment_id: any, shipping_rate: any) => {
		console.log({ label: 'Buy Label', shipment_id, shipping_rate });
		return axios.put('/api/shipping/buy_label', { shipment_id, shipping_rate });
	},
	create_return_label: (order: any, shipping_rate: number) => {
		return axios.put('/api/shipping/create_return_label', { order, shipping_rate });
	},
	add_return_tracking_number: (order: any, tracking_number: any, label: any) => {
		return axios.put('/api/shipping/return_tracking_number', { order, tracking_number, label });
	}
};

export default shipping_routes;
