import axios from 'axios';

const external_routes = {
	get_tax_rates: () => {
		return axios.get('/api/orders/tax_rates');
	},
	get_events: () => {
		return axios.get('/api/contents/events');
	}
};

export default external_routes;
