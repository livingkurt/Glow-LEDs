import {
	PARCEL_LIST_REQUEST,
	PARCEL_LIST_SUCCESS,
	PARCEL_LIST_FAIL,
	PARCEL_DETAILS_REQUEST,
	PARCEL_DETAILS_SUCCESS,
	PARCEL_DETAILS_FAIL,
	PARCEL_SAVE_REQUEST,
	PARCEL_SAVE_SUCCESS,
	PARCEL_SAVE_FAIL,
	PARCEL_DELETE_SUCCESS,
	PARCEL_DELETE_FAIL,
	PARCEL_DELETE_REQUEST,
	MY_PARCEL_LIST_REQUEST,
	MY_PARCEL_LIST_SUCCESS,
	MY_PARCEL_LIST_FAIL
} from '../constants/parcelConstants';
import axios from 'axios';
import { create_query } from '../utils/helper_functions';

export const listParcels = (query: any) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
	try {
		dispatch({ type: PARCEL_LIST_REQUEST });
		const { data } = await axios.get('/api/parcels?' + create_query(query));
		dispatch({ type: PARCEL_LIST_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: PARCEL_LIST_FAIL, payload: error });
	}
};

export const listMyParcels = (affiliate_id: string) => async (
	dispatch: (arg0: { type: string; payload?: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: MY_PARCEL_LIST_REQUEST });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.get('/api/parcels/get_mine', {
			headers: { Authorization: 'Bearer ' + userInfo.access_token }
		});
		console.log({ listMyParcels: data });
		dispatch({ type: MY_PARCEL_LIST_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: MY_PARCEL_LIST_FAIL, payload: error });
	}
};

export const saveParcel = (parcel: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ parcelActions: parcel });
	try {
		dispatch({ type: PARCEL_SAVE_REQUEST, payload: parcel });
		const { userLogin: { userInfo } } = getState();
		if (!parcel._id) {
			const { data } = await axios.post('/api/parcels', parcel, {
				headers: {
					Authorization: 'Bearer ' + userInfo.access_token
				}
			});
			dispatch({ type: PARCEL_SAVE_SUCCESS, payload: data });
		} else {
			const { data } = await axios.put('/api/parcels/' + parcel._id, parcel, {
				headers: {
					Authorization: 'Bearer ' + userInfo.access_token
				}
			});
			dispatch({ type: PARCEL_SAVE_SUCCESS, payload: data });
		}
	} catch (error) {
		console.log({ error });
		dispatch({ type: PARCEL_SAVE_FAIL, payload: error });
	}
};

export const detailsParcel = (pathname: string) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
	try {
		dispatch({ type: PARCEL_DETAILS_REQUEST, payload: pathname });
		const { data } = await axios.get('/api/parcels/' + pathname);
		dispatch({ type: PARCEL_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: PARCEL_DETAILS_FAIL, payload: error });
	}
};

export const deleteParcel = (parcelId: string) => async (
	dispatch: (arg0: { type: string; payload: any; success?: boolean }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		const { userLogin: { userInfo } } = getState();
		dispatch({ type: PARCEL_DELETE_REQUEST, payload: parcelId });
		const { data } = await axios.delete('/api/parcels/' + parcelId, {
			headers: {
				Authorization: 'Bearer ' + userInfo.access_token
			}
		});
		dispatch({ type: PARCEL_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		console.log({ error });
		dispatch({ type: PARCEL_DELETE_FAIL, payload: error });
	}
};
