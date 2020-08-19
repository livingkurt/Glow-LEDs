import Axios from 'axios';
import Cookie from 'js-cookie';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from '../constants/cartConstants';

const addToCart = (pathname: string, qty: number) => async (
	dispatch: (
		arg0: {
			type: string;
			payload: {
				product: object;
				name: string;
				display_image: string;
				price: number;
				sale_price: number;
				countInStock: number;
				volume: number;
				weight: number;
				length: number;
				width: number;
				height: number;
				qty: number;
				pathname: number;
				category: number;
			};
		}
	) => void,
	getState: () => { cart: { cartItems: any } }
) => {
	try {
		console.log('Add To Cart Before');
		const { data } = await Axios.get('/api/products/' + pathname);

		const { cart: { cartItems } } = getState();
		// const same_product = cartItems.find((item: any) => item.pathname === pathname);
		// qty = same_product ? qty + same_product.qty : qty;

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
				weight: data.weight,
				length: data.length,
				width: data.width,
				height: data.volume,
				pathname: data.pathname,
				category: data.category,
				qty
			}
		});
		const cart_item = [
			{
				product: data._id,
				name: data.name,
				display_image: data.display_image,
				price: data.price,
				sale_price: data.sale_price,
				countInStock: data.countInStock,
				volume: data.volume,
				weight: data.weight,
				length: data.length,
				width: data.width,
				height: data.volume,
				pathname: data.pathname,
				category: data.category,
				qty
			}
		];

		if (cartItems === []) {
			console.log('No Cart Items');
			// Cookie.set('cartItems', JSON.stringify(cart_item));
			Cookie.set('cartItems', JSON.stringify([ ...cart_item ]));
		}
		// else {
		// 	console.log('Yes Cart Items');
		// 	// Cookie.set('cartItems', JSON.stringify(cartItems));
		// 	Cookie.set('cartItems', JSON.stringify([ ...cartItems, ...cart_item ]));
		// }
		// Cookie.set('cartItems', JSON.stringify([ ...cartItems, ...cart_item ]));

		// console.log('Add To Cart After');
		console.log({ cartItems });
		console.log({ cart_item });
	} catch (error) {}
};

const removeFromCart = (productId: string) => (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { cart: { cartItems: object } }
) => {
	dispatch({ type: CART_REMOVE_ITEM, payload: productId });

	const { cart: { cartItems } } = getState();
	Cookie.set('cartItems', JSON.stringify(cartItems));
};
const saveShipping = (data: {
	first_name: string;
	last_name: string;
	address: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
}) => (dispatch: (arg0: { type: string; payload: any }) => void) => {
	dispatch({ type: CART_SAVE_SHIPPING, payload: data });
	Cookie.set('shipping', JSON.stringify(data));
};

const savePayment = (data: { paymentMethod: any }) => (dispatch: (arg0: { type: string; payload: any }) => void) => {
	dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};
export { addToCart, removeFromCart, saveShipping, savePayment };
