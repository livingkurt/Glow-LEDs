export {};
import express from 'express';
import User from '../models/user';
const { getToken, isAuth } = require('../util');
import bcrypt from 'bcryptjs';
import Product from '../models/product';
import Order from '../models/order';
require('dotenv');

const router = express.Router();

router.put('/users', async (req, res) => {
	const user = await User.updateMany(
		{},
		{
			// $rename: { shipping_price: 'volume' }
			$set: { deleted: false }
			// $unset: { shipping_price: 1 }
		}
	);
	res.send(user);

	// const users = await User.updateMany({}, { $set: { deleted: false } );
	// console.log(users);
	// res.send(users);
});

router.put('/products', async (req, res) => {
	// const products = await Product.find({});

	// for (let product of products) {
	// }
	// res.send(products);
	const product = await Product.updateMany({
		// $rename: { shipping_price: 'volume' }
		$set: { pathname: '' }
		// $unset: { shipping_price: 1 }
	});
	res.send(product);
});
router.get('/products', async (req, res) => {
	// const products = await Product.find({});

	// for (let product of products) {
	// }
	// res.send(products);
	const products = await Product.find();
	console.log({ products });
	console.log(products);
	let array = [];
	for (let product of products) {
		console.log(product);
		array.push(product);
	}
	res.send(array);
});

router.put('/orders', async (req, res) => {
	const order = await Order.updateMany({
		// $rename: { shipping_price: 'volume' }
		$set: { deleted: false }
		// $unset: { shipping_price: 1 }
	});
	res.send(order);
});

export default router;