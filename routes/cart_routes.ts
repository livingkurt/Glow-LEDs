export {};
import express from 'express';
import { Log } from '../models';
import Cart from '../models/cart';
import { log_error, log_request } from '../util';
const { isAuth, isAdmin } = require('../util');

const router = express.Router();

router.get('/', async (req, res) => {
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
			sortOrder = { glover_name: 1 };
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
		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Cart',
			data: carts,
			error: {}
		});
		res.send(carts);
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Cart',
			error
		});
	}
});

router.get('/:id', async (req, res) => {
	const cart = await Cart.findOne({ _id: req.params.id });
	console.log({ cart });
	console.log(req.params.id);
	if (cart) {
		res.send(cart);
	} else {
		res.status(404).send({ message: 'Cart Not Found.' });
	}
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
	console.log({ cart_routes_put: req.body });
	const cartId = req.params.id;
	const cart: any = await Cart.findById(cartId);
	if (cart) {
		const updatedCart = await Cart.updateOne({ _id: cartId }, req.body);
		if (updatedCart) {
			return res.status(200).send({ message: 'Cart Updated', data: updatedCart });
		}
	}
	return res.status(500).send({ message: ' Error in Updating Cart.' });
});

router.delete('/:id', isAuth, isAdmin, async (req: { params: { id: any } }, res: { send: (arg0: string) => void }) => {
	const cart = await Cart.findById(req.params.id);
	const updated_cart = { ...cart, deleted: true };
	const message: any = { message: 'Cart Deleted' };
	// const deleted_cart = await updated_cart.save();
	const deleted_cart = await Cart.updateOne({ _id: req.params.id }, { deleted: true });
	if (deleted_cart) {
		// await deletedCart.remove();
		res.send(message);
	} else {
		res.send('Error in Deletion.');
	}
});

router.post('/', async (req, res) => {
	const newCart = await Cart.create(req.body);
	if (newCart) {
		return res.status(201).send({ message: 'New Cart Created', data: newCart });
	}
	return res.status(500).send({ message: ' Error in Creating Cart.' });
});

// module.exports = router;
export default router;
