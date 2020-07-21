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
	PRODUCT_REVIEW_SAVE_FAIL
} from '../constants/productConstants';
import axios from 'axios';

const listProducts = (category = '', searchKeyword = '', sortOrder = '') => async (
	dispatch: (arg0: { type: string; payload?: any }) => void
) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });
		const { data } = await axios.get(
			'/api/products?category=' +
				category +
				'&searchKeyword=' +
				searchKeyword +
				'&sortOrder=' +
				sortOrder.toLowerCase()
		);
		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
	}
};

const saveProduct = (product: {
	_id: any;
	name?: any;
	price?: any;
	display_image?: any;
	video?: any;
	brand?: any;
	category?: any;
	countInStock?: any;
	facts?: any;
	included_items?: any;
	description?: any;
	hidden?: any;
	sale_price?: any;
	volume?: any;
}) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ productActions: product });
	try {
		dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
		const { userLogin: { userInfo } } = getState();
		if (!product._id) {
			const { data } = await axios.post('/api/products', product, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
		} else {
			const { data } = await axios.put('/api/products/' + product._id, product, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
		}
	} catch (error) {
		dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
	}
};

const detailsProduct = (productId: string) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
		const { data } = await axios.get('/api/products/' + productId);
		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
	}
};

const deleteProduct = (productId: string) => async (
	dispatch: (arg0: { type: string; payload: any; success?: boolean }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		const { userLogin: { userInfo } } = getState();
		dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
		const { data } = await axios.delete('/api/products/' + productId, {
			headers: {
				Authorization: 'Bearer ' + userInfo.token
			}
		});
		dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
	}
};

const imagesProduct = (folder_dir: any) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
	// console.log({ folder_dir });
	try {
		dispatch({ type: PRODUCT_IMAGES_REQUEST, payload: folder_dir });
		const { data } = await axios.post('/api/products/images', folder_dir);
		dispatch({ type: PRODUCT_IMAGES_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PRODUCT_IMAGES_FAIL, payload: error.message });
	}
};

const saveProductReview = (product_id: any, review: { name: any; rating: any; comment: any }) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: { token: any } } }
) => {
	try {
		const { userLogin: { userInfo: { token } } } = getState();
		dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
		const { data } = await axios.post(`/api/products/${product_id}/reviews`, review, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
		dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
	}
};

export { listProducts, detailsProduct, saveProduct, deleteProduct, imagesProduct, saveProductReview };
