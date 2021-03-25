import axios from 'axios';

export default {
	update_affiliate: (user: any, affiliate_id: string) => {
		return axios.put('/api/users/update_affiliate', { user, affiliate_id });
	},
	get_teams: (affiliate_id: string) => {
		return axios.get('/api/teams/affiliate/' + affiliate_id);
	}
};
