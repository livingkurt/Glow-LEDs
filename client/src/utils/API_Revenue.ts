import axios from 'axios';

const revenue_routes = {
	get_each_day_income: (date: any) => {
		return axios.get('/api/orders/each_day_income/' + date);
	},
	get_each_month_income: (date: any) => {
		return axios.get('/api/orders/each_month_income/' + date);
	},
	get_yesterday_income: () => {
		return axios.get('/api/orders/yesterday_income');
	},
	get_last_week_income: () => {
		return axios.get('/api/orders/last_week_income');
	},
	get_last_month_income: () => {
		return axios.get('/api/orders/last_month_income');
	},
	get_monthly_income: () => {
		return axios.get('/api/orders/monthly_income');
	},
	post_expense: (expense: any, user: any, card: string) => {
		return axios.post(
			'/api/expenses/post_expense',
			{ expense, card },
			{
				headers: {
					Authorization: 'Bearer ' + user.token
				}
			}
		);
	}
};

export default revenue_routes;
