export {};
import express from 'express';
import { Affiliate, Email, Expense, Feature, Content, Product, Order, User, Paycheck } from '../models';
const bcrypt = require('bcryptjs');
require('dotenv');
const { isAuth, isAdmin } = require('../util');

const router = express.Router();

router.put('/users', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ users: req.body });
		const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
		let parameter: any = {};
		if (search_parameter_field && search_parameter) {
			parameter = { [search_parameter_field]: search_parameter };
		}
		if (method === 'updateMany') {
			const users = await User.updateMany(parameter, {
				[action]: { [property]: value }
			});
			console.log({ users });
			res.send(users);
		} else {
			const users = await User.find(parameter);
			console.log({ users_get: users });
			res.send(users);
		}
	} catch (error) {
		console.log({ error });
	}
});
router.put('/expenses', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ expenses: req.body });
		const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
		let parameter: any = {};
		if (search_parameter_field && search_parameter) {
			parameter = { [search_parameter_field]: search_parameter };
		}
		if (method === 'updateMany') {
			const expenses = await Expense.updateMany(parameter, {
				[action]: { [property]: value }
			});
			console.log({ expenses });
			res.send(expenses);
		} else {
			const expenses = await Expense.find(parameter);
			console.log({ expenses_get: expenses });
			res.send(expenses);
		}
	} catch (error) {
		console.log({ error });
	}
});
router.put('/products', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ products: req.body });
		const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
		let parameter: any = {};
		if (search_parameter_field && search_parameter) {
			parameter = { [search_parameter_field]: search_parameter };
		}
		if (method === 'updateMany') {
			const products = await Product.updateMany(parameter, {
				[action]: { [property]: value }
			});
			console.log({ products });
			res.send(products);
		} else {
			const products = await Product.find(parameter);
			console.log({ products_get: products });
			res.send(products);
		}
	} catch (error) {
		console.log({ error });
	}
});
// Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
router.put('/product_sale_price', async (req, res) => {
	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
	const products = await Product.find({});
	console.log({ discount_percentage: req.body.discount_percentage });

	products.forEach(async (product: any) => {
		const discount = product.price * req.body.discount_percentage;
		console.log({ discount });
		product.sale_price = product.price - discount;
		const result = await product.save();
		// console.log({ result });
	});
	// console.log({ products });
	res.send(products);
});

router.put('/features', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ features: req.body });
		const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
		let parameter: any = {};
		if (search_parameter_field && search_parameter) {
			parameter = { [search_parameter_field]: search_parameter };
		}
		if (method === 'updateMany') {
			const features = await Feature.updateMany(parameter, {
				[action]: { [property]: value }
			});
			console.log({ features });
			res.send(features);
		} else {
			const features = await Feature.find(parameter);
			console.log({ features_get: features });
			res.send(features);
		}
	} catch (error) {
		console.log({ error });
	}
});
router.put('/orders', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ orders: req.body });
		const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
		let parameter: any = {};
		if (search_parameter_field && search_parameter) {
			parameter = { [search_parameter_field]: search_parameter };
		}
		if (method === 'updateMany') {
			const orders = await Order.updateMany(parameter, {
				[action]: { [property]: value }
			});
			console.log({ orders });
			res.send(orders);
		} else {
			const orders = await Order.find(parameter);
			console.log({ orders_get: orders });
			res.send(orders);
		}
	} catch (error) {
		console.log({ error });
	}
});
router.put('/emails', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ emails: req.body });
		const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
		let parameter: any = {};
		if (search_parameter_field && search_parameter) {
			parameter = { [search_parameter_field]: search_parameter };
		}
		if (method === 'updateMany') {
			const emails = await Email.updateMany(parameter, {
				[action]: { [property]: value }
			});
			console.log({ emails });
			res.send(emails);
		} else {
			const emails = await Email.find(parameter);
			console.log({ emails_get: emails });
			res.send(emails);
		}
	} catch (error) {
		console.log({ error });
	}
});
router.put('/affiliates', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ affiliates: req.body });
		const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
		let parameter: any = {};
		if (search_parameter_field && search_parameter) {
			parameter = { [search_parameter_field]: search_parameter };
		}
		if (method === 'updateMany') {
			const affiliates = await Affiliate.updateMany(parameter, {
				[action]: { [property]: value }
			});
			console.log({ affiliates });
			res.send(affiliates);
		} else {
			const affiliates = await Affiliate.find(parameter);
			console.log({ affiliates_get: affiliates });
			res.send(affiliates);
		}
	} catch (error) {
		console.log({ error });
	}
});
router.put('/contents', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ contents: req.body });
		const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
		let parameter: any = {};
		if (search_parameter_field && search_parameter) {
			parameter = { [search_parameter_field]: search_parameter };
		}
		if (method === 'updateMany') {
			const contents = await Content.updateMany(parameter, {
				[action]: { [property]: value }
			});
			console.log({ contents });
			res.send(contents);
		} else {
			const contents = await Content.find(parameter);
			console.log({ contents_get: contents });
			res.send(contents);
		}
	} catch (error) {
		console.log({ error });
	}
});
router.put('/paychecks', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ paychecks: req.body });
		const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
		let parameter: any = {};
		if (search_parameter_field && search_parameter) {
			parameter = { [search_parameter_field]: search_parameter };
		}
		if (method === 'updateMany') {
			const paychecks = await Paycheck.updateMany(parameter, {
				[action]: { [property]: value }
			});
			console.log({ paychecks });
			res.send(paychecks);
		} else {
			const paychecks = await Paycheck.find(parameter);
			console.log({ paychecks_get: paychecks });
			res.send(paychecks);
		}
	} catch (error) {
		console.log({ error });
	}
});

// router.get('/address_1', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	// const order = await Order.updateMany(
// 	//   {},{$rename:
// 	//     {shipping: { address: 'address_1' }},
// 	// }

// 	// );
// 	const order = await Order.updateMany(
// 		{
// 			// 'orderItems.name': {
// 			// 	$regex: 'Diffuser Caps',
// 			// 	$options: 'i'
// 			// }
// 		},
// 		{
// 			$set: {
// 				'shipping.address_2': '',
// 				'shipping.shipping_rate': {},
// 				'shipping.shipment_id': ''
// 			}
// 		},
// 		// {
// 		// 	$rename: {
// 		// 		'shipping.address': 'shipping.address_1'
// 		// 	}
// 		// },
// 		{ multi: true }
// 		// { upsert: true },
// 	);
// 	console.log({ order });
// 	res.send(order);
// });
// router.get('/address_1', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	// const order = await Order.updateMany(
// 	//   {},{$rename:
// 	//     {shipping: { address: 'address_1' }},
// 	// }

// 	// );
// 	const order = await Order.updateMany(
// 		{
// 			// 'orderItems.name': {
// 			// 	$regex: 'Diffuser Caps',
// 			// 	$options: 'i'
// 			// }
// 		},
// 		{
// 			$set: {
// 				'shipping.address_2': '',
// 				'shipping.shipping_rate': {},
// 				'shipping.shipment_id': ''
// 			}
// 		},
// 		// {
// 		// 	$rename: {
// 		// 		'shipping.address': 'shipping.address_1'
// 		// 	}
// 		// },
// 		{ multi: true }
// 		// { upsert: true },
// 	);
// 	console.log({ order });
// 	res.send(order);
// });

// router.put('/products', async (req, res) => {
// 	// const products = await Product.find({});
// 	// for (let product of products) {
// 	// }
// 	// res.send(products);
// 	const product = await Product.updateMany(
// 		{ category: 'diffuser_caps' },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				description:
// 					'Take your light shows to a new dimension with Diffuser Caps! This new gloving tech puts patterns and designs on the outside of your glove to add a mesmerizing and unique effect to your lightshows. These Diffuser Adapters are the secret to the technology. Simply place the Diffuser Adapters (sold separately) on your microlight inside of the glove and then twist on the cap to the Diffuser Adapter from the outside of the glove! Diffuser caps are about the size of a classic dome diffuser. 15mm in Diameter. People will be speechless at your tracers and effects! 100% facemelt guarantee. Lights not included. Patent pending. The Diffuser Caps are compatible with the Mini Diffuser Caps purchased before 12/3/20. View the graphic below for visual representation of what we mean.'
// 			}
// 			// $unset: { shipping_price: 1 }
// 		}
// 	);
// 	res.send(product);
// });

// router.put('/expenses', async (req, res) => {
// 	// const products = await Product.find({});

// 	// for (let product of products) {
// 	// }
// 	// res.send(products);
// 	const expenses = await Expense.updateMany(
// 		{ category: 'frosted_diffusers' },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				expense_name: '',
// 				application: '',
// 				url: '',
// 				category: 'Supplies',
// 				place_of_purchase: 'Amazon',
// 				card: 'AMZNK',
// 				date_of_purchase: '',
// 				amount: 0,
// 				deleted: false
// 			}
// 			// $unset: { shipping_price: 1 }
// 		}
// 	);
// 	res.send(expenses);
// });
// router.put('/errors_test', async (req, res) => {
// 	try {
// 		const products = await Product.find({});
// 		if (products.length > 0) {
// 			res.send(products);
// 		} else {
// 			res.status(404).send('Products Not Found.');
// 		}
// 	} catch (error) {
// 		console.log({ error });
// 		res.send({ error });
// 	}
// });

// router.get('/products', async (req, res) => {
// 	// const products = await Product.find({});

// 	// for (let product of products) {
// 	// }
// 	// res.send(products);
// 	const products = await Product.find();
// 	console.log({ products });
// 	console.log(products);
// 	let array = [];
// 	for (let product of products) {
// 		console.log(product);
// 		array.push(product);
// 	}
// 	res.send(array);
// });

// // // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
// // router.put('/add_reviewed_false', async (req, res) => {
// // 	// const orders = await Order.find({ createdAt: { $lte: new Date(), $gte: new Date(Date() + 14) } });
// // 	const order = await Order.updateMany(
// // 		{
// // 			createdAt: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
// // 		},
// // 		{
// // 			// $rename: { shipping_price: 'volume' }
// // 			$set: {
// // 				'orderItems.$.reviewed': false
// // 			}
// // 			// $unset: { shipping_price: 1 }
// // 		},
// // 		{ upsert: true }
// // 	);
// // 	console.log({ order });

// // 	res.send(order);
// // 	// console.log({ orders });
// // 	// res.send(orders);
// // });

// // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
// router.put('/orders_remove_color_string_lights', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	const order = await Order.updateMany(
// 		{ 'orderItems.category': 'glow_strings' },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				'orderItems.$.diffuser_cap_color': ''
// 			}
// 			// $unset: { shipping_price: 1 }
// 		},
// 		{ upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });

// // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
// router.put('/orders_remove_color', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	const order = await Order.updateMany(
// 		{ 'orderItems.category': 'frosted_diffusers' },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				'orderItems.$.diffuser_cap_color': 'Translucent White'
// 			}
// 			// $unset: { shipping_price: 1 }
// 		},
// 		{ upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });

// // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
// router.put('/orders_remove_color_dome', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	const order = await Order.updateMany(
// 		{ 'orderItems.name': 'Frosted Dome Diffusers' },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				'orderItems.$.diffuser_cap_color': 'Translucent White'
// 			}
// 			// $unset: { shipping_price: 1 }
// 		},
// 		{ upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });
// // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
// router.put('/orders_remove_color_adapters', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	const order = await Order.updateMany(
// 		{ 'orderItems.name': 'Diffuser Adapters (No Caps)' },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				'orderItems.$.diffuser_cap_color': 'Translucent White'
// 			}
// 			// $unset: { shipping_price: 1 }
// 		},
// 		{ upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });
// // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
// router.put('/orders_remove_color_dome_15', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	const order = await Order.updateMany(
// 		{ 'orderItems.name': 'Original 15mm Frosted Dome Diffusers' },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				'orderItems.$.diffuser_cap_color': 'Translucent White',
// 				'orderItems.$.name': 'Frosted Dome Diffusers'
// 			}
// 			// $unset: { shipping_price: 1 }
// 		},
// 		{ upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });

// // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
router.put('/remove_private_code', async (req, res) => {
	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
	const order = await Affiliate.updateMany(
		{},
		{
			// // $rename: { shipping_price: 'volume' }
			// $set: {
			// 	'orderItems.$.diffuser_cap_color': 'Translucent White',
			// 	'orderItems.$.name': 'Frosted Mega Dome Diffusers'
			// }
			$unset: { private_code: 1 }
		},
		{ upsert: true }
	);
	console.log({ order });
	res.send(order);
});

// // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
// router.put('/orders_original', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	const order = await Order.updateMany(
// 		{ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				'orderItems.$.diffuser_cap_color': 'Black',
// 				'orderItems.$.secondary_product': '5eff4ab907deec002a7c4392',
// 				'orderItems.$.category': 'diffuser_caps'
// 			}
// 			// $unset: { shipping_price: 1 }
// 		},
// 		{ upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });
// // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
// router.put('/orders_mini', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	const order = await Order.updateMany(
// 		{ 'orderItems.name': 'Mega Diffuser Caps + Adapters Starter Kit' },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				'orderItems.$.diffuser_cap_color': 'Black',
// 				'orderItems.$.secondary_product': '5eff4ab907deec002a7c4392',
// 				'orderItems.$.category': 'mega_diffuser_caps'
// 			}
// 			// $unset: { shipping_price: 1 }
// 		},
// 		{ upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });
// router.put('/product_color', async (req, res) => {
// 	// const order = await Order.find({}, { diffuser_cap_color: 1 });
// 	const order = await Order.updateMany(
// 		{},
// 		{ diffuser_cap_color: 1 },
// 		{
// 			$rename: { diffuser_cap_color: 'product_color' }
// 		}
// 		// { upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });
// // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
router.put('/order_items_color', async (req, res) => {
	const orders = await Order.find({});

	orders.forEach(async (doc: any) => {
		// console.log({ doc });
		// For each object in the current document's array
		for (let i = 0; i < doc.orderItems.length; ++i) {
			// Create the new field
			doc.orderItems[i].color = doc.orderItems[i].diffuser_cap_color;

			// Delete the old field
			// delete doc.orderItems[i].diffuser_cap_color;
			doc.orderItems[i].diffuser_cap_color = undefined;
		}

		// Update the document
		await Order.update(
			// Only the current document
			{ _id: doc._id },
			// The updated document (as per the statements in the above "for" loop)
			doc
		);
	});

	res.send(orders);
});
// router.put('/order_items_color', async (req, res) => {
// 	// // const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	// const order = await Order.updateMany(
// 	// 	{},
// 	// 	{
// 	// 		$rename: { 'orderItems.$.diffuser_cap_color': 'color' }
// 	// 		// $set: {
// 	// 		// 	// 'orderItems.$.diffuser_cap_color': 'Black',
// 	// 		// 	'orderItems.$.category': 'diffuser_caps'
// 	// 		// }
// 	// 		// $unset: { shipping_price: 1 }
// 	// 	},
// 	// 	{ multi: true }
// 	// 	// { upsert: true },
// 	// );
// 	// console.log({ order });
// 	// res.send(order);
// 	const orders = await Order.updateMany({}, [
// 		{
// 			$set: {
// 				'orderItems.diffuser_cap_color': {
// 					$map: {
// 						input: '$orderItems',
// 						as: 'file',
// 						in: [...'$orderItems', {color: '$$file.diffuser_cap_color'}]
// 					}
// 				}
// 			}
// 		}
// 	]);
// 	res.send(orders);
// });
router.get('/order_items_color', async (req, res) => {
	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
	const order = await Order.find({});
	console.log({ order });
	res.send(order);
});
// // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
// router.put('/orders_mini_caps', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });

// 	// const order = await   Order.find()
// 	// .forEach(function(item){
// 	//   Order.update(
// 	//     {
// 	//       orderItems: {
// 	//         name: item.name, {
// 	//           $regex: 'Mega Diffuser Caps',
// 	//           $options: 'i'
// 	//         }
// 	//       }
// 	//     },
// 	//         {$set: {
// 	//           'orderItems.$.diffuser_cap_color': 'Black',
// 	//           'orderItems.$.category': 'mega_diffuser_caps'
// 	//         }}
// 	//     )
// 	// });
// 	diffuser_cap_color: 'Black';
// 	category: 'diffuser_caps';

// 	const order = await Order.updateMany(
// 		{
// 			'orderItems.name': {
// 				$regex: 'Mega Diffuser Caps',
// 				$options: 'i'
// 			}
// 		},
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				'orderItems.$.diffuser_cap_color': 'Black',
// 				'orderItems.$.category': 'mega_diffuser_caps'
// 			}
// 			// $unset: { shipping_price: 1 }
// 		},
// 		{ multi: true }
// 		// { upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });
// // router.put('/orders_mini_caps', async (req, res) => {
// // 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// // 	const order = await Order.updateMany(
// // 		{ 'orderItems.name': 'Mega Diffuser Caps + Adapters Starter Kit' },
// // 		{
// // 			// $rename: { shipping_price: 'volume' }
// // 			$set: {
// // 				'orderItems.$.diffuser_cap_color': 'Black',
// // 				'orderItems.$.secondary_product': '5eff4ab907deec002a7c4392'
// // 			}
// // 			// $unset: { shipping_price: 1 }
// // 		},
// // 		{ upsert: true }
// // 	);
// // 	console.log({ order });
// // 	res.send(order);
// // });

// router.put('/all_chips', async (req, res) => {
// 	// const orders = await Product.find({ category: 'frosted_diffusers' });
// 	const order = await Product.updateMany(
// 		{ category: 'mega_diffuser_caps' },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				chips: [ '60203602dcf28a002a1a62ed' ]
// 			}
// 			// $unset: { shipping_price: 1 }
// 		},
// 		{ upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });
router.put('/emails_lowercase', async (req, res) => {
	const users = await User.find({ email: { $exists: true } });
	users.forEach(async (user: any) => {
		const userss: any = await User.findOne({ _id: user._id });
		const updated_user: any = new User(userss);
		// Check if user exists
		if (userss.email !== userss.email.toLowerCase()) {
			console.log('Yes Uppercase');
			console.log({ original: userss.email, lower: userss.email.toLowerCase() });
			const same_user: any = await User.findOne({ email: userss.email.toLowerCase() });
			if (!same_user) {
				console.log('No Same User');

				updated_user.email = updated_user.email.toLowerCase();
				await updated_user.save();
			} else if (same_user) {
				console.log('Yes Same User');
				console.log({ same_user });
				const orders: any = await Order.find({ user: updated_user._id });
				orders.forEach(async (order: any) => {
					// const orderss: any = await Order.findOne({ _id: order._id });
					console.log('Order Change User');
					const updated_order: any = new Order(order);
					updated_order.shipping.email = same_user.email;
					updated_order.user = same_user._id;
					updated_order.save();
				});
				console.log('Delete User');
				updated_user.deleted = true;
				await updated_user.save();
			}
		}
	});
	res.send('Done');
});
// router.put('/pathnames', async (req, res) => {
// 	// const orders = await Product.find({ category: 'frosted_diffusers' });
// 	const order = await Order.updateMany(
// 		{ 'orderItems.$.pathname': { $exists: false } },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				'orderItems.$.pathname': 'product'
// 			}
// 			// $unset: { shipping_price: 1 }
// 		}
// 		// { upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });
router.put('/find_duplicates', async (req, res) => {
	// const users = await User.aggregate([
	// 	{
	// 		$group: {
	// 			_id: { email: '$email' },
	// 			uniqueIds: { $addToSet: '$_id' },
	// 			count: { $sum: 1 }
	// 		}
	// 	},
	// 	{
	// 		$match: {
	// 			count: { $gt: 1 }
	// 		}
	// 	},
	// 	{
	// 		$sort: {
	// 			count: -1
	// 		}
	// 	}
	// ]);
	const users = await User.find({ email: { $exists: true } });
	var valueArr = users.map((item: any) => item.email).sort();
	console.log({ valueArr });
	var isDuplicate = valueArr.some((item, idx) => {
		return valueArr.indexOf(item) != idx;
	});
	console.log({ valueArr });
	res.send(valueArr);
});
router.put('/find_orders_by_email', async (req, res) => {
	const orders = await Order.find({ deleted: false, 'shipping.email': 'dthibodeauj@gmail.com' });

	res.send(orders);
});

router.put('/guest_order_user_creation', async (req, res) => {
	try {
		const orders = await Order.find({ guest: true, user: { $exists: false } });
		orders.forEach(async (order: any) => {
			const updated_order: any = await Order.findOne({ _id: order._id });
			const user_lowercase: any = await User.findOne({
				email: updated_order.shipping.email.toLowerCase().trim()
			});
			// const user_uppercase: any = await User.findOne({ email: updated_order.shipping.email });
			// if (user_lowercase && user_uppercase) {
			// 	user_uppercase.email = 'bad_' + user_uppercase.email;
			// 	user_uppercase.deleted = true;
			// 	await user_uppercase.save();
			// } else
			// console.log({ user_lowercase: user_lowercase.email });
			// console.log({ user_uppercase: user_uppercase.email });
			if (!user_lowercase) {
				console.log('User Lowercase Not Exists');
				const newUser: any = new User({
					first_name: updated_order.shipping.first_name,
					last_name: updated_order.shipping.last_name,
					email: updated_order.shipping.email.toLowerCase().trim(),
					password: 'fevjYt-7gucfu-kozgog',
					is_affiliated: false,
					email_subscription: true,
					isAdmin: false,
					isVerified: true
				});

				bcrypt.genSalt(10, (err: any, salt: any) => {
					bcrypt.hash(req.body.password, salt, async (err: any, hash: any) => {
						if (err) throw err;
						newUser.password = hash;

						// console.log({ newUser, user });
						// if (!user) {
						console.log('No User');
						try {
							const user: any = await User.findOne({ email: newUser.email });
							console.log({ user, newUser });
							if (!user) {
								await newUser.save();
							}
						} catch (error) {
							console.log({ error_user: error });
						}

						// console.log({ before_no_user: updated_order });
						try {
							updated_order.user = newUser._id;
							updated_order.shipping.email = newUser.email;
							// console.log({ after_no_user: updated_order });
							await updated_order.save();
						} catch (error) {
							console.log({ error_order_no_user_lowercase: error });
						}

						// await newUser
						// 	.save()
						// 	.then(async (newUser: any) => {
						// 		updated_order.user = newUser._id;
						// 		updated_order.shipping.email = newUser.email;
						// 		console.log({ updated_order });
						// 		await updated_order.save();
						// 		// res.json(newUser);
						// 	})
						// 	.catch((err: any) => {
						// 		console.log({ err });
						// 		console.log({ message: 'Error Registering User' });
						// 		// res.status(500).json({ message: 'Error Registering User' });
						// 	});
						// }
						// else if (user) {
						// 	console.log('User');
						// 	// console.log({ user });
						// 	// updated_order.user = user_lowercase._id;
						// 	// updated_order.shipping.email = user_lowercase.email.trim();
						// 	// console.log({ updated_order });
						// 	// await updated_order.save();
						// 	// return;
						// }

						// res.status(202).send({ message: 'Password Saved', data: user });
					});
				});
			} else if (user_lowercase) {
				console.log('User Lowercase Exists');
				// // Just add the user to the updated_order without creating the user
				// updated_order.user = user_lowercase._id;
				// updated_order.shipping.email = user_lowercase.email.trim();
				// console.log({ updated_order });
				// await updated_order.save();
				try {
					const user: any = await User.findOne({ email: updated_order.shipping.email.toLowerCase().trim() });
					// console.log({ before_yes_user: updated_order });
					updated_order.user = user._id;
					updated_order.shipping.email = user.email;
					// console.log({ after_yes_user: updated_order });
					await updated_order.save();
				} catch (error) {
					console.log({ error_order_user_lowercase: error });
				}
			}
		});
		res.status(202).send({ message: 'Done' });
	} catch (error) {
		console.log({ error_overall: error });
	}
});
// router.put('/guest_order_user_creation', async (req, res) => {
// 	try {
// 		const order = await Order.findOne({ guest: true, user: { $exists: false } });
// 		const user = User.findOne({ email: order.shipping.email });
// 		// Check if user exists
// 		if (user) {
// 			return res.status(404).json({ message: 'Email Exists found' });
// 		} else {
// 			// orders.forEach(async (order: any) => {
// 			const newUser: any = new User({
// 				first_name: order.shipping.first_name,
// 				last_name: order.shipping.last_name,
// 				email: order.shipping.email,
// 				password: 'fevjYt-7gucfu-kozgog',
// 				is_affiliated: false,
// 				email_subscription: true,
// 				isAdmin: false,
// 				isVerified: true
// 			});
// 			console.log({ newUser });
// 			bcrypt.genSalt(10, (err: any, salt: any) => {
// 				bcrypt.hash(req.body.password, salt, async (err: any, hash: any) => {
// 					if (err) throw err;
// 					newUser.password = hash;
// 					await newUser
// 						.save()
// 						.then(async (newUser: any) => {
// 							order.user = newUser._id;
// 							console.log({ order });
// 							await order.save();
// 							res.json(newUser);
// 						})
// 						.catch((err: any) => {
// 							console.log({ err });
// 							res.status(500).json({ message: 'Error Registering User' });
// 						});
// 					// res.status(202).send({ message: 'Password Saved', data: user });
// 				});
// 			});
// 		}

// 		// 	// Hash password before saving in database
// 		// 	bcrypt.genSalt(10, (err: any, salt: any) => {
// 		// 		bcrypt.hash(newUser.password, salt, async (err: any, hash: any) => {
// 		// 			if (err) throw err;
// 		// 			newUser.password = hash;
// 		// 			// const user = newUser.save();
// 		// 			console.log({ newUser });
// 		// 			// order.user = user._id;
// 		// 			// const saved_order = order.save();
// 		// 			// const orders = await Order.updateOne({ _id: order._id }, { ...order, user: user._id });
// 		// 			res.json(newUser);
// 		// 			// .catch((err: any) => {
// 		// 			// 	res.status(500).json({ message: 'Error Registering User' });
// 		// 			// });
// 		// 		});
// 		// 	});
// 		// });

// 		// // console.log({ orders });
// 		// res.send(newUser);
// 	} catch (error) {
// 		console.log({ error });
// 	}
// });
// router.put('/guest_order_user_creation', async (req, res) => {
// 	try {
// 		const orders = await Order.find({ guest: true, user: { $exists: false } });
// 		orders.forEach(async (order: any) => {
// 			const newUser: any = new User({
// 				first_name: order.shipping.first_name,
// 				last_name: order.shipping.last_name,
// 				email: order.shipping.email,
// 				password: 'fevjYt-7gucfu-kozgog',
// 				is_affiliated: false,
// 				email_subscription: true,
// 				isAdmin: false,
// 				isVerified: true
// 			});

// 			// Hash password before saving in database
// 			bcrypt.genSalt(10, (err: any, salt: any) => {
// 				bcrypt.hash(newUser.password, salt, async (err: any, hash: any) => {
// 					if (err) throw err;
// 					newUser.password = hash;
// 					// const user = newUser.save();
// 					console.log({ newUser });
// 					// order.user = user._id;
// 					// const saved_order = order.save();
// 					// const orders = await Order.updateOne({ _id: order._id }, { ...order, user: user._id });
// 					res.json(newUser);
// 					// .catch((err: any) => {
// 					// 	res.status(500).json({ message: 'Error Registering User' });
// 					// });
// 				});
// 			});
// 		});

// 		// console.log({ orders });
// 		res.send(orders);
// 	} catch (error) {
// 		console.log({ error });
// 	}
// });

export default router;
