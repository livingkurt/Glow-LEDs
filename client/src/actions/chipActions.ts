import {
	CHIP_LIST_REQUEST,
	CHIP_LIST_SUCCESS,
	CHIP_LIST_FAIL,
	CHIP_DETAILS_REQUEST,
	CHIP_DETAILS_SUCCESS,
	CHIP_DETAILS_FAIL,
	CHIP_SAVE_REQUEST,
	CHIP_SAVE_SUCCESS,
	CHIP_SAVE_FAIL,
	CHIP_DELETE_SUCCESS,
	CHIP_DELETE_FAIL,
	CHIP_DELETE_REQUEST
} from '../constants/chipConstants';
import axios from 'axios';
import { create_query } from '../utils/helper_functions';

export const listChips = (query: any) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
	try {
		dispatch({ type: CHIP_LIST_REQUEST });
		const { data } = await axios.get('/api/chips?' + create_query(query));
		dispatch({ type: CHIP_LIST_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: CHIP_LIST_FAIL, payload: error });
	}
};

export const saveChip = (chip: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	// console.log({ chipActions: chip });
	try {
		dispatch({ type: CHIP_SAVE_REQUEST, payload: chip });
		const { userLogin: { userInfo } } = getState();
		if (!chip._id) {
			const { data } = await axios.post('/api/chips', chip, {
				headers: {
					Authorization: 'Bearer ' + userInfo.access_token
				}
			});
			dispatch({ type: CHIP_SAVE_SUCCESS, payload: data });
		} else {
			const { data } = await axios.put('/api/chips/' + chip._id, chip, {
				headers: {
					Authorization: 'Bearer ' + userInfo.access_token
				}
			});
			dispatch({ type: CHIP_SAVE_SUCCESS, payload: data });
		}
	} catch (error) {
		console.log({ error });
		dispatch({ type: CHIP_SAVE_FAIL, payload: error });
	}
};

export const detailsChip = (pathname: string) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
	try {
		dispatch({ type: CHIP_DETAILS_REQUEST, payload: pathname });
		const { data } = await axios.get('/api/chips/' + pathname);
		dispatch({ type: CHIP_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: CHIP_DETAILS_FAIL, payload: error });
	}
};

export const deleteChip = (chipId: string) => async (
	dispatch: (arg0: { type: string; payload: any; success?: boolean }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		const { userLogin: { userInfo } } = getState();
		dispatch({ type: CHIP_DELETE_REQUEST, payload: chipId });
		const { data } = await axios.delete('/api/chips/' + chipId, {
			headers: {
				Authorization: 'Bearer ' + userInfo.access_token
			}
		});
		dispatch({ type: CHIP_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		console.log({ error });
		dispatch({ type: CHIP_DELETE_FAIL, payload: error });
	}
};
