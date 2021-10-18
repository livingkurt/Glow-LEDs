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

			const item_exists: any = state.cartItems.find(
				(x: any) => JSON.stringify({ ...x, qty: null }) === JSON.stringify({ ...item, qty: null })
			);

			if (item_exists) {
				// console.log({ old_item: JSON.stringify(state.cartItems[0]) });
				// console.log({ removed_item: JSON.stringify(item) });
				console.log({ cartReducer_old_item: state.cartItems[0] });
				console.log({ cartReducer_removed_item: item });
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
				localStorage.setItem('cartItems', JSON.stringify([ ...state.cartItems, item ]));
				return { ...state, cartItems: [ ...state.cartItems, item ] };
			}

		case CART_REMOVE_ITEM:
			localStorage.setItem(
				'cartItems',
				JSON.stringify(state.cartItems.filter((x: any) => JSON.stringify(x) !== JSON.stringify(action.payload)))
			);
			return {
				...state,
				cartItems: state.cartItems.filter((x: any) => JSON.stringify(x) !== JSON.stringify(action.payload))
			};
		case CART_SAVE_SHIPPING:
			sessionStorage.setItem('shippingAddress', JSON.stringify(action.payload));
			return { ...state, shipping: action.payload, message: 'Cart Found' };
		case CART_SAVE_PAYMENT:
			return { ...state, payment: action.payload, message: 'Cart Found' };
		default:
			return state;
	}
};

export const cartListReducer = (state = { carts: [] }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CART_LIST_REQUEST:
			return { loading: true, carts: [] };
		case CART_LIST_SUCCESS:
			return { loading: false, carts: action.payload, message: 'Carts Found' };
		case CART_LIST_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const cartDetailsReducer = (state = { cart: { reviews: [] } }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CART_DETAILS_REQUEST:
			return { loading: true };
		case CART_DETAILS_SUCCESS:
			return { loading: false, cart: action.payload, message: 'Cart Found' };
		case CART_DETAILS_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const cartDeleteReducer = (state = { cart: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CART_DELETE_REQUEST:
			return { loading: true };
		case CART_DELETE_SUCCESS:
			return { loading: false, cart: action.payload, success: true, message: 'Cart Deleted' };
		case CART_DELETE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const cartSaveReducer = (state = { cart: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CART_SAVE_REQUEST:
			return { loading: true };
		case CART_SAVE_SUCCESS:
			return { loading: false, success: true, cart: action.payload, message: 'Cart Saved' };
		case CART_SAVE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};
