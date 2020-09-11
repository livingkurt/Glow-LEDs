import axios from 'axios';

export default {
	not_paid_email: function(order: any, user_data: any) {
		console.log({ not_paid_email: order });
		console.log({ not_paid_email: user_data });
		return axios.post('/api/emails/notpaid', order, user_data);
	},
	not_verified_email: function(userInfo: any) {
		console.log({ not_paid_email: userInfo });
		return axios.post('/api/emails/notverified', userInfo);
	},
	get_product_names: function(array: any) {
		console.log({ not_paid_email: array });
		return axios.post('/api/products/array', array);
	},
	save_product: function(order: any, user_data: any, product: any) {
		console.log({ save_product: { order, user_data, product } });
		return axios.put('/api/orders/addproduct', { order, user_data, product });
	},
	save_secondary_product: function(order: any, user_data: any, secondary_product: any) {
		console.log({ save_secondary_product: { order, user_data, secondary_product } });
		return axios.put('/api/orders/addsecondaryproduct', { order, user_data, secondary_product });
	},
	get_original_diffuser_caps: function() {
		// console.log({ not_paid_email: array });
		return axios.get('/api/products/originalcaps');
	},
	get_mini_diffuser_caps: function() {
		// console.log({ not_paid_email: array });
		return axios.get('/api/products/minicaps');
	}
};
