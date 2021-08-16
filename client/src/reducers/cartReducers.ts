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
import Cookie from 'js-cookie';
function roughSizeOfObject(object: any) {
	var objectList = [];
	var stack = object;
	var bytes = 0;

	while (stack.length) {
		var value = stack.pop();

		if (typeof value === 'boolean') {
			bytes += 4;
		} else if (typeof value === 'string') {
			bytes += value.length * 2;
		} else if (typeof value === 'number') {
			bytes += 8;
		} else if (typeof value === 'object' && objectList.indexOf(value) === -1) {
			objectList.push(value);

			for (var i in value) {
				stack.push(value[i]);
			}
		}
	}
	console.log({ bytes });
	return bytes;
}

export const cartReducer = (state = { cartItems: [] }, action: any) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;
			const item_exists: any = state.cartItems.find(
				(x: any) => JSON.stringify({ ...x, qty: null }) === JSON.stringify({ ...item, qty: null })
			);

			if (item_exists) {
				console.log('Added Existing Item');
				localStorage.setItem(
					'cartItems',
					JSON.stringify([
						...state.cartItems,
						state.cartItems.map(
							(x: any) =>
								JSON.stringify({ ...x, qty: null }) === JSON.stringify({ ...item_exists, qty: null })
									? item
									: x
						)
					])
				);
				roughSizeOfObject([
					...state.cartItems,
					state.cartItems.map(
						(x: any) =>
							JSON.stringify({ ...x, qty: null }) === JSON.stringify({ ...item_exists, qty: null })
								? item
								: x
					)
				]);
				return {
					...state,
					cartItems: state.cartItems.map(
						(x: any) =>
							JSON.stringify({ ...x, qty: null }) === JSON.stringify({ ...item_exists, qty: null })
								? item
								: x
					)
				};
			} else {
				console.log('Added Not Existing Item');
				roughSizeOfObject([ ...state.cartItems, item ]);
				localStorage.setItem('cartItems', JSON.stringify([ ...state.cartItems, item ]));
				return { ...state, cartItems: [ ...state.cartItems, item ] };
			}

		case CART_REMOVE_ITEM:
			// console.log({ cartItems: state.cartItems });
			// console.log({ payload: action.payload });
			return {
				...state,
				cartItems: state.cartItems.filter((x: any) => JSON.stringify(x) !== JSON.stringify(action.payload))
			};
		case CART_SAVE_SHIPPING:
			console.log({ shipping_reducer: action.payload });
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
