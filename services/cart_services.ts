import { cart_db } from '../db';
import { deepEqual, determine_filter } from '../util';

export default {
	findAll_carts_s: async (query: any) => {
		try {
			const search = query.search
				? {
						facebook_name: {
							$regex: query.search,
							$options: 'i'
						}
					}
				: {};
			const filter = determine_filter(query, search);
			const sort = {};

			return await cart_db.findAll_carts_db(filter, sort);
		} catch (error) {
			console.log({ findAll_carts_s_error: error });
			throw new Error(error.message);
		}
	},
	findById_carts_s: async (params: any) => {
		try {
			return await cart_db.findById_carts_db(params.id);
		} catch (error) {
			console.log({ findById_carts_s_error: error });
			// throw new Error(error.message);
		}
	},
	findByUser_carts_s: async (params: any) => {
		try {
			return await cart_db.findByUser_carts_db(params.id);
		} catch (error) {
			console.log({ findById_carts_s_error: error });
			throw new Error(error.message);
		}
	},
	create_carts_s: async (body: any) => {
		const { cartItems, cartItem, userInfo } = body;
		try {
			const item = cartItem;
			const item_exists: any = cartItems.find(
				(x: any) => JSON.stringify({ ...x, qty: null }) === JSON.stringify({ ...item, qty: null })
			);

			if (item_exists) {
				return await cart_db.create_carts_db({
					user: userInfo._id,
					cartItems: cartItems.map(
						(x: any) =>
							JSON.stringify({ ...x, qty: null }) === JSON.stringify({ ...item_exists, qty: null })
								? item
								: x
					)
				});
			} else {
				return await cart_db.create_carts_db({ user: userInfo._id, cartItems: [ ...cartItems, item ] });
			}
		} catch (error) {
			console.log({ create_carts_s_error: error });
			throw new Error(error.message);
		}
	},
	update_carts_s: async (params: any, body: any) => {
		const { cartItems, cartItem, userInfo } = body;
		try {
			const item = cartItem;
			const item_exists: any = cartItems.find((x: any) =>
				deepEqual({ ...x, qty: null }, { ...cartItem, qty: null })
			);
			console.log({ item_exists });

			if (item_exists) {
				return await cart_db.update_carts_db(params.id, {
					user: userInfo._id,
					cartItems: cartItems.map(
						(x: any) => (deepEqual({ ...x, qty: null }, { ...cartItem, qty: null }) ? item : x)
					)
				});
			} else {
				return await cart_db.update_carts_db(params.id, {
					user: userInfo._id,
					cartItems: [ ...cartItems, item ]
				});
			}
		} catch (error) {
			console.log({ create_carts_s_error: error });
			throw new Error(error.message);
		}
	},
	remove_carts_s: async (params: any) => {
		try {
			return await cart_db.remove_carts_db(params.id);
		} catch (error) {
			console.log({ remove_carts_s_error: error });
			throw new Error(error.message);
		}
	},
	remove_cartitem_carts_s: async (params: any, body: any) => {
		const { cartItems, cartItem, userInfo } = body;
		// console.log({ old_cart: old_cart._id, userInfo: userInfo._id });
		console.log({ remove_cartitem_carts_s: cartItems, cartItem, userInfo });
		try {
			const new_cart_items = cartItems.filter((x: any) => JSON.stringify(x) !== JSON.stringify(cartItem));
			console.log({ new_cart_items });
			return await cart_db.update_carts_db(params.id, {
				user: userInfo._id,
				cartItems: [ ...new_cart_items ]
			});
		} catch (error) {
			console.log({ remove_cartitem_carts_s_error: error });
			throw new Error(error.message);
		}
	}
};
