import Axios from 'axios';
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
import { create_query } from '../utils/helper_functions';

export const addToCart = (cart_item_1: any) => async (
	dispatch: (arg0: any) => void,
	getState: () => { cart: { cartItems: any }; userLogin: { userInfo: any } }
) => {
	console.log({ cart_item_1 });
	try {
		let cart_data = cart_item_1;

		const { cart: { cartItems } } = getState();
		if (!cart_item_1.product && cart_item_1.pathname && cart_item_1.qty) {
			const same_item = cartItems.find((item: any) => item.pathname === cart_data.pathname);
			cart_data = { ...same_item, qty: cart_item_1.qty };
		}

		let cartItem: any = {
			product: cart_data.product,

			color_product: cart_data.color_product,
			// color_product_name: cart_data.color_product_name,
			color_group_name: cart_data.color_group_name,

			secondary_color_group_name: cart_data.secondary_color_group_name,
			secondary_color_product: cart_data.secondary_color_product,
			// secondary_color_product_name: cart_data.secondary_color_product_name,

			option_group_name: cart_data.option_group_name,
			option_product: cart_data.option_product,
			option_product_name: cart_data.option_product_name,

			secondary_product: cart_data.secondary_product,
			secondary_product_name: cart_data.secondary_product_name,
			secondary_group_name: cart_data.secondary_group_name,

			name: cart_data.name,
			size: cart_data.size,

			color: cart_data.color,
			color_code: cart_data.color_code,

			secondary_color: cart_data.secondary_color,
			secondary_color_code: cart_data.secondary_color_code,

			display_image: cart_data.display_image,
			secondary_image: cart_data.secondary_image,
			price: cart_data.price,
			preorder: cart_data.preorder,
			sale_price: cart_data.sale_price,
			sale_start_date: cart_data.sale_start_date,
			sale_end_date: cart_data.sale_end_date,
			count_in_stock: cart_data.count_in_stock,
			weight_pounds: cart_data.weight_pounds,
			weight_ounces: cart_data.weight_ounces,
			package_length: cart_data.package_length,
			package_width: cart_data.package_width,
			package_height: cart_data.package_height,
			package_volume: cart_data.package_volume,
			pathname: cart_data.pathname,
			subcategory: cart_data.subcategory,
			category: cart_data.category,
			qty: parseInt(cart_data.qty),
			quantity: cart_data.quantity,
			finite_stock: cart_data.finite_stock
		};
		console.log({ cartItem });

		dispatch({
			type: CART_ADD_ITEM,
			payload: cartItem
		});
		console.log({ cartItems });
	} catch (error) {
		console.log({ error });
	}
};

export const removeFromCart = (product: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { cart: { cartItems: object }; userLogin: { userInfo: any } }
) => {
	const { userLogin: { userInfo } } = getState();
	const { cart: { cartItems } } = getState();
	dispatch({ type: CART_REMOVE_ITEM, payload: product });
	try {
		if (userInfo && Object.keys(userInfo).length > 0) {
			const { data } = await axios.get('/api/carts/user/' + userInfo._id);
			if (Object.keys(data).length > 0) {
				console.log('Cart Found');
				const response = await axios.put(
					'/api/carts/user/' + userInfo._id,
					{ data, cartItems, userInfo, cartItem: product },
					{
						headers: {
							Authorization: 'Bearer ' + userInfo.access_token
						}
					}
				);
				// dispatch({ type: CART_REMOVE_SUCCESS, payload: data });
			}
		}
	} catch (error) {
		console.log({ error });
		// dispatch({ type: CART_REMOVE_FAIL, payload: error });
	}
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
	// console.log({ shipping_actions: data });
	dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};

export const savePayment = (data: { paymentMethod: any }) => (
	dispatch: (arg0: { type: string; payload: any }) => void
) => {
	dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};

export const listCarts = (query: any) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
	try {
		dispatch({ type: CART_LIST_REQUEST });
		const { data } = await axios.get('/api/carts?' + create_query(query));
		dispatch({ type: CART_LIST_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: CART_LIST_FAIL, payload: error });
	}
};

export const saveCart = (cartItem: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { cart: { cartItems: any }; userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: CART_SAVE_REQUEST, payload: cartItem });
		const { userLogin: { userInfo } } = getState();
		const { cart: { cartItems } } = getState();
		if (userInfo && Object.keys(userInfo).length > 0) {
			const { data } = await axios.get('/api/carts/user/' + userInfo._id);
			if (Object.keys(data).length > 0) {
				const { data: updated_cart } = await axios.put(
					'/api/carts/' + data._id,
					{ cartItems, cartItem, userInfo },
					{
						headers: {
							Authorization: 'Bearer ' + userInfo.access_token
						}
					}
				);
				dispatch({ type: CART_SAVE_SUCCESS, payload: updated_cart });
			} else if (Object.keys(data).length === 0) {
				const { data } = await axios.post(
					'/api/carts',
					{ cartItem, userInfo, cartItems: [] },
					{
						headers: {
							Authorization: 'Bearer ' + userInfo.access_token
						}
					}
				);
				dispatch({ type: CART_SAVE_SUCCESS, payload: data });
			}
		} else {
			console.log('User Does Not Exist');
		}
	} catch (error) {
		console.log({ error });
		dispatch({ type: CART_SAVE_FAIL, payload: error });
	}
};

export const detailsCart = (cart_id: string) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
	try {
		dispatch({ type: CART_DETAILS_REQUEST, payload: cart_id });
		const { data } = await axios.get('/api/carts/' + cart_id);
		dispatch({ type: CART_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: CART_DETAILS_FAIL, payload: error });
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
				Authorization: 'Bearer ' + userInfo.access_token
			}
		});
		dispatch({ type: CART_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		console.log({ error });
		dispatch({ type: CART_DELETE_FAIL, payload: error });
	}
};
