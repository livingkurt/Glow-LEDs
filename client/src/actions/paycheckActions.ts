import {
	PAYCHECK_LIST_REQUEST,
	PAYCHECK_LIST_SUCCESS,
	PAYCHECK_LIST_FAIL,
	PAYCHECK_DETAILS_REQUEST,
	PAYCHECK_DETAILS_SUCCESS,
	PAYCHECK_DETAILS_FAIL,
	PAYCHECK_SAVE_REQUEST,
	PAYCHECK_SAVE_SUCCESS,
	PAYCHECK_SAVE_FAIL,
	PAYCHECK_DELETE_SUCCESS,
	PAYCHECK_DELETE_FAIL,
	PAYCHECK_DELETE_REQUEST,
	MY_PAYCHECK_LIST_REQUEST,
	MY_PAYCHECK_LIST_SUCCESS,
	MY_PAYCHECK_LIST_FAIL
} from '../constants/paycheckConstants';
import axios from 'axios';
import { create_query } from '../utils/helper_functions';

export const listPaychecks = (query: any) => async (
	dispatch: (arg0: { type: string; payload?: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: PAYCHECK_LIST_REQUEST });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.get('/api/paychecks?' + create_query(query), {
			headers: {
				Authorization: 'Bearer ' + userInfo.access_token
			}
		});
		dispatch({ type: PAYCHECK_LIST_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: PAYCHECK_LIST_FAIL, payload: error });
	}
};

export const listMyPaychecks = (affiliate_id: string) => async (
	dispatch: (arg0: { type: string; payload?: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: MY_PAYCHECK_LIST_REQUEST });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.get('/api/paychecks/user', {
			headers: { Authorization: 'Bearer ' + userInfo.access_token }
		});
		console.log({ listMyPaychecks: data });
		dispatch({ type: MY_PAYCHECK_LIST_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: MY_PAYCHECK_LIST_FAIL, payload: error });
	}
};

export const savePaycheck = (paycheck: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ paycheckActions: paycheck });
	try {
		dispatch({ type: PAYCHECK_SAVE_REQUEST, payload: paycheck });
		const { userLogin: { userInfo } } = getState();
		if (!paycheck._id) {
			const { data } = await axios.post('/api/paychecks', paycheck, {
				headers: {
					Authorization: 'Bearer ' + userInfo.access_token
				}
			});
			dispatch({ type: PAYCHECK_SAVE_SUCCESS, payload: data });
		} else {
			const { data } = await axios.put('/api/paychecks/' + paycheck._id, paycheck, {
				headers: {
					Authorization: 'Bearer ' + userInfo.access_token
				}
			});
			dispatch({ type: PAYCHECK_SAVE_SUCCESS, payload: data });
		}
	} catch (error) {
		console.log({ error });
		dispatch({ type: PAYCHECK_SAVE_FAIL, payload: error });
	}
};

export const detailsPaycheck = (pathname: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: PAYCHECK_DETAILS_REQUEST, payload: pathname });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.get('/api/paychecks/' + pathname, {
			headers: {
				Authorization: 'Bearer ' + userInfo.access_token
			}
		});
		dispatch({ type: PAYCHECK_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: PAYCHECK_DETAILS_FAIL, payload: error });
	}
};

export const deletePaycheck = (paycheckId: string) => async (
	dispatch: (arg0: { type: string; payload: any; success?: boolean }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		const { userLogin: { userInfo } } = getState();
		dispatch({ type: PAYCHECK_DELETE_REQUEST, payload: paycheckId });
		const { data } = await axios.delete('/api/paychecks/' + paycheckId, {
			headers: {
				Authorization: 'Bearer ' + userInfo.access_token
			}
		});
		dispatch({ type: PAYCHECK_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		console.log({ error });
		dispatch({ type: PAYCHECK_DELETE_FAIL, payload: error });
	}
};
