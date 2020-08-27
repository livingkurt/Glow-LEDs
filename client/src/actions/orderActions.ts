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
	ORDER_SHIPPING_REQUEST,
	ORDER_SHIPPING_SUCCESS,
	ORDER_SHIPPING_FAIL,
	ORDER_DELIVERY_REQUEST,
	ORDER_DELIVERY_SUCCESS,
	ORDER_DELIVERY_FAIL
} from '../constants/orderConstants';
import Cookie from 'js-cookie';

const createOrder = (
	order: {
		orderItems: object;
		shipping: object;
		payment: any;
		itemsPrice: number;
		shippingPrice: number;
		taxPrice: number;
		totalPrice: number;
		user_data: object;
		order_note: string;
	},
	token: any
) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ createOrder_order: order });
	try {
		dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
		const { userLogin: { userInfo: user_data } } = getState();
		const { data: { data: newOrder } } = await axios.post('/api/orders', order, {
			headers: {
				Authorization: ' Bearer ' + user_data.token
			}
		});
		console.log({ createOrder_newOrder: newOrder });
		dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
		const { data } = await axios.put(
			'/api/orders/' + newOrder._id + '/pay',
			{ token },
			{
				headers: { Authorization: 'Bearer ' + user_data.token }
			}
		);
		dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
		axios.post('/api/emails/order', { ...newOrder, user_data, token });
		axios.post('/api/emails/sale', { ...newOrder, user_data, token });
		Cookie.remove('shipping');
		dispatch({ type: ORDER_REMOVE_STATE, payload: {} });
	} catch (error) {
		dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
	}
};

const listMyOrders = () => async (
	dispatch: (arg0: { type: string; payload?: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: MY_ORDER_LIST_REQUEST });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.get('/api/orders/mine', {
			headers: { Authorization: 'Bearer ' + userInfo.token }
		});
		dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
	}
};

const listOrders = (category = '', searchKeyword = '', sortOrder = '') => async (
	dispatch: (arg0: { type: string; payload?: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: ORDER_LIST_REQUEST });
		const { userLogin: { userInfo } } = getState();
		// const { data } = await axios.get('/api/orders', {
		// 	headers: { Authorization: 'Bearer ' + userInfo.token }
		// });
		const { data } = await axios.get(
			'/api/orders?category=' +
				category +
				'&searchKeyword=' +
				searchKeyword +
				'&sortOrder=' +
				sortOrder.toLowerCase(),
			{
				headers: { Authorization: 'Bearer ' + userInfo.token }
			}
		);
		dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
	}
};

const detailsOrder = (orderId: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.get('/api/orders/' + orderId, {
			headers: { Authorization: 'Bearer ' + userInfo.token }
		});
		dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
	}
};

const payOrder = (order: { _id: string }, user_data: any, token: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: ORDER_PAY_REQUEST, payload: token });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.put(
			'/api/orders/' + order._id + '/pay',
			{ user_data, token },
			{
				headers: { Authorization: 'Bearer ' + userInfo.token }
			}
		);
		// const res = await axios.post('api/stripe', userInfo.token);
		dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
		axios.post('/api/emails/paid', { ...order, user_data });
		axios.post('/api/emails/orderpaid', { ...order, user_data });
	} catch (error) {
		dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
	}
};

const deleteOrder = (orderId: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.delete('/api/orders/' + orderId, {
			headers: { Authorization: 'Bearer ' + userInfo.token }
		});
		dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
	}
};

const shipOrder = (order: { _id: string }, shippingResult: boolean) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ ...order, isShipped: shippingResult });
	try {
		dispatch({ type: ORDER_SHIPPING_REQUEST, payload: shippingResult });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.put(
			'/api/orders/' + order._id + '/shipping',
			{
				...order,
				isShipped: shippingResult,
				shippedAt: shippingResult ? Date.now() : ''
			},
			{
				headers: { Authorization: 'Bearer ' + userInfo.accessToken }
			}
		);
		console.log({ data });
		dispatch({ type: ORDER_SHIPPING_SUCCESS, payload: data });
		// axios.post("/api/emails/shipping", data);
	} catch (error) {
		dispatch({ type: ORDER_SHIPPING_FAIL, payload: error.message });
	}
};
// const notPaidOrder = (order: { _id: string }, notPaidResult: boolean) => async (
// 	dispatch: (arg0: { type: string; payload: any }) => void,
// 	getState: () => { userLogin: { userInfo: any } }
// ) => {
// 	console.log({ ...order, isShipped: notPaidResult });
// 	try {
// 		dispatch({ type: ORDER_NOT_PAID_REQUEST, payload: notPaidResult });
// 		const { userLogin: { userInfo } } = getState();
// 		const { data } = await axios.put(
// 			'/api/orders/' + order._id + '/shipping',
// 			{
// 				...order,
// 				isNotPaid: notPaidResult,
// 				shippedAt: notPaidResult ? Date.now() : ''
// 			},
// 			{
// 				headers: { Authorization: 'Bearer ' + userInfo.accessToken }
// 			}
// 		);
// 		console.log({ data });
// 		dispatch({ type: ORDER_NOT_PAID_SUCCESS, payload: data });
// 		// axios.post("/api/emails/shipping", data);
// 	} catch (error) {
// 		dispatch({ type: ORDER_NOT_PAID_FAIL, payload: error.message });
// 	}
// };

const deliverOrder = (order: { _id: string }, deliveryResult: boolean) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ ...order, isDelivered: deliveryResult });
	try {
		dispatch({ type: ORDER_DELIVERY_REQUEST, payload: deliveryResult });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.put(
			'/api/orders/' + order._id + '/delivery',
			{
				...order,
				isDelivered: deliveryResult,
				deliveredAt: deliveryResult ? Date.now() : ''
			},
			{
				headers: { Authorization: 'Bearer ' + userInfo.accessToken }
			}
		);
		console.log({ data });
		dispatch({ type: ORDER_DELIVERY_SUCCESS, payload: data });
		// axios.post("/api/emails/delivery", data);
	} catch (error) {
		dispatch({ type: ORDER_DELIVERY_FAIL, payload: error.message });
	}
};
export { createOrder, detailsOrder, payOrder, listMyOrders, listOrders, deleteOrder, shipOrder, deliverOrder };
