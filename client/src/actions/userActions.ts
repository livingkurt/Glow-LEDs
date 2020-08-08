import axios from 'axios';
import Cookie from 'js-cookie';
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_LOGOUT,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_CONTACT_REQUEST,
	USER_CONTACT_SUCCESS,
	USER_CONTACT_FAIL,
	USER_PASSWORD_RESET_SUCCESS,
	USER_PASSWORD_RESET_FAIL,
	USER_PASSWORD_RESET_REQUEST,
	USER_RESET_PASSWORD_REQUEST,
	USER_RESET_PASSWORD_SUCCESS,
	USER_RESET_PASSWORD_FAIL,
	USER_VERIFY_REQUEST,
	USER_VERIFY_SUCCESS,
	USER_VERIFY_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_UPDATE_USER_REQUEST,
	USER_UPDATE_USER_SUCCESS,
	USER_UPDATE_USER_FAIL
} from '../constants/userConstants';

const update = (userdata: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log(userdata);
	const { userLogin: { userInfo } } = getState();
	dispatch({
		type: USER_UPDATE_REQUEST,
		payload: {
			userId: userdata.userId,
			first_name: userdata.first_name,
			last_name: userdata.last_name,
			email: userdata.email,
			password: userdata.password,
			verified: userdata.verified,
			admin: userdata.admin
		}
	});
	try {
		const { data } = await axios.put(
			'/api/users/update/' + userdata.userId,
			{
				first_name: userdata.first_name,
				last_name: userdata.last_name,
				email: userdata.email,
				password: userdata.password,
				verified: userdata.verified,
				admin: userdata.admin
			},
			{
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			}
		);
		dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
		Cookie.set('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
	}
};
const updateUser = (userdata: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log(userdata);
	const { userLogin: { userInfo } } = getState();
	dispatch({
		type: USER_UPDATE_USER_REQUEST,
		payload: {
			userId: userdata.userId,
			first_name: userdata.first_name,
			last_name: userdata.last_name,
			email: userdata.email,
			password: userdata.password,
			verified: userdata.verified,
			admin: userdata.admin
		}
	});
	try {
		const { data } = await axios.put(
			'/api/users/update/' + userdata.userId,
			{
				first_name: userdata.first_name,
				last_name: userdata.last_name,
				email: userdata.email,
				password: userdata.password,
				verified: userdata.verified,
				admin: userdata.admin
			},
			{
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			}
		);
		dispatch({ type: USER_UPDATE_USER_SUCCESS, payload: data });
		// Cookie.set('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({ type: USER_UPDATE_USER_FAIL, payload: error.message });
	}
};

const login = (email: string, password: string) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
	// console.log({ login: email });
	dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
	try {
		const { data } = await axios.post('/api/users/login', { email, password });
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
		Cookie.set('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
	}
};

const password_reset = (email: string) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
	console.log({ password_reset: email });
	dispatch({ type: USER_PASSWORD_RESET_REQUEST, payload: { email } });
	try {
		const { data } = await axios.post('/api/users/passwordreset', { email });
		dispatch({ type: USER_PASSWORD_RESET_SUCCESS, payload: data });
		axios.post('/api/emails/passwordreset', data);
	} catch (error) {
		dispatch({ type: USER_PASSWORD_RESET_FAIL, payload: error.message });
	}
};

const reset_password = (user_id: string, password: string, repassword: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void
) => {
	console.log({ user_id, password, repassword });
	dispatch({ type: USER_RESET_PASSWORD_REQUEST, payload: { user_id, password, repassword } });
	try {
		const { data } = await axios.put('/api/users/resetpassword', { user_id, password, repassword });
		dispatch({ type: USER_RESET_PASSWORD_SUCCESS, payload: data });
		// axios.post("/api/emails/passwordreset", { email });
	} catch (error) {
		dispatch({ type: USER_RESET_PASSWORD_FAIL, payload: error.message });
	}
};

const register = (first_name: string, last_name: string, email: string, password: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void
) => {
	dispatch({ type: USER_REGISTER_REQUEST, payload: { first_name, last_name, email, password } });
	try {
		const { data } = await axios.post('/api/users/register', { first_name, last_name, email, password });
		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
		axios.post('/api/emails/verify', data);
		// Cookie.set('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
	}
};

const verify = (user_id: string) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
	console.log({ user_id });
	dispatch({ type: USER_VERIFY_REQUEST, payload: { user_id } });
	try {
		const { data } = await axios.put('/api/users/verify/' + user_id);
		dispatch({ type: USER_VERIFY_SUCCESS, payload: data });
		console.log({ verify: data });
		axios.post('/api/emails/verified', data);
		Cookie.set('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({ type: USER_VERIFY_FAIL, payload: error.message });
	}
};

const contact = (
	first_name: string,
	last_name: string,
	email: string,
	order_number: string,
	reason_for_contact: string,
	message: string
) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
	dispatch({
		type: USER_CONTACT_REQUEST,
		payload: { first_name, last_name, email, order_number, reason_for_contact, message }
	});
	try {
		const { data } = await axios.post('/api/emails/contact', {
			first_name,
			last_name,
			email,
			order_number,
			reason_for_contact,
			message
		});
		dispatch({ type: USER_CONTACT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: USER_CONTACT_FAIL, payload: error.message });
	}
};

const listUsers = () => async (
	dispatch: (arg0: { type: string; payload?: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: USER_LIST_REQUEST });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.get('/api/users', {
			headers: { Authorization: 'Bearer ' + userInfo.token }
		});
		dispatch({ type: USER_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: USER_LIST_FAIL, payload: error.message });
	}
};

const deleteUser = (userId: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: USER_DELETE_REQUEST, payload: userId });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.delete('/api/users/' + userId, {
			headers: { Authorization: 'Bearer ' + userInfo.token }
		});
		dispatch({ type: USER_DELETE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: USER_DELETE_FAIL, payload: error.message });
	}
};

const detailsUser = (userId: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ userId });
	console.log('hello');
	try {
		dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.get('/api/users/' + userId, {
			headers: { Authorization: 'Bearer ' + userInfo.token }
		});
		dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: USER_DETAILS_FAIL, payload: error.message });
	}
};

const logout = () => (dispatch: (arg0: { type: string }) => void) => {
	Cookie.remove('userInfo');
	dispatch({ type: USER_LOGOUT });
};
export {
	login,
	register,
	logout,
	update,
	contact,
	password_reset,
	reset_password,
	verify,
	listUsers,
	deleteUser,
	detailsUser,
	updateUser
};
