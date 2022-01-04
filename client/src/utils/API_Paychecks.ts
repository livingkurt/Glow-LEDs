import axios from 'axios';

const paycheck_routes = {
	create_affiliate_paychecks_a: (type: string, year: number, month: string) => {
		return axios.get(`/api/paychecks/pay/${type}/${year}/${month}`);
	}
};

export default paycheck_routes;
