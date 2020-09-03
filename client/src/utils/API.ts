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
	get_diffuser_caps: function() {
		// console.log({ not_paid_email: array });
		return axios.get('/api/products/caps');
	}
};
