import {
	CONTENT_LIST_REQUEST,
	CONTENT_LIST_SUCCESS,
	CONTENT_LIST_FAIL,
	CONTENT_DETAILS_REQUEST,
	CONTENT_DETAILS_SUCCESS,
	CONTENT_DETAILS_FAIL,
	CONTENT_SAVE_REQUEST,
	CONTENT_SAVE_SUCCESS,
	CONTENT_SAVE_FAIL,
	CONTENT_DELETE_SUCCESS,
	CONTENT_DELETE_FAIL,
	CONTENT_DELETE_REQUEST
} from '../constants/contentConstants';
import axios from 'axios';
import { create_query } from '../utils/helper_functions';

export const listContents = (query: any) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
	try {
		dispatch({ type: CONTENT_LIST_REQUEST });
		const { data } = await axios.get('/api/contents?' + create_query(query));
		dispatch({ type: CONTENT_LIST_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: CONTENT_LIST_FAIL, payload: error });
	}
};

export const saveContent = (content: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ contentActions: content });
	try {
		dispatch({ type: CONTENT_SAVE_REQUEST, payload: content });
		const { userLogin: { userInfo } } = getState();
		if (!content._id) {
			console.log({ contentActions: content });
			const { data } = await axios.post('/api/contents', content, {
				headers: {
					Authorization: 'Bearer ' + userInfo.access_token
				}
			});
			dispatch({ type: CONTENT_SAVE_SUCCESS, payload: data });
		} else {
			const { data } = await axios.put('/api/contents/' + content._id, content, {
				headers: {
					Authorization: 'Bearer ' + userInfo.access_token
				}
			});
			dispatch({ type: CONTENT_SAVE_SUCCESS, payload: data });
		}
	} catch (error) {
		console.log({ error });
		dispatch({ type: CONTENT_SAVE_FAIL, payload: error });
	}
};

export const detailsContent = (pathname: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void
) => {
	try {
		dispatch({ type: CONTENT_DETAILS_REQUEST, payload: pathname });
		const { data } = await axios.get('/api/contents/' + pathname);
		dispatch({ type: CONTENT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: CONTENT_DETAILS_FAIL, payload: error });
	}
};

export const deleteContent = (contentId: string) => async (
	dispatch: (arg0: { type: string; payload: any; success?: boolean }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		const { userLogin: { userInfo } } = getState();
		dispatch({ type: CONTENT_DELETE_REQUEST, payload: contentId });
		const { data } = await axios.delete('/api/contents/' + contentId, {
			headers: {
				Authorization: 'Bearer ' + userInfo.access_token
			}
		});
		dispatch({ type: CONTENT_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		console.log({ error });
		dispatch({ type: CONTENT_DELETE_FAIL, payload: error });
	}
};
