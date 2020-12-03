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
		{ category: 'diffuser_caps' },
		{
			// $rename: { shipping_price: 'volume' }
			$set: {
				description:
					'Take your light shows to a new dimension with Diffuser Caps! This new gloving tech puts patterns and designs on the outside of your glove to add a mesmerizing and unique effect to your lightshows. These Diffuser Adapters are the secret to the technology. Simply place the Diffuser Adapters (sold separately) on your microlight inside of the glove and then twist on the cap to the Diffuser Adapter from the outside of the glove! Diffuser caps are about the size of a classic dome diffuser. 15mm in Diameter. People will be speechless at your tracers and effects! 100% facemelt guarantee. Lights not included. Patent pending. The Diffuser Caps are compatible with the Mini Diffuser Caps purchased before 12/3/20. View the graphic below for visual representation of what we mean.'
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
router.put('/errors_test', async (req, res) => {
	try {
		const products = await Product.find({});
		if (products.length > 0) {
			res.send(products);
		} else {
			res.status(404).send('Products Not Found.');
		}
	} catch (error) {
		console.log({ error });
		res.send({ error });
	}
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

// // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
// router.put('/add_reviewed_false', async (req, res) => {
// 	// const orders = await Order.find({ createdAt: { $lte: new Date(), $gte: new Date(Date() + 14) } });
// 	const order = await Order.updateMany(
// 		{
// 			createdAt: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
// 		},
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				'orderItems.$.reviewed': false
// 			}
// 			// $unset: { shipping_price: 1 }
// 		},
// 		{ upsert: true }
// 	);
// 	console.log({ order });

// 	res.send(order);
// 	// console.log({ orders });
// 	// res.send(orders);
// });

// Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
router.put('/orders_remove_color_string_lights', async (req, res) => {
	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
	const order = await Order.updateMany(
		{ 'orderItems.category': 'glow_strings' },
		{
			// $rename: { shipping_price: 'volume' }
			$set: {
				'orderItems.$.diffuser_cap_color': ''
			}
			// $unset: { shipping_price: 1 }
		},
		{ upsert: true }
	);
	console.log({ order });
	res.send(order);
});

// Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
router.put('/orders_remove_color', async (req, res) => {
	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
	const order = await Order.updateMany(
		{ 'orderItems.category': 'frosted_diffusers' },
		{
			// $rename: { shipping_price: 'volume' }
			$set: {
				'orderItems.$.diffuser_cap_color': 'Translucent White'
			}
			// $unset: { shipping_price: 1 }
		},
		{ upsert: true }
	);
	console.log({ order });
	res.send(order);
});

// Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
router.put('/orders_remove_color_dome', async (req, res) => {
	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
	const order = await Order.updateMany(
		{ 'orderItems.name': 'Frosted Dome Diffusers' },
		{
			// $rename: { shipping_price: 'volume' }
			$set: {
				'orderItems.$.diffuser_cap_color': 'Translucent White'
			}
			// $unset: { shipping_price: 1 }
		},
		{ upsert: true }
	);
	console.log({ order });
	res.send(order);
});
// Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
router.put('/orders_remove_color_adapters', async (req, res) => {
	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
	const order = await Order.updateMany(
		{ 'orderItems.name': 'Diffuser Adapters (No Caps)' },
		{
			// $rename: { shipping_price: 'volume' }
			$set: {
				'orderItems.$.diffuser_cap_color': 'Translucent White'
			}
			// $unset: { shipping_price: 1 }
		},
		{ upsert: true }
	);
	console.log({ order });
	res.send(order);
});
// Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
router.put('/orders_remove_color_dome_15', async (req, res) => {
	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
	const order = await Order.updateMany(
		{ 'orderItems.name': 'Original 15mm Frosted Dome Diffusers' },
		{
			// $rename: { shipping_price: 'volume' }
			$set: {
				'orderItems.$.diffuser_cap_color': 'Translucent White',
				'orderItems.$.name': 'Frosted Dome Diffusers'
			}
			// $unset: { shipping_price: 1 }
		},
		{ upsert: true }
	);
	console.log({ order });
	res.send(order);
});

// Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
router.put('/orders_remove_color_large_domes', async (req, res) => {
	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
	const order = await Order.updateMany(
		{ 'orderItems.name': 'Large Frosted Dome Diffusers' },
		{
			// $rename: { shipping_price: 'volume' }
			$set: {
				'orderItems.$.diffuser_cap_color': 'Translucent White',
				'orderItems.$.name': 'Frosted Mega Dome Diffusers'
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
		{ 'orderItems.name': 'Mega Diffuser Caps + Adapters Starter Kit' },
		{
			// $rename: { shipping_price: 'volume' }
			$set: {
				'orderItems.$.diffuser_cap_color': 'Black',
				'orderItems.$.secondary_product': '5eff4ab907deec002a7c4392',
				'orderItems.$.category': 'mega_diffuser_caps'
			}
			// $unset: { shipping_price: 1 }
		},
		{ upsert: true }
	);
	console.log({ order });
	res.send(order);
});
router.put('/product_color', async (req, res) => {
	// const order = await Order.find({}, { diffuser_cap_color: 1 });
	const order = await Order.updateMany(
		{},
		{ diffuser_cap_color: 1 },
		{
			$rename: { diffuser_cap_color: 'product_color' }
		}
		// { upsert: true }
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
	//           $regex: 'Mega Diffuser Caps',
	//           $options: 'i'
	//         }
	//       }
	//     },
	//         {$set: {
	//           'orderItems.$.diffuser_cap_color': 'Black',
	//           'orderItems.$.category': 'mega_diffuser_caps'
	//         }}
	//     )
	// });
	diffuser_cap_color: 'Black';
	category: 'diffuser_caps';

	const order = await Order.updateMany(
		{
			'orderItems.name': {
				$regex: 'Mega Diffuser Caps',
				$options: 'i'
			}
		},
		{
			// $rename: { shipping_price: 'volume' }
			$set: {
				'orderItems.$.diffuser_cap_color': 'Black',
				'orderItems.$.category': 'mega_diffuser_caps'
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
// 		{ 'orderItems.name': 'Mega Diffuser Caps + Adapters Starter Kit' },
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
// 		{ 'orderItems.name': 'Mega Diffuser Caps + Adapters Starter Kit' },
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
