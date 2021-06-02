import axios from 'axios';

export default {
	update_promo_code: (private_code_id: any, percentage_off: number) => {
		return axios.put('/api/promos/update_discount', { private_code_id, percentage_off });
	}
};
