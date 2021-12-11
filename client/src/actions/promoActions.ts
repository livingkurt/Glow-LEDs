import {
	PROMO_LIST_REQUEST,
	PROMO_LIST_SUCCESS,
	PROMO_LIST_FAIL,
	PROMO_DETAILS_REQUEST,
	PROMO_DETAILS_SUCCESS,
	PROMO_DETAILS_FAIL,
	PROMO_SAVE_REQUEST,
	PROMO_SAVE_SUCCESS,
	PROMO_SAVE_FAIL,
	PROMO_DELETE_SUCCESS,
	PROMO_DELETE_FAIL,
	PROMO_DELETE_REQUEST
} from '../constants/promoConstants';
import axios from 'axios';
import { create_query } from '../utils/helper_functions';

export const listPromos = (query: any) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
	try {
		dispatch({ type: PROMO_LIST_REQUEST });
		const { data } = await axios.get('/api/promos?' + create_query(query));
		dispatch({ type: PROMO_LIST_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: PROMO_LIST_FAIL, payload: error });
	}
};

export const savePromo = (promo: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ promoActions: promo });
	try {
		dispatch({ type: PROMO_SAVE_REQUEST, payload: promo });
		const { userLogin: { userInfo } } = getState();
		if (!promo._id) {
			const { data } = await axios.post('/api/promos', promo, {
				headers: {
					Authorization: 'Bearer ' + userInfo.access_token
				}
			});
			dispatch({ type: PROMO_SAVE_SUCCESS, payload: data });
		} else {
			const { data } = await axios.put('/api/promos/' + promo._id, promo, {
				headers: {
					Authorization: 'Bearer ' + userInfo.access_token
				}
			});
			dispatch({ type: PROMO_SAVE_SUCCESS, payload: data });
		}
	} catch (error) {
		console.log({ error });
		dispatch({ type: PROMO_SAVE_FAIL, payload: error });
	}
};

export const detailsPromo = (pathname: string) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
	try {
		dispatch({ type: PROMO_DETAILS_REQUEST, payload: pathname });
		const { data } = await axios.get('/api/promos/' + pathname);
		dispatch({ type: PROMO_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: PROMO_DETAILS_FAIL, payload: error });
	}
};

export const deletePromo = (promoId: string) => async (
	dispatch: (arg0: { type: string; payload: any; success?: boolean }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		const { userLogin: { userInfo } } = getState();
		dispatch({ type: PROMO_DELETE_REQUEST, payload: promoId });
		const { data } = await axios.delete('/api/promos/' + promoId, {
			headers: {
				Authorization: 'Bearer ' + userInfo.access_token
			}
		});
		dispatch({ type: PROMO_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		console.log({ error });
		dispatch({ type: PROMO_DELETE_FAIL, payload: error });
	}
};
