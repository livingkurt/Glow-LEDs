import axios from 'axios';

const revenue_routes = {
	get_previous_income: (time: number) => {
		return axios.get('/api/orders/previous_income/' + time);
	},
	post_expense: (expense: any, user: any, card: string) => {
		return axios.post(
			'/api/expenses/post_expense',
			{ expense, card },
			{
				headers: {
					Authorization: 'Bearer ' + user.access_token
				}
			}
		);
	}
};

export default revenue_routes;
