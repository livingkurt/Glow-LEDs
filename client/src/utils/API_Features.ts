import axios from 'axios';

const feature_routes = {
	get_features_by_category: (category: string) => {
		return axios.get('/api/features?category=' + category);
	}
};

export default feature_routes;
