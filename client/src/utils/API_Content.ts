import axios from 'axios';

const content_routes = {
	get_display_content: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/contents/display');
	}
};

export default content_routes;
