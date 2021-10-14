import { cart_db } from '../db';

export default {
	findAll_carts_s: async (query: any) => {
		try {
			const category = query.category ? { category: query.category } : {};
			const searchKeyword = query.searchKeyword
				? {
						facebook_name: {
							$regex: query.searchKeyword,
							$options: 'i'
						}
					}
				: {};

			const sortOrder = {};
			const filter = { deleted: false, ...category, ...searchKeyword };
			return await cart_db.findAll_carts_db(filter, sortOrder);
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
			console.log({ create_carts_s: body });
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
		const { cartItems, cartItem, user } = body;
		try {
			const item = cartItem;
			const item_exists: any = cartItems.find(
				(x: any) => JSON.stringify({ ...x, qty: null }) === JSON.stringify({ ...item, qty: null })
			);

			if (item_exists) {
				return await cart_db.update_carts_db(params.id, {
					user: user._id,
					cartItems: cartItems.map(
						(x: any) =>
							JSON.stringify({ ...x, qty: null }) === JSON.stringify({ ...item_exists, qty: null })
								? item
								: x
					)
				});
			} else {
				return await cart_db.update_carts_db(params.id, {
					user: user._id,
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

		try {
			const new_cartItems = {
				...cartItems,
				cartItems: cartItems.filter((x: any) => JSON.stringify(x) !== JSON.stringify(cartItem))
			};
			return await cart_db.update_carts_db(params.id, {
				user: userInfo._id,
				cartItems: [ ...new_cartItems ]
			});
		} catch (error) {
			console.log({ remove_cartitem_carts_s_error: error });
			throw new Error(error.message);
		}
	}
};
