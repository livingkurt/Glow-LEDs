import {
	EMAIL_LIST_REQUEST,
	EMAIL_LIST_SUCCESS,
	EMAIL_LIST_FAIL,
	EMAIL_DETAILS_REQUEST,
	EMAIL_DETAILS_SUCCESS,
	EMAIL_DETAILS_FAIL,
	EMAIL_SAVE_REQUEST,
	EMAIL_SAVE_SUCCESS,
	EMAIL_SAVE_FAIL,
	EMAIL_DELETE_SUCCESS,
	EMAIL_DELETE_FAIL,
	EMAIL_DELETE_REQUEST
} from '../constants/emailConstants';
import axios from 'axios';
import { create_query } from '../utils/helper_functions';

export const listEmails = (query: any) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
	try {
		dispatch({ type: EMAIL_LIST_REQUEST });
		const { data } = await axios.get('/api/emails?' + create_query(query));
		// console.log({ category });
		dispatch({ type: EMAIL_LIST_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: EMAIL_LIST_FAIL, payload: error });
	}
};

export const saveEmail = (email: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ emailActions: email });
	try {
		dispatch({ type: EMAIL_SAVE_REQUEST, payload: email });
		const { userLogin: { userInfo } } = getState();
		if (!email._id) {
			console.log({ emailActions: email });
			const { data } = await axios.post('/api/emails', email, {
				headers: {
					Authorization: 'Bearer ' + userInfo.access_token
				}
			});
			dispatch({ type: EMAIL_SAVE_SUCCESS, payload: data });
		} else {
			const { data } = await axios.put('/api/emails/' + email._id, email, {
				headers: {
					Authorization: 'Bearer ' + userInfo.access_token
				}
			});
			dispatch({ type: EMAIL_SAVE_SUCCESS, payload: data });
		}
	} catch (error) {
		console.log({ error });
		dispatch({ type: EMAIL_SAVE_FAIL, payload: error });
	}
};

export const detailsEmail = (id: string) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
	try {
		dispatch({ type: EMAIL_DETAILS_REQUEST, payload: id });
		const { data } = await axios.get('/api/emails/' + id);
		dispatch({ type: EMAIL_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: EMAIL_DETAILS_FAIL, payload: error });
	}
};

export const deleteEmail = (emailId: string) => async (
	dispatch: (arg0: { type: string; payload: any; success?: boolean }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		const { userLogin: { userInfo } } = getState();
		dispatch({ type: EMAIL_DELETE_REQUEST, payload: emailId });
		const { data } = await axios.delete('/api/emails/' + emailId, {
			headers: {
				Authorization: 'Bearer ' + userInfo.access_token
			}
		});
		dispatch({ type: EMAIL_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		console.log({ error });
		dispatch({ type: EMAIL_DELETE_FAIL, payload: error });
	}
};
