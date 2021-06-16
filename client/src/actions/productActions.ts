import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_SAVE_REQUEST,
	PRODUCT_SAVE_SUCCESS,
	PRODUCT_SAVE_FAIL,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_IMAGES_REQUEST,
	PRODUCT_IMAGES_SUCCESS,
	PRODUCT_IMAGES_FAIL,
	PRODUCT_REVIEW_SAVE_REQUEST,
	PRODUCT_REVIEW_SAVE_SUCCESS,
	PRODUCT_REVIEW_SAVE_FAIL,
	PRODUCT_REVIEW_DELETE_REQUEST,
	PRODUCT_REVIEW_DELETE_SUCCESS,
	PRODUCT_REVIEW_DELETE_FAIL
} from '../constants/productConstants';
import axios from 'axios';

export const listProducts = (
	category = '',
	subcategory = '',
	searchKeyword = '',
	sortOrder = '',
	chip = '',
	show_hidden = '',
	collection = ''
) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });
		console.log({ chip });
		const { data } = await axios.get(
			'/api/products/get_all?category=' +
				category +
				'&subcategory=' +
				subcategory +
				'&chip=' +
				chip +
				'&searchKeyword=' +
				searchKeyword +
				'&sortOrder=' +
				sortOrder.toLowerCase() +
				'&showHidden=' +
				show_hidden +
				'&collection=' +
				collection
		);
		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PRODUCT_LIST_FAIL, payload: error.response.data.message });
	}
};

export const saveProduct = (product: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ productActions: product });
	try {
		dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
		const { userLogin: { userInfo } } = getState();
		if (!product._id) {
			const { data } = await axios.post('/api/products/create_one/', product, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
		} else {
			const { data } = await axios.put('/api/products/update_one/' + product._id, product, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
		}
	} catch (error) {
		dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.response.data.message });
	}
};

export const detailsProduct = (pathname: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void
) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: pathname });
		const { data } = await axios.get('/api/products/get_one/' + pathname);
		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.response.data.message });
	}
};

export const deleteProduct = (id: string) => async (
	dispatch: (arg0: { type: string; payload: any; success?: boolean }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		const { userLogin: { userInfo } } = getState();
		console.log(id);
		dispatch({ type: PRODUCT_DELETE_REQUEST, payload: id });
		const { data } = await axios.delete('/api/products/delete_one/' + id, {
			headers: {
				Authorization: 'Bearer ' + userInfo.token
			}
		});
		dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.response.data.message });
	}
};

export const saveProductReview = (
	product_pathname: string,
	review: { name: string; rating: number; comment: string }
) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		const { userLogin: { userInfo } } = getState();
		dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
		const { data } = await axios.post(
			`/api/products/reviews/${product_pathname}/create_one`,
			{ review, userInfo },
			{
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			}
		);
		dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.response.data.message });
	}
};
// export const deleteProductReview = (product_pathname: string, review_id: string) => async (
// 	dispatch: (arg0: { type: string; payload: any }) => void,
// 	getState: () => { userLogin: { userInfo: any } }
// ) => {
// 	console.log({ product_pathname, review_id });
// 	try {
// 		const { userLogin: { userInfo } } = getState();
// 		dispatch({ type: PRODUCT_REVIEW_DELETE_REQUEST, payload: { product_pathname, review_id } });
// 		const { data } = await axios.delete(`/api/products/reviews/${product_pathname}/delete_one/${review_id}`, {
// 			headers: {
// 				Authorization: 'Bearer ' + userInfo.token
// 			}
// 		});
// 		dispatch({ type: PRODUCT_REVIEW_DELETE_SUCCESS, payload: data });
// 	} catch (error) {
// 		dispatch({ type: PRODUCT_REVIEW_DELETE_FAIL, payload: error.response.data.message });
// 	}
// };
