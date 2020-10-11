export {};
import express from 'express';
import User from '../models/user';
const { getToken, isAuth } = require('../util');
import bcrypt from 'bcryptjs';
import Product from '../models/product';
import Order from '../models/order';
import { Expense } from '../models';
require('dotenv');

const router = express.Router();

router.put('/users', async (req, res) => {
	const user = await User.updateMany(
		{},
		{
			// $rename: { shipping_price: 'volume' }
			$set: { email_subscription: true }
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
	const product = await Product.updateMany(
		{ category: 'frosted_diffusers' },
		{
			// $rename: { shipping_price: 'volume' }
			$set: {
				hidden: false
			}
			// $unset: { shipping_price: 1 }
		}
	);
	res.send(product);
});

router.put('/expenses', async (req, res) => {
	// const products = await Product.find({});

	// for (let product of products) {
	// }
	// res.send(products);
	const expenses = await Expense.updateMany(
		{ category: 'frosted_diffusers' },
		{
			// $rename: { shipping_price: 'volume' }
			$set: {
				expense_name: '',
				application: '',
				url: '',
				category: 'Supplies',
				place_of_purchase: 'Amazon',
				card: 'AMZNK',
				date_of_purchase: '',
				amount: 0,
				deleted: false
			}
			// $unset: { shipping_price: 1 }
		}
	);
	res.send(expenses);
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

// Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
router.put('/orders_remove_color', async (req, res) => {
	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
	const order = await Order.updateMany(
		{ 'orderItems.name': 'Serotonin Molecule Infinity Mirror' },
		{
			// $rename: { shipping_price: 'volume' }
			$set: {
				'orderItems.$.diffuser_cap_color': '',
				'orderItems.$.category': 'infinity_mirrors'
			}
			// $unset: { shipping_price: 1 }
		},
		{ upsert: true }
	);
	console.log({ order });
	res.send(order);
});

// Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
router.put('/orders_original', async (req, res) => {
	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
	const order = await Order.updateMany(
		{ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' },
		{
			// $rename: { shipping_price: 'volume' }
			$set: {
				'orderItems.$.diffuser_cap_color': 'Black',
				'orderItems.$.secondary_product': '5eff4ab907deec002a7c4392',
				'orderItems.$.category': 'diffuser_caps'
			}
			// $unset: { shipping_price: 1 }
		},
		{ upsert: true }
	);
	console.log({ order });
	res.send(order);
});
// Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
router.put('/orders_mini', async (req, res) => {
	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
	const order = await Order.updateMany(
		{ 'orderItems.name': 'Mini Diffuser Caps + Adapters Starter Kit' },
		{
			// $rename: { shipping_price: 'volume' }
			$set: {
				'orderItems.$.diffuser_cap_color': 'Black',
				'orderItems.$.secondary_product': '5eff4ab907deec002a7c4392',
				'orderItems.$.category': 'mini_diffuser_caps'
			}
			// $unset: { shipping_price: 1 }
		},
		{ upsert: true }
	);
	console.log({ order });
	res.send(order);
});
// Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
router.put('/orders_original_caps', async (req, res) => {
	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
	const order = await Order.updateMany(
		{
			'orderItems.name': {
				$regex: 'Diffuser Caps',
				$options: 'i'
			}
		},
		{
			// $rename: { shipping_price: 'volume' }
			$set: {
				// 'orderItems.$.diffuser_cap_color': 'Black',
				'orderItems.$.category': 'diffuser_caps'
			}
			// $unset: { shipping_price: 1 }
		},
		{ multi: true }
		// { upsert: true },
	);
	console.log({ order });
	res.send(order);
});
// Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
router.put('/orders_mini_caps', async (req, res) => {
	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });

	// const order = await   Order.find()
	// .forEach(function(item){
	//   Order.update(
	//     {
	//       orderItems: {
	//         name: item.name, {
	//           $regex: 'Mini Diffuser Caps',
	//           $options: 'i'
	//         }
	//       }
	//     },
	//         {$set: {
	//           'orderItems.$.diffuser_cap_color': 'Black',
	//           'orderItems.$.category': 'mini_diffuser_caps'
	//         }}
	//     )
	// });
	diffuser_cap_color: 'Black';
	category: 'diffuser_caps';

	const order = await Order.updateMany(
		{
			'orderItems.name': {
				$regex: 'Mini Diffuser Caps',
				$options: 'i'
			}
		},
		{
			// $rename: { shipping_price: 'volume' }
			$set: {
				'orderItems.$.diffuser_cap_color': 'Black',
				'orderItems.$.category': 'mini_diffuser_caps'
			}
			// $unset: { shipping_price: 1 }
		},
		{ multi: true }
		// { upsert: true }
	);
	console.log({ order });
	res.send(order);
});
// router.put('/orders_mini_caps', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	const order = await Order.updateMany(
// 		{ 'orderItems.name': 'Mini Diffuser Caps + Adapters Starter Kit' },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				'orderItems.$.diffuser_cap_color': 'Black',
// 				'orderItems.$.secondary_product': '5eff4ab907deec002a7c4392'
// 			}
// 			// $unset: { shipping_price: 1 }
// 		},
// 		{ upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });

// router.put('/orders_mini', async (req, res) => {
// 	const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	const order = await Order.updateMany(
// 		{ 'orderItems.name': 'Mini Diffuser Caps + Adapters Starter Kit' },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				'orderItems.$.secondary_product': 'Black'
// 			}
// 			// $unset: { shipping_price: 1 }
// 		},
// 		{ upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });

export default router;
