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
	}
};
