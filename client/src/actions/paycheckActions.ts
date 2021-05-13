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
	PAYCHECK_DELETE_REQUEST
} from '../constants/paycheckConstants';
import axios from 'axios';

export const listPaychecks = (category = '', searchKeyword = '', sortOrder = '') => async (
	dispatch: (arg0: { type: string; payload?: any }) => void
) => {
	try {
		dispatch({ type: PAYCHECK_LIST_REQUEST });
		const { data } = await axios.get(
			'/api/paychecks?category=' +
				category +
				'&searchKeyword=' +
				searchKeyword +
				'&sortOrder=' +
				sortOrder.toLowerCase()
		);
		dispatch({ type: PAYCHECK_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PAYCHECK_LIST_FAIL, payload: error.response.data.message });
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
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: PAYCHECK_SAVE_SUCCESS, payload: data });
		} else {
			const { data } = await axios.put('/api/paychecks/' + paycheck._id, paycheck, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: PAYCHECK_SAVE_SUCCESS, payload: data });
		}
	} catch (error) {
		dispatch({ type: PAYCHECK_SAVE_FAIL, payload: error.response.data.message });
	}
};

export const detailsPaycheck = (pathname: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void
) => {
	try {
		dispatch({ type: PAYCHECK_DETAILS_REQUEST, payload: pathname });
		const { data } = await axios.get('/api/paychecks/' + pathname);
		dispatch({ type: PAYCHECK_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PAYCHECK_DETAILS_FAIL, payload: error.response.data.message });
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
				Authorization: 'Bearer ' + userInfo.token
			}
		});
		dispatch({ type: PAYCHECK_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		dispatch({ type: PAYCHECK_DELETE_FAIL, payload: error.response.data.message });
	}
};
