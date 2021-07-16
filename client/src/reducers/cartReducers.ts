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
	CART_DELETE_REQUEST,
	CART_DELETE_SUCCESS,
	CART_DELETE_FAIL
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action: any) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;
			const existItem: any = state.cartItems.find((x: any) => JSON.stringify(x) === JSON.stringify(item));
			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map(
						(x: any) => (JSON.stringify(x) === JSON.stringify(existItem) ? item : x)
					)
				};
			} else {
				return { ...state, cartItems: [ ...state.cartItems, item ] };
			}
		case CART_REMOVE_ITEM:
			console.log({ cartItems: state.cartItems });
			console.log({ payload: action.payload });
			return {
				...state,
				cartItems: state.cartItems.filter((x: any) => JSON.stringify(x) !== JSON.stringify(action.payload))
			};
		case CART_SAVE_SHIPPING:
			return { ...state, shipping: action.payload };
		case CART_SAVE_PAYMENT:
			return { ...state, payment: action.payload };
		default:
			return state;
	}
};

export const cartListReducer = (state = { carts: [] }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CART_LIST_REQUEST:
			return { loading: true, carts: [] };
		case CART_LIST_SUCCESS:
			return { loading: false, carts: action.payload };
		case CART_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const cartDetailsReducer = (state = { cart: { reviews: [] } }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CART_DETAILS_REQUEST:
			return { loading: true };
		case CART_DETAILS_SUCCESS:
			return { loading: false, cart: action.payload };
		case CART_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const cartDeleteReducer = (state = { cart: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CART_DELETE_REQUEST:
			return { loading: true };
		case CART_DELETE_SUCCESS:
			return { loading: false, cart: action.payload, success: true };
		case CART_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const cartSaveReducer = (state = { cart: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CART_SAVE_REQUEST:
			return { loading: true };
		case CART_SAVE_SUCCESS:
			return { loading: false, success: true, cart: action.payload };
		case CART_SAVE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
