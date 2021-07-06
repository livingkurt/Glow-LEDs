import axios from 'axios';

const email_routes = {
	not_paid_email: (order: any, user_data: any) => {
		console.log({ not_paid_email: order });
		console.log({ not_paid_email: user_data });
		return axios.post('/api/emails/notpaid', order, user_data);
	},
	send_announcement_email: (template: string, subject: string, test: boolean) => {
		return axios.post('/api/emails/announcement', { template, subject, test });
	},
	send_user_email: (template: string, subject: string, email: string) => {
		return axios.post('/api/emails/send_user_email', { template, subject, email });
	},
	send_admin_email: (template: string, subject: string) => {
		return axios.post('/api/emails/send_admin_email', { template, subject });
	},

	save_html: (template: string, email: any, token: any) => {
		console.log({ template, email, token });
		email = { ...email, html: template };
		return axios.put('/api/emails/' + email._id, email, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
	},
	not_verified_email: (userInfo: any) => {
		console.log({ not_paid_email: userInfo });
		return axios.post('/api/emails/notverified', userInfo);
	},
	print_invoice: (order: any) => {
		// console.log({ not_paid_email: array });
		return axios.post('/api/emails/invoice', order);
	}
};

export default email_routes;
