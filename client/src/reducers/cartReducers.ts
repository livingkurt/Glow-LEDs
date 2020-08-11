import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from '../constants/cartConstants';
import Cookie from 'js-cookie';

const cartReducer = (state = { cartItems: [], shipping: {}, payment: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;
			let product: any = state.cartItems.find((cart_item) => cart_item['product'] === item.product);
			if (product) {
				return {
					cartItems: state.cartItems.map(
						(cart_item) => (cart_item['product'] === product.product ? item : cart_item)
					)
				};
				// let product: any = state.cartItems.find((cart_item) => cart_item['product'] === item.product);
				// if (product) {
				// 	console.log({ cartReducer: product. });
				// 	return {
				// 		cartItems: state.cartItems.map(
				// 			(cart_item) =>
				// 				cart_item['product'] === product.product
				// 					? { ...item, qty: item.qty + product.qty }
				// 					: cart_item
				// 		)
				// 	};
				// return {
				// 	cartItems: state.cartItems.map(
				// 		(cart_item) =>
				// 			cart_item['product'] === product.product
				// 				? { ...item, qty: item.qty + product.product.qty }
				// 				: cart_item
				// 	)
				// };
				// return {
				// 	cartItems: state.cartItems.forEach(
				// 		(cart_item: any) =>
				// 			cart_item['product'] === product.product
				// 				? (cart_item.qty = item.qty + product.product.qty)
				// 				: cart_item
				// 	)
				// };
				// }
			}
			console.log({ cartItems: [ ...state.cartItems, item ] });
			// Cookie.set();
			Cookie.set('cartItems', JSON.stringify([ ...state.cartItems, item ]));
			return { cartItems: [ ...state.cartItems, item ] };
		case CART_REMOVE_ITEM:
			return { cartItems: state.cartItems.filter((cart_item) => cart_item['product'] !== action.payload) };
		case CART_SAVE_SHIPPING:
			return { ...state, shipping: action.payload };
		case CART_SAVE_PAYMENT:
			return { ...state, payment: action.payload };
		default:
			return state;
	}
};

export { cartReducer };
