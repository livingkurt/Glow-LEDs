import axios from 'axios';

const setAuthToken = (access_token) => {
	if (access_token) {
		// Apply authorization access_token to every request if logged in
		axios.defaults.headers.common['Authorization'] = access_token;
	} else {
		// Delete auth header
		delete axios.defaults.headers.common['Authorization'];
	}
};

export default setAuthToken;
