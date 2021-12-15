import axios from 'axios';
import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_REMOVE_STATE,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	MY_ORDER_LIST_REQUEST,
	MY_ORDER_LIST_SUCCESS,
	MY_ORDER_LIST_FAIL,
	ORDER_DELETE_REQUEST,
	ORDER_DELETE_SUCCESS,
	ORDER_DELETE_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_UPDATE_REQUEST,
	ORDER_UPDATE_SUCCESS,
	ORDER_UPDATE_FAIL,
	ORDER_SAVE_REQUEST,
	ORDER_SAVE_SUCCESS,
	ORDER_SAVE_FAIL,
	ORDER_REFUND_REQUEST,
	ORDER_REFUND_SUCCESS,
	ORDER_REFUND_FAIL,
	ORDER_DETAILS_PUBLIC_REQUEST,
	ORDER_DETAILS_PUBLIC_SUCCESS,
	ORDER_DETAILS_PUBLIC_FAIL
} from '../constants/orderConstants';
import {
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_SAVE_REQUEST,
	USER_SAVE_SUCCESS
} from '../constants/userConstants';
import { create_query } from '../utils/helper_functions';
require('dotenv').config();

export const createPayOrder = (
	order: {
		orderItems: object;
		shipping: object;
		payment: any;
		itemsPrice: number;
		shippingPrice: number;
		taxPrice: number;
		totalPrice: number;
		user: object;
		order_note: string;
		promo_code: string;
	},
	paymentMethod: any
) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
		const { userLogin: { userInfo } } = getState();
		const order_create_res = await axios.post(
			'/api/orders/secure',
			{ ...order, user: userInfo._id },
			{
				headers: {
					Authorization: ' Bearer ' + userInfo.access_token
				}
			}
		);
		console.log({ order_create_res });
		if (order_create_res.data) {
			dispatch({ type: ORDER_CREATE_SUCCESS, payload: order_create_res.data });
			const payment_res = await axios.put(
				'/api/payments/secure/pay/' + order_create_res.data._id,
				{ paymentMethod },
				{
					headers: { Authorization: 'Bearer ' + userInfo.access_token }
				}
			);
			console.log({ payment_res });
			if (payment_res.data) {
				dispatch({ type: ORDER_PAY_SUCCESS, payload: payment_res.data });
				sessionStorage.removeItem('shippingAddress');
				dispatch({ type: ORDER_REMOVE_STATE, payload: {} });
			} else {
				dispatch({ type: ORDER_CREATE_FAIL, payload: payment_res });
			}
		} else {
			dispatch({ type: ORDER_CREATE_FAIL, payload: order_create_res });
		}
	} catch (error) {
		console.log({ error });
		dispatch({ type: ORDER_CREATE_FAIL, payload: error });
	}
};

export const createPayOrderGuest = (
	order: {
		orderItems: object;
		shipping: any;
		payment: any;
		itemsPrice: number;
		shippingPrice: number;
		taxPrice: number;
		totalPrice: number;
		order_note: string;
		promo_code: string;
	},
	create_account: boolean,
	password: string,
	paymentMethod: any
) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		if (create_account) {
			dispatch({
				type: USER_REGISTER_REQUEST,
				payload: {
					first_name: order.shipping.first_name,
					last_name: order.shipping.last_name,
					email: order.shipping.email,
					password: password
				}
			});
			const create_account_res = await axios.post('/api/users/register', {
				first_name: order.shipping.first_name,
				last_name: order.shipping.last_name,
				email: order.shipping.email,
				password: password
			});
			if (create_account_res.data) {
				dispatch({ type: USER_REGISTER_SUCCESS, payload: create_account_res.data });
				axios.post('/api/emails/account_created', create_account_res.data);
				dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
				const create_guest_order_res = await axios.post('/api/orders/guest', {
					...order,
					user: create_account_res.data._id
				});
				if (create_guest_order_res.data) {
					dispatch({ type: ORDER_CREATE_SUCCESS, payload: create_guest_order_res.data });
					const guest_payment_res = await axios.put(
						'/api/payments/guest/pay/' + create_guest_order_res.data._id,
						{
							paymentMethod
						}
					);
					if (guest_payment_res.data) {
						dispatch({ type: ORDER_PAY_SUCCESS, payload: guest_payment_res.data });
						sessionStorage.removeItem('shippingAddress');
						dispatch({ type: ORDER_REMOVE_STATE, payload: {} });
					}
					dispatch({ type: ORDER_CREATE_FAIL, payload: guest_payment_res });
				}
				dispatch({ type: ORDER_CREATE_FAIL, payload: create_guest_order_res });
			} else {
				dispatch({ type: ORDER_CREATE_FAIL, payload: create_account_res });
			}
		} else {
			const user_email_res = await axios.get('/api/users/email/' + order.shipping.email);
			// console.log({ createPayOrderGuest_user_email_res: user_email_res });
			if (user_email_res.data && Object.keys(user_email_res.data).length > 0) {
				dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
				const create_guest_order_res = await axios.post('/api/orders/guest', {
					...order,
					user: user_email_res.data._id
				});
				if (create_guest_order_res.data) {
					dispatch({ type: ORDER_CREATE_SUCCESS, payload: create_guest_order_res.data });

					const guest_payment_res = await axios.put(
						'/api/payments/guest/pay/' + create_guest_order_res.data._id,
						{
							paymentMethod
						}
					);
					if (guest_payment_res.data) {
						dispatch({ type: ORDER_PAY_SUCCESS, payload: guest_payment_res.data });
						sessionStorage.removeItem('shippingAddress');
						dispatch({ type: ORDER_REMOVE_STATE, payload: {} });
					} else {
						dispatch({ type: ORDER_CREATE_FAIL, payload: guest_payment_res });
					}
				} else {
					dispatch({ type: ORDER_CREATE_FAIL, payload: create_guest_order_res });
				}
			} else {
				dispatch({ type: USER_SAVE_REQUEST, payload: {} });
				// console.log('User Doesnt Exist');
				const { data } = await axios.post('/api/users/', {
					first_name: order.shipping.first_name,
					last_name: order.shipping.last_name,
					email: order.shipping.email,
					isVerified: true,
					email_subscription: true,
					guest: true,
					password: process.env.REACT_APP_TEMP_PASS
				});
				console.log({ createPayOrderGuest_user_create: data });
				dispatch({ type: USER_SAVE_SUCCESS, payload: data });
				dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
				const create_guest_order_res = await axios.post('/api/orders/guest', {
					...order,
					user: data._id
				});
				console.log({ create_guest_order_res });
				if (create_guest_order_res.data && Object.keys(create_guest_order_res.data).length > 0) {
					dispatch({ type: ORDER_CREATE_SUCCESS, payload: create_guest_order_res.data });

					const guest_payment_res = await axios.put(
						'/api/payments/guest/pay/' + create_guest_order_res.data._id,
						{ paymentMethod }
					);
					if (guest_payment_res.data) {
						dispatch({ type: ORDER_PAY_SUCCESS, payload: guest_payment_res.data });
						sessionStorage.removeItem('shippingAddress');
						dispatch({ type: ORDER_REMOVE_STATE, payload: {} });
					} else {
						dispatch({ type: ORDER_CREATE_FAIL, payload: guest_payment_res });
					}
				} else {
					dispatch({ type: ORDER_CREATE_FAIL, payload: create_guest_order_res });
				}
			}
		}
	} catch (error) {
		dispatch({ type: ORDER_CREATE_FAIL, payload: error });
	}
};

export const createOrderGuest = (order: {
	orderItems: object;
	shipping: any;
	payment: any;
	itemsPrice: number;
	shippingPrice: number;
	taxPrice: number;
	totalPrice: number;
	order_note: string;
	promo_code: string;
}) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
	try {
		dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
		const create_guest_order_res = await axios.post('/api/orders/guest', order);
		if (create_guest_order_res.data) {
			dispatch({ type: ORDER_CREATE_SUCCESS, payload: create_guest_order_res.data });
			sessionStorage.removeItem('shippingAddress');
			dispatch({ type: ORDER_REMOVE_STATE, payload: {} });
		} else {
			dispatch({ type: ORDER_CREATE_FAIL, payload: create_guest_order_res });
		}
	} catch (error) {
		dispatch({ type: ORDER_CREATE_FAIL, payload: error });
	}
};

export const createOrder = (order: {
	orderItems: object;
	shipping: object;
	payment: any;
	itemsPrice: number;
	shippingPrice: number;
	taxPrice: number;
	totalPrice: number;
	user: object;
	order_note: string;
	promo_code: string;
}) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		console.log({ createOrder: order });
		dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
		const { userLogin: { userInfo } } = getState();
		const create_order_res = await axios.post('/api/orders/secure', order, {
			headers: {
				Authorization: ' Bearer ' + userInfo.access_token
			}
		});
		if (create_order_res.data) {
			dispatch({ type: ORDER_CREATE_SUCCESS, payload: create_order_res.data });
			sessionStorage.removeItem('shippingAddress');
			dispatch({ type: ORDER_REMOVE_STATE, payload: {} });
		} else {
			dispatch({ type: ORDER_CREATE_FAIL, payload: create_order_res });
		}
	} catch (error) {
		console.log({ error });
		dispatch({ type: ORDER_CREATE_FAIL, payload: error });
	}
};

export const payOrder = (order: any, paymentMethod: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: ORDER_PAY_REQUEST, payload: paymentMethod });
		const { userLogin: { userInfo } } = getState();
		const payment_res = await axios.put(
			'/api/payments/secure/pay/' + order._id,
			{ paymentMethod },
			{
				headers: { Authorization: 'Bearer ' + userInfo.access_token }
			}
		);
		if (payment_res.data) {
			dispatch({ type: ORDER_PAY_SUCCESS, payload: payment_res.data });
		} else {
			dispatch({ type: ORDER_PAY_FAIL, payload: payment_res });
		}
	} catch (error) {
		console.log({ error });
		dispatch({ type: ORDER_PAY_FAIL, payload: error });
	}
};
export const payOrderGuest = (order: any, paymentMethod: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void
) => {
	try {
		dispatch({ type: ORDER_PAY_REQUEST, payload: paymentMethod });
		const guest_payment_res = await axios.put('/api/payments/guest/pay/' + order._id, { paymentMethod });
		if (guest_payment_res.data) {
			dispatch({ type: ORDER_PAY_SUCCESS, payload: guest_payment_res.data });
		} else {
			dispatch({ type: ORDER_PAY_FAIL, payload: guest_payment_res });
		}
	} catch (error) {
		dispatch({ type: ORDER_PAY_FAIL, payload: error });
	}
};

export const listMyOrders = (user_id: string) => async (
	dispatch: (arg0: { type: string; payload?: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: MY_ORDER_LIST_REQUEST });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.get('/api/orders/user/' + user_id, {
			headers: { Authorization: 'Bearer ' + userInfo.access_token }
		});
		console.log({ Orders: data });
		dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: MY_ORDER_LIST_FAIL, payload: error });
	}
};
export const listUserOrders = (user_id: string) => async (
	dispatch: (arg0: { type: string; payload?: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: MY_ORDER_LIST_REQUEST });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.get('/api/orders/glow/' + user_id, {
			headers: { Authorization: 'Bearer ' + userInfo.access_token }
		});
		console.log({ Orders: data });
		dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: MY_ORDER_LIST_FAIL, payload: error });
	}
};

export const listOrders = (query: any) => async (
	dispatch: (arg0: { type: string; payload?: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: ORDER_LIST_REQUEST });
		const { userLogin: { userInfo } } = getState();
		console.log({ userInfo });
		const { data } = await axios.get('/api/orders/?' + create_query(query), {
			headers: { Authorization: 'Bearer ' + userInfo.access_token }
		});
		console.log({ data });
		dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: ORDER_LIST_FAIL, payload: error });
	}
};

export const detailsOrder = (orderId: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
		const { userLogin: { userInfo } } = getState();
		if (userInfo && userInfo.first_name) {
			const { data } = await axios.get('/api/orders/secure/' + orderId, {
				headers: { Authorization: 'Bearer ' + userInfo.access_token }
			});
			dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
		} else {
			const { data } = await axios.get('/api/orders/guest/' + orderId);
			dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
		}
	} catch (error) {
		console.log({ error });
		dispatch({ type: ORDER_DETAILS_FAIL, payload: error });
	}
};

export const deleteOrder = (orderId: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.delete('/api/orders/glow/' + orderId, {
			headers: { Authorization: 'Bearer ' + userInfo.access_token }
		});
		dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: ORDER_DELETE_FAIL, payload: error });
	}
};

export const refundOrder = (
	order: { _id: string },
	refundResult: boolean,
	refund_amount: number,
	refund_reason: string
) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ ...order, isRefunded: refundResult });
	try {
		dispatch({ type: ORDER_REFUND_REQUEST, payload: refundResult });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.put(
			'/api/payments/secure/refund/' + order._id,
			{
				...order,
				refund_amount: refund_amount,
				isRefunded: refundResult,
				RefundedAt: refundResult ? Date.now() : '',
				refund_reason: refund_reason
			},
			{
				headers: { Authorization: 'Bearer ' + userInfo.access_token }
			}
		);
		console.log({ data });
		dispatch({ type: ORDER_REFUND_SUCCESS, payload: data });
		axios.post('/api/emails/refund', data);
	} catch (error) {
		console.log({ error });
		dispatch({ type: ORDER_REFUND_FAIL, payload: error });
	}
};

export const update_order = (
	order: { _id: string; isManufactured: boolean },
	result: boolean,
	is_action: string,
	action_at: string
) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ ...order, [is_action]: result });
	try {
		dispatch({ type: ORDER_UPDATE_REQUEST, payload: result });
		const { userLogin: { userInfo } } = getState();
		let d = {};
		if (!order.isManufactured && is_action === 'isPackaged') {
			d = {
				...order,
				[is_action]: result,
				[action_at]: result ? Date.now() : '',
				isManufactured: true,
				manufacturedAt: result ? Date.now() : ''
			};
		} else {
			d = {
				...order,
				[is_action]: result,
				[action_at]: result ? Date.now() : ''
			};
		}

		const { data } = await axios.put('/api/orders/glow/' + order._id, d, {
			headers: { Authorization: 'Bearer ' + userInfo.access_token }
		});
		console.log({ data });
		dispatch({ type: ORDER_UPDATE_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: ORDER_UPDATE_FAIL, payload: error });
	}
};
export const update_payment = (order: { _id: string }, result: boolean, payment_method: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: ORDER_UPDATE_REQUEST, payload: result });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.put(
			'/api/orders/glow/' + order._id,
			{
				...order,
				isPaid: result,
				paidAt: result ? Date.now() : '',
				payment: {
					paymentMethod: payment_method ? payment_method : 'stripe'
				}
			},
			{
				headers: { Authorization: 'Bearer ' + userInfo.access_token }
			}
		);
		console.log({ data });
		dispatch({ type: ORDER_UPDATE_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: ORDER_UPDATE_FAIL, payload: error });
	}
};

export const saveOrder = (order: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ saveOrder: order });
	try {
		dispatch({ type: ORDER_SAVE_REQUEST, payload: order });
		const { userLogin: { userInfo } } = getState();
		if (!order._id) {
			const { data } = await axios.post('/api/orders/glow', order, {
				headers: {
					Authorization: 'Bearer ' + userInfo.access_token
				}
			});
			dispatch({ type: ORDER_SAVE_SUCCESS, payload: data });
		} else {
			console.log({ order });
			const { data } = await axios.put('/api/orders/glow/' + order._id, order, {
				headers: {
					Authorization: 'Bearer ' + userInfo.access_token
				}
			});
			dispatch({ type: ORDER_SAVE_SUCCESS, payload: data });
		}
	} catch (error) {
		console.log({ error });
		dispatch({ type: ORDER_SAVE_FAIL, payload: error });
	}
};
