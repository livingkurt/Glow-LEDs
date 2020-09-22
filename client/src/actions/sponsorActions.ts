import {
	SPONSOR_LIST_REQUEST,
	SPONSOR_LIST_SUCCESS,
	SPONSOR_LIST_FAIL,
	SPONSOR_DETAILS_REQUEST,
	SPONSOR_DETAILS_SUCCESS,
	SPONSOR_DETAILS_FAIL,
	SPONSOR_SAVE_REQUEST,
	SPONSOR_SAVE_SUCCESS,
	SPONSOR_SAVE_FAIL,
	SPONSOR_DELETE_SUCCESS,
	SPONSOR_DELETE_FAIL,
	SPONSOR_DELETE_REQUEST
} from '../constants/sponsorConstants';
import axios from 'axios';

const listSponsors = (category = '', searchKeyword = '', sortOrder = '') => async (
	dispatch: (arg0: { type: string; payload?: any }) => void
) => {
	try {
		dispatch({ type: SPONSOR_LIST_REQUEST });
		const { data } = await axios.get(
			'/api/sponsors?category=' +
				category +
				'&searchKeyword=' +
				searchKeyword +
				'&sortOrder=' +
				sortOrder.toLowerCase()
		);
		dispatch({ type: SPONSOR_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: SPONSOR_LIST_FAIL, payload: error.message });
	}
};

const saveSponsor = (sponsor: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ sponsorActions: sponsor });
	try {
		dispatch({ type: SPONSOR_SAVE_REQUEST, payload: sponsor });
		const { userLogin: { userInfo } } = getState();
		if (!sponsor._id) {
			const { data } = await axios.post('/api/sponsors', sponsor, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: SPONSOR_SAVE_SUCCESS, payload: data });
		} else {
			const { data } = await axios.put('/api/sponsors/' + sponsor._id, sponsor, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: SPONSOR_SAVE_SUCCESS, payload: data });
		}
	} catch (error) {
		dispatch({ type: SPONSOR_SAVE_FAIL, payload: error.message });
	}
};

const detailsSponsor = (pathname: string) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
	try {
		dispatch({ type: SPONSOR_DETAILS_REQUEST, payload: pathname });
		const { data } = await axios.get('/api/sponsors/' + pathname);
		dispatch({ type: SPONSOR_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: SPONSOR_DETAILS_FAIL, payload: error.message });
	}
};

const deleteSponsor = (sponsorId: string) => async (
	dispatch: (arg0: { type: string; payload: any; success?: boolean }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		const { userLogin: { userInfo } } = getState();
		dispatch({ type: SPONSOR_DELETE_REQUEST, payload: sponsorId });
		const { data } = await axios.delete('/api/sponsors/' + sponsorId, {
			headers: {
				Authorization: 'Bearer ' + userInfo.token
			}
		});
		dispatch({ type: SPONSOR_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		dispatch({ type: SPONSOR_DELETE_FAIL, payload: error.message });
	}
};

export { listSponsors, detailsSponsor, saveSponsor, deleteSponsor };
