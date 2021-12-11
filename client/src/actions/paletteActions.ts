import {
	PALETTE_LIST_REQUEST,
	PALETTE_LIST_SUCCESS,
	PALETTE_LIST_FAIL,
	PALETTE_DETAILS_REQUEST,
	PALETTE_DETAILS_SUCCESS,
	PALETTE_DETAILS_FAIL,
	PALETTE_SAVE_REQUEST,
	PALETTE_SAVE_SUCCESS,
	PALETTE_SAVE_FAIL,
	PALETTE_DELETE_SUCCESS,
	PALETTE_DELETE_FAIL,
	PALETTE_DELETE_REQUEST,
	MY_PALETTE_LIST_REQUEST,
	MY_PALETTE_LIST_SUCCESS,
	MY_PALETTE_LIST_FAIL
} from '../constants/paletteConstants';
import axios from 'axios';
import { create_query } from '../utils/helper_functions';

export const listPalettes = (query: any) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
	try {
		dispatch({ type: PALETTE_LIST_REQUEST });
		const { data } = await axios.get('/api/palettes?' + create_query(query));
		dispatch({ type: PALETTE_LIST_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: PALETTE_LIST_FAIL, payload: error });
	}
};

export const listMyPalettes = () => async (
	dispatch: (arg0: { type: string; payload?: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: MY_PALETTE_LIST_REQUEST });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.get('/api/palettes/get_mine', {
			headers: { Authorization: 'Bearer ' + userInfo.access_token }
		});
		console.log({ listMyPalettes: data });
		dispatch({ type: MY_PALETTE_LIST_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: MY_PALETTE_LIST_FAIL, payload: error });
	}
};

export const savePalette = (palette: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ paletteActions: palette });
	try {
		dispatch({ type: PALETTE_SAVE_REQUEST, payload: palette });
		const { userLogin: { userInfo } } = getState();
		if (!palette._id) {
			const { data } = await axios.post('/api/palettes', palette, {
				headers: {
					Authorization: 'Bearer ' + userInfo.access_token
				}
			});
			dispatch({ type: PALETTE_SAVE_SUCCESS, payload: data });
		} else {
			const { data } = await axios.put('/api/palettes/' + palette._id, palette, {
				headers: {
					Authorization: 'Bearer ' + userInfo.access_token
				}
			});
			dispatch({ type: PALETTE_SAVE_SUCCESS, payload: data });
		}
	} catch (error) {
		console.log({ error });
		dispatch({ type: PALETTE_SAVE_FAIL, payload: error });
	}
};

export const detailsPalette = (pathname: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void
) => {
	try {
		dispatch({ type: PALETTE_DETAILS_REQUEST, payload: pathname });
		const { data } = await axios.get('/api/palettes/' + pathname);
		dispatch({ type: PALETTE_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: PALETTE_DETAILS_FAIL, payload: error });
	}
};

export const deletePalette = (paletteId: string) => async (
	dispatch: (arg0: { type: string; payload: any; success?: boolean }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		const { userLogin: { userInfo } } = getState();
		dispatch({ type: PALETTE_DELETE_REQUEST, payload: paletteId });
		const { data } = await axios.delete('/api/palettes/' + paletteId, {
			headers: {
				Authorization: 'Bearer ' + userInfo.access_token
			}
		});
		dispatch({ type: PALETTE_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		console.log({ error });
		dispatch({ type: PALETTE_DELETE_FAIL, payload: error });
	}
};
