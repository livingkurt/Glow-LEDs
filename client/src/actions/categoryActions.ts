import {
	CATEGORY_LIST_REQUEST,
	CATEGORY_LIST_SUCCESS,
	CATEGORY_LIST_FAIL,
	CATEGORY_DETAILS_REQUEST,
	CATEGORY_DETAILS_SUCCESS,
	CATEGORY_DETAILS_FAIL,
	CATEGORY_SAVE_REQUEST,
	CATEGORY_SAVE_SUCCESS,
	CATEGORY_SAVE_FAIL,
	CATEGORY_DELETE_SUCCESS,
	CATEGORY_DELETE_FAIL,
	CATEGORY_DELETE_REQUEST,
	MY_CATEGORY_LIST_REQUEST,
	MY_CATEGORY_LIST_SUCCESS,
	MY_CATEGORY_LIST_FAIL
} from '../constants/categoryConstants';
import axios from 'axios';

export const listCategorys = (category = '', searchKeyword = '', sortOrder = '') => async (
	dispatch: (arg0: { type: string; payload?: any }) => void
) => {
	try {
		dispatch({ type: CATEGORY_LIST_REQUEST });

		const { data } = await axios.get(
			'/api/categorys?category=' +
				category +
				'&searchKeyword=' +
				searchKeyword +
				'&sortOrder=' +
				sortOrder.toLowerCase()
		);
		console.log({ listCategorys: data });
		dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: CATEGORY_LIST_FAIL, payload: error.response.data.message });
	}
};

export const saveCategory = (category: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ categoryActions: category });
	try {
		dispatch({ type: CATEGORY_SAVE_REQUEST, payload: category });
		const { userLogin: { userInfo } } = getState();
		if (!category._id) {
			const { data } = await axios.post('/api/categorys', category, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
		} else {
			const { data } = await axios.put('/api/categorys/' + category._id, category, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
		}
	} catch (error) {
		dispatch({ type: CATEGORY_SAVE_FAIL, payload: error.response.data.message });
	}
};

export const detailsCategory = (pathname: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: CATEGORY_DETAILS_REQUEST, payload: pathname });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.get('/api/categorys/' + pathname, {
			headers: {
				Authorization: 'Bearer ' + userInfo.token
			}
		});
		dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: CATEGORY_DETAILS_FAIL, payload: error.response.data.message });
	}
};

export const deleteCategory = (categoryId: string) => async (
	dispatch: (arg0: { type: string; payload: any; success?: boolean }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		const { userLogin: { userInfo } } = getState();
		dispatch({ type: CATEGORY_DELETE_REQUEST, payload: categoryId });
		const { data } = await axios.delete('/api/categorys/' + categoryId, {
			headers: {
				Authorization: 'Bearer ' + userInfo.token
			}
		});
		dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		dispatch({ type: CATEGORY_DELETE_FAIL, payload: error.response.data.message });
	}
};
