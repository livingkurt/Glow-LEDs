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
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_DELETE_REQUEST,
	ORDER_DELETE_SUCCESS,
	ORDER_DELETE_FAIL,
	ORDER_REFUND_REQUEST,
	ORDER_REFUND_SUCCESS,
	ORDER_REFUND_FAIL,
	ORDER_UPDATE_REQUEST,
	ORDER_UPDATE_SUCCESS,
	ORDER_UPDATE_FAIL,
	ORDER_SAVE_REQUEST,
	ORDER_SAVE_SUCCESS,
	ORDER_SAVE_FAIL,
	ORDER_DETAILS_PUBLIC_REQUEST,
	ORDER_DETAILS_PUBLIC_SUCCESS,
	ORDER_DETAILS_PUBLIC_FAIL
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action: { type: any; payload: any }) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return { loading: true };
		case ORDER_CREATE_SUCCESS:
			return { loading: false, order: action.payload, success: true, message: 'Order Created' };
		case ORDER_CREATE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		// case ORDER_REMOVE_STATE:
		// 	return { loading: false, order: action.payload, success: false };
		default:
			return state;
	}
};

export const orderDetailsReducer = (
	state = {
		order: {
			orderItems: [],
			shipping: {},
			payment: {}
		}
	},
	action: { type: any; payload: any }
) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return { loading: true };
		case ORDER_DETAILS_SUCCESS:
			return { loading: false, order: action.payload, message: 'Order Found' };
		case ORDER_DETAILS_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const myOrderListReducer = (
	state = {
		orders: []
	},
	action: { type: any; payload: any }
) => {
	switch (action.type) {
		case MY_ORDER_LIST_REQUEST:
			return { loading: true };
		case MY_ORDER_LIST_SUCCESS:
			return { loading: false, orders: action.payload, message: 'Orders Found' };
		case MY_ORDER_LIST_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const orderListReducer = (
	state = {
		orders: [],
		totalPages: 0,
		currentPage: 1
	},
	action: { type: any; payload: any }
) => {
	// console.log({ orderListReducer: action.payload });
	switch (action.type) {
		case ORDER_LIST_REQUEST:
			return { loading: true };
		case ORDER_LIST_SUCCESS:
			return {
				loading: false,
				orders: action.payload.orders,
				totalPages: action.payload.totalPages,
				currentPage: action.payload.currentPage,
				message: 'Orders Found'
			};
		case ORDER_LIST_FAIL:
			return { loading: false, error: action.payload, message: action.payload.message };
		default:
			return state;
	}
};

export const orderPayReducer = (
	state = {
		order: {
			orderItems: [],
			shipping: {},
			payment: {}
		}
	},
	action: { type: any; payload: any }
) => {
	switch (action.type) {
		case ORDER_PAY_REQUEST:
			return { loading: true };
		case ORDER_PAY_SUCCESS:
			return { loading: false, success: true, message: 'Order Paid' };
		case ORDER_PAY_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		case ORDER_REMOVE_STATE:
			return { loading: false, success: false };
		default:
			return state;
	}
};

export const orderDeleteReducer = (
	state = {
		order: {
			orderItems: [],
			shipping: {},
			payment: {}
		}
	},
	action: { type: any; payload: any }
) => {
	switch (action.type) {
		case ORDER_DELETE_REQUEST:
			return { loading: true };
		case ORDER_DELETE_SUCCESS:
			return { loading: false, success: true, message: 'Order Deleted' };
		case ORDER_DELETE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const orderRefundReducer = (state = {}, action: { type: any; payload: any }) => {
	switch (action.type) {
		case ORDER_REFUND_REQUEST:
			return { loading: true };
		case ORDER_REFUND_SUCCESS:
			return { loading: false, order: action.payload, success: true, message: 'Order Refunded' };
		case ORDER_REFUND_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const orderUpdateReducer = (state = {}, action: { type: any; payload: any }) => {
	switch (action.type) {
		case ORDER_UPDATE_REQUEST:
			return { loading: true };
		case ORDER_UPDATE_SUCCESS:
			return { loading: false, order: action.payload, success: true, message: 'Order Updated' };
		case ORDER_UPDATE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const orderSaveReducer = (state = { order: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case ORDER_SAVE_REQUEST:
			return { loading: true };
		case ORDER_SAVE_SUCCESS:
			return { loading: false, success: true, order: action.payload, message: 'Order Saved' };
		case ORDER_SAVE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};
