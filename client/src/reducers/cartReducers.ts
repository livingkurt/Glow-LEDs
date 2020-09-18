import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from '../constants/cartConstants';
import Cookie from 'js-cookie';

const cartReducer = (state = { cartItems: [], shipping: {}, payment: {} }, action: { type: any; payload: any }) => {
	console.log('cartReducer');
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;
			let product: any = state.cartItems.find((cart_item: any) => cart_item.pathname === item.pathname);
			if (product) {
				return {
					cartItems: state.cartItems.map(
						(cart_item: any) => (cart_item.pathname === product.pathname ? item : cart_item)
					)
				};
			}
			return { cartItems: [ ...state.cartItems, item ] };
		case CART_REMOVE_ITEM:
			return { cartItems: state.cartItems.filter((cart_item: any) => cart_item.pathname !== action.payload) };
		case CART_SAVE_SHIPPING:
			return { ...state, shipping: action.payload };
		case CART_SAVE_PAYMENT:
			return { ...state, payment: action.payload };
		default:
			return state;
	}
};

export { cartReducer };
