import Axios from 'axios';
import Cookie from 'js-cookie';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from '../constants/cartConstants';

const addToCart = (productId: string, qty: number) => async (
	dispatch: (
		arg0: {
			type: string;
			payload: {
				product: any;
				name: any;
				display_image: any;
				price: any;
				sale_price: any;
				countInStock: any;
				volume: any;
				qty: number;
			};
		}
	) => void,
	getState: () => { cart: { cartItems: any } }
) => {
	try {
		const { data } = await Axios.get('/api/products/' + productId);
		dispatch({
			type: CART_ADD_ITEM,
			payload: {
				product: data._id,
				name: data.name,
				display_image: data.display_image,
				price: data.price,
				sale_price: data.sale_price,
				countInStock: data.countInStock,
				volume: data.volume,
				qty
			}
		});
		const { cart: { cartItems } } = getState();
		Cookie.set('cartItems', JSON.stringify(cartItems));
	} catch (error) {}
};
const removeFromCart = (productId: any) => (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { cart: { cartItems: any } }
) => {
	dispatch({ type: CART_REMOVE_ITEM, payload: productId });

	const { cart: { cartItems } } = getState();
	Cookie.set('cartItems', JSON.stringify(cartItems));
};
const saveShipping = (data: { address: any; city: any; state: any; postalCode: any; country: any }) => (
	dispatch: (arg0: { type: string; payload: any }) => void
) => {
	dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};
const savePayment = (data: { paymentMethod: any }) => (dispatch: (arg0: { type: string; payload: any }) => void) => {
	dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};
export { addToCart, removeFromCart, saveShipping, savePayment };
