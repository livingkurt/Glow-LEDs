import { Cart } from '../models';
import { Log, Promo } from '../models';

export default {
	findAll: async (req: any, res: any) => {
		try {
			const category = req.query.category ? { category: req.query.category } : {};
			const searchKeyword = req.query.searchKeyword
				? {
						facebook_name: {
							$regex: req.query.searchKeyword,
							$options: 'i'
						}
					}
				: {};

			let sortOrder = {};
			if (req.query.sortOrder === 'glover name') {
				sortOrder = { artist_name: 1 };
			} else if (req.query.sortOrder === 'facebook name') {
				sortOrder = { facebook_name: 1 };
			} else if (req.query.sortOrder === 'song id') {
				sortOrder = { song_id: 1 };
			} else if (req.query.sortOrder === 'product') {
				sortOrder = { product: 1 };
			} else if (req.query.sortOrder === 'instagram handle') {
				sortOrder = { instagram_handle: 1 };
			} else if (req.query.sortOrder === 'release_date' || req.query.sortOrder === '') {
				sortOrder = { release_date: -1 };
			} else if (req.query.sortOrder === 'newest') {
				sortOrder = { _id: -1 };
			}

			const carts = await Cart.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder);

			res.send(carts);
		} catch (error) {
			console.log({ error });
			res.status(500).send({ error, message: 'Error Getting Carts' });
		}
	},
	findById: async (req: any, res: any) => {
		try {
			const cart = await Cart.findOne({ _id: req.params.id });
			console.log({ cart });
			console.log(req.params.id);
			if (cart) {
				res.send(cart);
			} else {
				res.status(404).send({ message: 'Cart Not Found.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Cart' });
		}
	},
	create: async (req: any, res: any) => {
		try {
			console.log({ body: req.body }); // const newCart = await Cart.create(req.body);
			// if (newCart) {

			// 	return res.status(201).send({ message: 'New Cart Created', data: newCart });
			// } else {

			// 	return res.status(500).send({ message: ' Error in Creating Cart.' });
			// }
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Creating Cart' });
		}
	},
	update: async (req: any, res: any) => {
		try {
			console.log({ cart_routes_put: req.body });
			const cart_id = req.params.id;
			const cart: any = await Cart.findById(cart_id);
			if (cart) {
				const updatedCart = await Cart.updateOne({ _id: cart_id }, req.body);
				if (updatedCart) {
					return res.status(200).send({ message: 'Cart Updated', data: updatedCart });
				}
			} else {
				return res.status(500).send({ message: ' Error in Updating Cart.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Cart' });
		}
	},
	remove: async (req: any, res: any) => {
		try {
			const message: any = { message: 'Cart Deleted' };
			const deleted_cart = await Cart.updateOne({ _id: req.params.id }, { deleted: true });
			if (deleted_cart) {
				res.send(message);
			} else {
				res.send('Error in Deletion.');
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Deleting Cart' });
		}
	}
};
