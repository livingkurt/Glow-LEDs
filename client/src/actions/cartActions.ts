import Axios from 'axios';
import Cookie from 'js-cookie';
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING,
	CART_SAVE_PAYMENT,
	CART_LIST_REQUEST,
	CART_LIST_SUCCESS,
	CART_LIST_FAIL,
	CART_DETAILS_REQUEST,
	CART_DETAILS_SUCCESS,
	CART_DETAILS_FAIL,
	CART_SAVE_REQUEST,
	CART_SAVE_SUCCESS,
	CART_SAVE_FAIL,
	CART_DELETE_SUCCESS,
	CART_DELETE_FAIL,
	CART_DELETE_REQUEST
} from '../constants/cartConstants';
import axios from 'axios';

export const addToCart = (cart_data: any) => async (
	dispatch: (arg0: any) => void,
	getState: () => { cart: { cartItems: any }; userLogin: { userInfo: any } }
) => {
	try {
		// const { data } = await Axios.get('/api/products/' + cart_data.pathname);

		// const { data: option_product } = await Axios.get('/api/products/' + data.option_pathname);
		// const { data: color_product } = await Axios.get('/api/products/' + data.color_pathname);
		// let image: any;
		// if (typeof images === 'string') {
		// 	console.log('String');
		// 	image = images;
		// } else {
		// 	console.log('Array');
		// 	image = images[0];
		// }
		let cartItem: any = {
			product: cart_data.product,
			color_product: cart_data.color_product,
			color_product_name: cart_data.color_product_name,
			secondary_color_product: cart_data.secondary_color_product,
			secondary_color_product_name: cart_data.secondary_color_product_name,
			option_product: cart_data.option_product,
			option_product_name: cart_data.option_product_name,
			secondary_product: cart_data.secondary_product,
			secondary_product_name: cart_data.secondary_product_name,
			name: cart_data.name,
			size: cart_data.size,
			color: cart_data.color,
			secondary_color: cart_data.secondary_color,
			display_image: cart_data.display_image,
			price: cart_data.price,
			sale_price: cart_data.sale_price,
			countInStock: cart_data.countInStock,
			weight_pounds: cart_data.weight_pounds,
			weight_ounces: cart_data.weight_ounces,
			package_length: cart_data.package_length,
			package_width: cart_data.package_width,
			package_height: cart_data.package_height,
			package_volume: cart_data.package_volume,
			pathname: cart_data.pathname,
			subcategory: cart_data.subcategory,
			category: cart_data.category,
			qty: cart_data.qty,
			finite_stock: cart_data.finite_stock
		};
		console.log({ cartItem });
		// let cartItem: any = {
		// 	product: macro_product._id,
		// 	name: macro_product.name,
		// 	size: option_product && option_product.name,
		// 	color: color_product && color_product.color,
		// 	display_image: color_product.images[0] || macro_product.images[0],
		// 	price: option_product.price || macro_product.price,
		// 	sale_price: option_product.sale_price || macro_product.sale_price,
		// 	countInStock: option_product.count_in_stock || macro_product.count_in_stock,
		// 	weight_pounds: option_product.weight_pounds || macro_product.weight_pounds,
		// 	weight_ounces: option_product.weight_ounces || macro_product.weight_ounces,
		// 	package_length: option_product.package_length || macro_product.package_length,
		// 	package_width: option_product.package_width || macro_product.package_width,
		// 	package_height: option_product.package_height || macro_product.package_height,
		// 	package_volume: option_product.package_volume || macro_product.package_volume,
		// 	pathname: macro_product.pathname,
		// 	category: macro_product.category,
		// 	// product_option: product_option || {},
		// 	qty: data.qty,
		// 	finite_stock: macro_product.finite_stock
		// };

		// let cartItem: any = {
		// 	product: data._id,
		// 	name: data.name,
		// 	display_image: image,
		// 	price: product_option.price || data.price,
		// 	sale_price: product_option.sale_price || data.sale_price,
		// 	countInStock: data.countInStock,
		// 	weight_pounds: product_option.weight_pounds || data.weight_pounds,
		// 	weight_ounces: product_option.weight_ounces || data.weight_ounces,
		// 	package_length: product_option.package_length || data.package_length,
		// 	package_width: product_option.package_width || data.package_width,
		// 	package_height: product_option.package_height || data.package_height,
		// 	package_volume: product_option.package_volume || data.package_volume,
		// 	pathname: data.pathname,
		// 	category: data.category,
		// 	product_option: product_option || {},
		// 	qty,
		// 	finite_stock: data.finite_stock
		// };
		// console.log({ cartItem });
		// if (color) {
		// 	cartItem = {
		// 		product: data._id,
		// 		name: data.name,
		// 		display_image: image,
		// 		color,
		// 		diffuser_cap,
		// 		price: product_option.price || data.price,
		// 		sale_price: product_option.sale_price || data.sale_price,
		// 		countInStock: data.countInStock,
		// 		weight_pounds: product_option.weight_pounds || data.weight_pounds,
		// 		weight_ounces: product_option.weight_ounces || data.weight_ounces,
		// 		package_length: product_option.package_length || data.package_length,
		// 		package_width: product_option.package_width || data.package_width,
		// 		package_height: product_option.package_height || data.package_height,
		// 		package_volume: product_option.package_volume || data.package_volume,
		// 		pathname: data.pathname,
		// 		category: data.category,
		// 		product_option: product_option || {},
		// 		qty,
		// 		finite_stock: data.finite_stock
		// 	};
		// 	console.log({ color: cartItem });
		// }
		// if (diffuser_cap) {
		// 	cartItem = {
		// 		product: data._id,
		// 		secondary_product: diffuser_cap._id ? diffuser_cap._id : '',
		// 		name: data.name,
		// 		display_image: image,
		// 		color,
		// 		diffuser_cap,
		// 		// diffuser_cap_name: diffuser_cap.name ? diffuser_cap.name : '',
		// 		price: product_option.price || data.price,
		// 		sale_price: product_option.sale_price || data.sale_price,
		// 		countInStock: data.countInStock,
		// 		weight_pounds: product_option.weight_pounds || data.weight_pounds,
		// 		weight_ounces: product_option.weight_ounces || data.weight_ounces,
		// 		package_length: product_option.package_length || data.package_length,
		// 		package_width: product_option.package_width || data.package_width,
		// 		package_height: product_option.package_height || data.package_height,
		// 		package_volume: product_option.package_volume || data.package_volume,
		// 		pathname: data.pathname,
		// 		category: data.category,
		// 		product_option: product_option || {},
		// 		qty,
		// 		finite_stock: data.finite_stock
		// 	};
		// 	console.log({ diffuser_cap: cartItem });
		// }
		dispatch({
			type: CART_ADD_ITEM,
			payload: cartItem
		});

		const { cart: { cartItems } } = getState();
		// const { cart } = getState();
		Cookie.set('cartItems', JSON.stringify(cartItems));
		console.log({ cartItems });
		// try {
		// 	dispatch({ type: CART_SAVE_REQUEST, payload: cartItems });
		// 	const { userLogin: { userInfo } } = getState();
		// 	if (!cart._id) {
		// 		const { data } = await axios.post('/api/carts', cartItems, {
		// 			headers: {
		// 				Authorization: 'Bearer ' + userInfo.token
		// 			}
		// 		});
		// 		dispatch({ type: CART_SAVE_SUCCESS, payload: data });
		// 	} else {
		// 		const { data } = await axios.put('/api/carts/' + cart._id, cart, {
		// 			headers: {
		// 				Authorization: 'Bearer ' + userInfo.token
		// 			}
		// 		});
		// 		dispatch({ type: CART_SAVE_SUCCESS, payload: data });
		// 	}
		// } catch (error) {
		// 	dispatch({ type: CART_SAVE_FAIL, payload: error.response.data.message });
		// }
		// dispatch({ type: CART_SAVE_REQUEST, payload: cart });
		// const { userLogin: { userInfo } } = getState();
		// if (!cart._id) {
		// 	const { data } = await axios.post('/api/carts', cart, {
		// 		headers: {
		// 			Authorization: 'Bearer ' + userInfo.token
		// 		}
		// 	});
		// 	dispatch({ type: CART_SAVE_SUCCESS, payload: data });
		// } else {
		// 	const { data } = await axios.put('/api/carts/' + cart._id, cart, {
		// 		headers: {
		// 			Authorization: 'Bearer ' + userInfo.token
		// 		}
		// 	});
		// 	dispatch({ type: CART_SAVE_SUCCESS, payload: data });
		// }
	} catch (error) {
		console.log({ error });
	}
};

export const removeFromCart = (product: string) => (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { cart: { cartItems: object } }
) => {
	console.log({ product });
	dispatch({ type: CART_REMOVE_ITEM, payload: product });

	const { cart: { cartItems } } = getState();
	Cookie.set('cartItems', JSON.stringify(cartItems));
};

export const saveShipping = (data: {
	first_name: string;
	last_name: string;
	address_1: string;
	address_2: string;
	city: string;
	state: string;
	postalCode: string;
	international: boolean;
	country: string;
}) => (dispatch: (arg0: { type: string; payload: any }) => void) => {
	dispatch({ type: CART_SAVE_SHIPPING, payload: data });
	Cookie.set('shipping', JSON.stringify(data));
};

export const savePayment = (data: { paymentMethod: any }) => (
	dispatch: (arg0: { type: string; payload: any }) => void
) => {
	dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};

export const listCarts = (category = '', searchKeyword = '', sortOrder = '') => async (
	dispatch: (arg0: { type: string; payload?: any }) => void
) => {
	try {
		dispatch({ type: CART_LIST_REQUEST });
		const { data } = await axios.get(
			'/api/carts?category=' +
				category +
				'&searchKeyword=' +
				searchKeyword +
				'&sortOrder=' +
				sortOrder.toLowerCase()
		);
		dispatch({ type: CART_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: CART_LIST_FAIL, payload: error.response.data.message });
	}
};

export const saveCart = (cart: {
	_id: string;
	cart_name?: string;
	application?: number;
	url?: string;
	place_of_purchase?: string;
	date_of_purchase?: string;
	category?: string;
	card?: number;
	amount?: string;
}) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ cartActions: cart });
	try {
		dispatch({ type: CART_SAVE_REQUEST, payload: cart });
		const { userLogin: { userInfo } } = getState();
		if (!cart._id) {
			const { data } = await axios.post('/api/carts', cart, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: CART_SAVE_SUCCESS, payload: data });
		} else {
			const { data } = await axios.put('/api/carts/' + cart._id, cart, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: CART_SAVE_SUCCESS, payload: data });
		}
	} catch (error) {
		dispatch({ type: CART_SAVE_FAIL, payload: error.response.data.message });
	}
};

export const detailsCart = (cart_id: string) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
	try {
		dispatch({ type: CART_DETAILS_REQUEST, payload: cart_id });
		const { data } = await axios.get('/api/carts/' + cart_id);
		dispatch({ type: CART_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: CART_DETAILS_FAIL, payload: error.response.data.message });
	}
};

export const deleteCart = (cartId: string) => async (
	dispatch: (arg0: { type: string; payload: any; success?: boolean }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		const { userLogin: { userInfo } } = getState();
		dispatch({ type: CART_DELETE_REQUEST, payload: cartId });
		const { data } = await axios.delete('/api/carts/' + cartId, {
			headers: {
				Authorization: 'Bearer ' + userInfo.token
			}
		});
		dispatch({ type: CART_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		dispatch({ type: CART_DELETE_FAIL, payload: error.response.data.message });
	}
};
