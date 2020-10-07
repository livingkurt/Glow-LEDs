// import express from 'express';
// import Order from '../models/orderModel';
// import { isAuth, isAdmin } from '../util';
export {};
const express = require('express');
import { User } from '../models';
import Order from '../models/order';
const { isAuth, isAdmin } = require('../util');
require('dotenv').config();
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

const router = express.Router();

// router.get('/', isAuth, async (req: any, res: { send: (arg0: any) => void }) => {
// 	const orders = await Order.find({ deleted: false }).populate('user').sort({ createdAt: -1 });
// 	res.send(orders);
// });

router.get('/occurrences', async (req: any, res: any) => {
	const orders = await Order.find({ deleted: false }).populate('orderItems.secondary_product');
	const products: any = [];
	orders.forEach((order: any) => {
		order.orderItems.map((item: any) => {
			products.push(item.name);
			if (item.secondary_product) {
				products.push(item.secondary_product.name);
			}
		});
	});
	let result: any = {};
	for (var i = 0; i < products.length; ++i) {
		if (!result[products[i]]) {
			result[products[i]] = 0;
		}
		++result[products[i]];
	}
	let final_result = [];
	for (let i in result) {
		const entry = { name: i, occurrence: result[i] };
		final_result.push(entry);
	}
	final_result.sort((a, b) => (a.occurrence > b.occurrence ? -1 : 1));
	res.send(final_result);
});

router.get('/', isAuth, async (req: any, res: { send: (arg0: any) => void }) => {
	const category = req.query.category ? { category: req.query.category } : {};
	let user: any;
	let searchKeyword: any;
	if (req.query.searchKeyword) {
		const userSearchKeyword = req.query.searchKeyword
			? {
					first_name: {
						$regex: req.query.searchKeyword,
						$options: 'i'
					}
				}
			: {};
		console.log({ userSearchKeyword });
		user = await User.findOne({ ...userSearchKeyword });
		console.log({ user });
		searchKeyword = { user: user._id };
	}
	let sortOrder = {};
	if (req.query.sortOrder === 'lowest') {
		sortOrder = { totalPrice: 1 };
	} else if (req.query.sortOrder === 'highest') {
		sortOrder = { totalPrice: -1 };
	} else if (req.query.sortOrder === 'date' || req.query.sortOrder === '') {
		sortOrder = { createdAt: -1 };
	} else if (req.query.sortOrder === 'paid') {
		sortOrder = { isPaid: -1 };
	} else if (req.query.sortOrder === 'shipped') {
		sortOrder = { isShipped: -1 };
	} else if (req.query.sortOrder === 'delivered') {
		sortOrder = { isDelivered: -1 };
	}
	console.log({ searchKeyword });
	const orders = await Order.find({ deleted: false, ...category, ...searchKeyword })
		.populate('user')
		.populate('orderItems.product')
		.populate('orderItems.secondary_product')
		.sort(sortOrder);
	res.send(orders);
});

router.get('/mine', isAuth, async (req: { user: { _id: any } }, res: { send: (arg0: any) => void }) => {
	const orders = await Order.find({ deleted: false, user: req.user._id }).sort({ _id: -1 });
	res.send(orders);
});
router.get('/charges', async (req: { user: { _id: any } }, res: { send: (arg0: any) => void }) => {
	const charges = await stripe.charges.list({});
	res.send(charges);
});
router.get('/refunds', async (req: { user: { _id: any } }, res: { send: (arg0: any) => void }) => {
	const refunds = await stripe.refunds.list({});
	res.send(refunds);
});

router.get(
	'/:id',
	isAuth,
	async (
		req: { params: { id: any } },
		res: {
			send: (arg0: any) => void;
			status: (arg0: number) => { (): any; new (): any; send: { (arg0: string): void; new (): any } };
		}
	) => {
		console.log('Hello');
		const order = await Order.findOne({ _id: req.params.id })
			.populate('orderItems.product')
			.populate('orderItems.secondary_product')
			.populate('user');
		if (order) {
			res.send(order);
		} else {
			res.status(404).send('Order Not Found.');
		}
	}
);

router.delete(
	'/:id',
	isAuth,
	isAdmin,
	async (
		req: { params: { id: any } },
		res: {
			send: (arg0: any) => void;
			status: (arg0: number) => { (): any; new (): any; send: { (arg0: string): void; new (): any } };
		}
	) => {
		// const order = await Order.findOne({ _id: req.params.id });
		// if (order) {
		// 	const deletedOrder = await order.remove();
		// 	res.send(deletedOrder);
		// } else {
		// 	res.status(404).send('Order Not Found.');
		// }
		const order = await Order.findById(req.params.id);
		const updated_order = { ...order, deleted: true };
		const message: any = { message: 'Order Deleted' };
		// const deleted_order = await updated_order.save();
		const deleted_order = await Order.updateOne({ _id: req.params.id }, { deleted: true });
		if (deleted_order) {
			// await deletedProduct.remove();
			res.send(message);
		} else {
			res.send('Error in Deletion.');
		}
	}
);

router.post(
	'/',
	isAuth,
	async (
		req: {
			body: {
				orderItems: any;
				shipping: any;
				payment: any;
				itemsPrice: any;
				taxPrice: any;
				shippingPrice: any;
				totalPrice: any;
				order_note: any;
				promo_code: any;
				product: any;
			};
			user: { _id: any };
		},
		res: {
			status: (
				arg0: number
			) => { (): any; new (): any; send: { (arg0: { message: string; data: any }): void; new (): any } };
		}
	) => {
		try {
			const newOrder = new Order({
				orderItems: req.body.orderItems,
				user: req.user._id,
				shipping: req.body.shipping,
				payment: req.body.payment,
				itemsPrice: req.body.itemsPrice,
				taxPrice: req.body.taxPrice,
				shippingPrice: req.body.shippingPrice,
				totalPrice: req.body.totalPrice,
				order_note: req.body.order_note,
				promo_code: req.body.promo_code,
				// product: req.body.product,
				deleted: false
			});
			// const newOrderCreated = await Order.create(req.body);

			const newOrderCreated = await newOrder.save();
			res.status(201).send({ message: 'New Order Created', data: newOrderCreated });
		} catch (error) {
			console.log({ error });
		}
	}
);

router.put(
	'/:id/pay',
	isAuth,
	async (
		req: {
			params: { id: any };
			body: { token: any };
		},
		res: {
			send: (arg0: { message: string; order: any }) => void;
			status: (
				arg0: number
			) => { (): any; new (): any; send: { (arg0: { message: string }): void; new (): any } };
		}
	) => {
		try {
			const order = await Order.findById(req.params.id).populate('user');
			const charge = await stripe.charges.create({
				amount: (order.totalPrice * 100).toFixed(0),
				currency: 'usd',
				description: `Order Paid`,
				source: req.body.token.id
			});
			if (charge) {
				order.isPaid = true;
				order.paidAt = Date.now();
				order.payment = {
					paymentMethod: 'stripe',
					charge: charge
				};
				const updatedOrder = await order.save();
				res.send({ message: 'Order Paid.', order: updatedOrder });
			} else {
				res.status(404).send({ message: 'Order not found.' });
			}
		} catch (error) {
			console.log({ error });
			res.send(error);
		}
	}
);
router.put('/:id/refund', async (req: { body: any; params: { id: any } }, res: { send: (arg0: any) => void }) => {
	try {
		// console.log({ refund: req.body });
		// const updated_order = req.body;
		const order = await Order.findById(req.params.id);
		// console.log({ id: order.payment.charge.id });
		// console.log({ payment: order.payment });
		// console.log({ refund_amount: req.body.refund_amount });
		const refund = await stripe.refunds.create({
			charge: order.payment.charge.id,
			amount: req.body.refund_amount * 100
		});
		// console.log({ refund });
		if (refund) {
			order.isRefunded = true;
			order.refundedAt = Date.now();
			order.payment = {
				paymentMethod: order.payment.paymentMethod,
				charge: order.payment.charge,
				refund: [ ...order.payment.refund, refund ],
				refund_reason: [ ...order.payment.refund_reason, req.body.refund_reason ]
			};
			const updated = await Order.updateOne({ _id: req.params.id }, order);
			console.log({ refund: updated });
			// Send the request back to the front end
			res.send(updated);
		}
	} catch (err) {
		console.log(err);
	}
});

router.put('/addproduct', async (req: { body: any; params: { id: any } }, res: { send: (arg0: any) => void }) => {
	try {
		const order_id = req.body.order._id;
		const product_id = req.body.product;
		const order = await Order.findById(order_id)
			.populate('orderItems.product')
			.populate('orderItems.secondary_product')
			.populate('user');
		order.orderItems.product._id = product_id;
		const updated = await Order.updateOne({ _id: order_id }, order);
		res.send(updated);
	} catch (err) {
		console.log(err);
	}
});
router.put(
	'/addsecondaryproduct',
	async (req: { body: any; params: { id: any } }, res: { send: (arg0: any) => void }) => {
		try {
			const order_id = req.body.order._id;
			const product_id = req.body.secondary_product;
			const order = await Order.findById(order_id)
				.populate('orderItems.product')
				.populate('orderItems.secondary_product')
				.populate('user');
			for (let item of order.orderItems) {
				if (
					item.name === 'Mini Diffuser Caps + Adapters Starter Kit' ||
					item.name === 'Diffuser Caps + Adapters Starter Kit'
				) {
					item.secondary_product = product_id;
				}
			}
			console.log({ order });

			const updated = await Order.updateOne({ _id: order_id }, order);
			res.send(updated);
		} catch (err) {
			console.log(err);
		}
	}
);

router.put('/:id/update', async (req: { body: any; params: { id: any } }, res: { send: (arg0: any) => void }) => {
	try {
		console.log({ update: req.body });
		const updated_order = req.body;
		const updated = await Order.updateOne({ _id: req.params.id }, updated_order);
		console.log({ update: updated_order });
		// Send the request back to the front end
		res.send(updated_order);
	} catch (err) {
		console.log(err);
	}
});

export default router;
