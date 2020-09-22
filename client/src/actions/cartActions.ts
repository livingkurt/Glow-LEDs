import Axios from 'axios';
import Cookie from 'js-cookie';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from '../constants/cartConstants';

const addToCart = (pathname: string, qty: number, diffuser_cap_color: string, diffuser_cap: any) => async (
	dispatch: (
		arg0: {
			type: string;
			payload: {
				product: object;
				secondary_product: string;
				name: string;
				display_image: string;
				diffuser_cap: any;
				diffuser_cap_name: string;
				diffuser_cap_color: string;
				price: number;
				sale_price: number;
				countInStock: number;
				volume: number;
				weight_pounds: number;
				weight_ounces: number;
				length: number;
				width: number;
				height: number;
				qty: number;
				pathname: number;
				category: string;
			};
		}
	) => void,
	getState: () => { cart: { cartItems: any } }
) => {
	try {
		console.log('Add To Cart Before');
		const { data } = await Axios.get('/api/products/' + pathname);

		console.log({ pathname, qty, diffuser_cap_color, diffuser_cap });
		console.log({ data });

		let cartItem: any = {
			product: data._id,
			name: data.name,
			display_image: data.images[0],
			price: data.price,
			sale_price: data.sale_price,
			countInStock: data.countInStock,
			volume: data.volume,
			weight_pounds: data.weight_pounds,
			weight_ounces: data.weight_ounces,
			length: data.length,
			width: data.width,
			height: data.volume,
			pathname: data.pathname,
			category: data.category,
			qty
		};
		if (diffuser_cap || diffuser_cap_color) {
			cartItem = {
				product: data._id,
				secondary_product: diffuser_cap._id ? diffuser_cap._id : '',
				name: data.name,
				display_image: data.images[0],
				diffuser_cap_color,
				diffuser_cap,
				diffuser_cap_name: diffuser_cap.name ? diffuser_cap.name : '',
				price: data.price,
				sale_price: data.sale_price,
				countInStock: data.countInStock,
				volume: data.volume,
				weight_pounds: data.weight_pounds,
				weight_ounces: data.weight_ounces,
				length: data.length,
				width: data.width,
				height: data.volume,
				pathname: data.pathname,
				category: data.category,
				qty
			};
		}
		dispatch({
			type: CART_ADD_ITEM,
			payload: cartItem
		});
		const { cart: { cartItems } } = getState();
		Cookie.set('cartItems', JSON.stringify(cartItems));
	} catch (error) {
		console.log({ error });
	}
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
	international: boolean;
	country: string;
}) => (dispatch: (arg0: { type: string; payload: any }) => void) => {
	dispatch({ type: CART_SAVE_SHIPPING, payload: data });
	Cookie.set('shipping', JSON.stringify(data));
};

const savePayment = (data: { paymentMethod: any }) => (dispatch: (arg0: { type: string; payload: any }) => void) => {
	dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};
export { addToCart, removeFromCart, saveShipping, savePayment };
