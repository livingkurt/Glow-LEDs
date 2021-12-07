import axios from 'axios';

const affiliate_routes = {
	upload_rave_mob_csv: (csv: any) => {
		console.log({ csv });
		return axios.put('/api/affiliates/upload_rave_mob_csv', { csv });
	}
};

export default affiliate_routes;
