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
	ORDER_SHIPPING_REQUEST,
	ORDER_SHIPPING_SUCCESS,
	ORDER_SHIPPING_FAIL,
	ORDER_DELIVERY_REQUEST,
	ORDER_DELIVERY_SUCCESS,
	ORDER_DELIVERY_FAIL
} from '../constants/orderConstants';

const orderCreateReducer = (state = {}, action: { type: any; payload: any }) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return { loading: true };
		case ORDER_CREATE_SUCCESS:
			return { loading: false, order: action.payload, success: true };
		case ORDER_CREATE_FAIL:
			return { loading: false, error: action.payload };
		// case ORDER_REMOVE_STATE:
		// 	return { loading: false, order: action.payload, success: false };
		default:
			return state;
	}
};

const orderDetailsReducer = (
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
			return { loading: false, order: action.payload };
		case ORDER_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

const myOrderListReducer = (
	state = {
		orders: []
	},
	action: { type: any; payload: any }
) => {
	switch (action.type) {
		case MY_ORDER_LIST_REQUEST:
			return { loading: true };
		case MY_ORDER_LIST_SUCCESS:
			return { loading: false, orders: action.payload };
		case MY_ORDER_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

const orderListReducer = (
	state = {
		orders: []
	},
	action: { type: any; payload: any }
) => {
	switch (action.type) {
		case ORDER_LIST_REQUEST:
			return { loading: true };
		case ORDER_LIST_SUCCESS:
			return { loading: false, orders: action.payload };
		case ORDER_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

const orderPayReducer = (
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
			return { loading: false, success: true };
		case ORDER_PAY_FAIL:
			return { loading: false, error: action.payload };
		case ORDER_REMOVE_STATE:
			return { loading: false, success: false };
		default:
			return state;
	}
};

const orderDeleteReducer = (
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
			return { loading: false, success: true };
		case ORDER_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

const orderRefundReducer = (state = {}, action: { type: any; payload: any }) => {
	switch (action.type) {
		case ORDER_REFUND_REQUEST:
			return { loading: true };
		case ORDER_REFUND_SUCCESS:
			return { loading: false, order: action.payload, success: true };
		case ORDER_REFUND_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

const orderShippingReducer = (state = {}, action: { type: any; payload: any }) => {
	switch (action.type) {
		case ORDER_SHIPPING_REQUEST:
			return { loading: true };
		case ORDER_SHIPPING_SUCCESS:
			return { loading: false, order: action.payload, success: true };
		case ORDER_SHIPPING_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

const orderDeliveryReducer = (state = {}, action: { type: any; payload: any }) => {
	switch (action.type) {
		case ORDER_DELIVERY_REQUEST:
			return { loading: true };
		case ORDER_DELIVERY_SUCCESS:
			return { loading: false, order: action.payload, success: true };
		case ORDER_DELIVERY_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	myOrderListReducer,
	orderListReducer,
	orderDeleteReducer,
	orderRefundReducer,
	orderShippingReducer,
	orderDeliveryReducer
};
