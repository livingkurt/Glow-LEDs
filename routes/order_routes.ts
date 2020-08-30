// import express from 'express';
// import Order from '../models/orderModel';
// import { isAuth, isAdmin } from '../util';
export {};
const express = require('express');
import Order from '../models/order';
const { isAuth, isAdmin } = require('../util');
require('dotenv').config();
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

const router = express.Router();

// router.get('/', isAuth, async (req: any, res: { send: (arg0: any) => void }) => {
// 	const orders = await Order.find({ deleted: false }).populate('user').sort({ createdAt: -1 });
// 	res.send(orders);
// });

router.get('/', isAuth, async (req: any, res: { send: (arg0: any) => void }) => {
	const category = req.query.category ? { category: req.query.category } : {};
	const searchKeyword = req.query.searchKeyword
		? {
				_id: {
					$regex: req.query.searchKeyword,
					$options: 'i'
				}
			}
		: {};

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
	console.log({ sortOrder: req.query.sortOrder });
	console.log({ sortOrder });
	console.log({ searchKeyword });
	const orders = await Order.find({ deleted: false, ...category, ...searchKeyword }).populate('user').sort(sortOrder);
	// const orders = await Expense.find({}).sort({ date_of_purchase: -1 });
	// console.log(orders);
	res.send(orders);
});

router.get('/mine', isAuth, async (req: { user: { _id: any } }, res: { send: (arg0: any) => void }) => {
	const orders = await Order.find({ deleted: false, user: req.user._id }).sort({ _id: -1 });
	res.send(orders);
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
		const order = await Order.findOne({ _id: req.params.id });
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
				isRefunded: any;
				refundedAt: any;
			};
			user: { _id: any };
		},
		res: {
			status: (
				arg0: number
			) => { (): any; new (): any; send: { (arg0: { message: string; data: any }): void; new (): any } };
		}
	) => {
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
			deleted: false
		});
		const newOrderCreated = await newOrder.save();
		res.status(201).send({ message: 'New Order Created', data: newOrderCreated });
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
			console.log(req.body);
			console.log({ Pay: req.body.token });
			const order = await Order.findById(req.params.id).populate('user');
			console.log({ user: order.user.first_name });
			const charge = await stripe.charges.create({
				amount: (order.totalPrice * 100).toFixed(0),
				currency: 'usd',
				// name: order.user.first_name,
				description: `Order Paid`,
				source: req.body.token.id
			});
			console.log(charge);
			if (charge) {
				order.isPaid = true;
				order.paidAt = Date.now();
				order.payment = {
					paymentMethod: 'stripe',
					charge: charge
					// paymentResult: {
					// 	payment_id: charge.id,
					// 	last_4: charge.payment_method_details.last4,
					// 	payment_created: charge.created
					// }
				};
				const updatedOrder = await order.save();
				res.send({ message: 'Order Paid.', order: updatedOrder });
			} else {
				res.status(404).send({ message: 'Order not found.' });
			}
		} catch (error) {
			// res.status(503).send({ message: 'Order and Payment Failed' });
			console.log({ error });
			res.send(error);
		}
	}
);

// router.post(
// 	'/refund',
// 	isAuth,
// 	async (
// 		req: { body: { id: any }; user: { credits: number; save: () => any } },
// 		res: { send: (arg0: any) => void }
// 	) => {
// 		const refund = await stripe.refunds.create({
// 			charge: 'ch_1GEgHsJUIKBwBp0w91w7aeVE',
// 			object: 'refund',
// 			amount: 500
// 		});

// 		// req.user.credits += 5;
// 		// const user = await req.user.save();

// 		// res.send(user);
// 	}
// );

// isRefunded: req.body.isRefunded,
// refundedAt: req.body.refundedAt,

router.put('/:id/refund', async (req: { body: any; params: { id: any } }, res: { send: (arg0: any) => void }) => {
	try {
		console.log({ refund: req.body });
		// const updated_order = req.body;
		const order = await Order.findById(req.params.id);
		console.log({ id: order.payment.charge.id });
		console.log({ payment: order.payment });
		console.log({ refund_amount: req.body.refund_amount });
		const refund = await stripe.refunds.create({
			charge: order.payment.charge.id,
			amount: req.body.refund_amount * 100
		});
		console.log({ refund });
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

router.put('/:id/shipping', async (req: { body: any; params: { id: any } }, res: { send: (arg0: any) => void }) => {
	try {
		console.log({ shipping: req.body });
		const updated_order = req.body;
		// const order = req.body.order
		// const result = req.body.shippingResult
		// const updated_order = {
		//   ...req.body,
		//   isShipped: result,
		//   shippedAt: result ? Date.now() : ""
		// }
		const updated = await Order.updateOne({ _id: req.params.id }, updated_order);
		console.log({ shipping: updated_order });
		// Send the request back to the front end
		res.send(updated_order);
	} catch (err) {
		console.log(err);
	}
});

router.put('/:id/delivery', async (req: { body: any; params: { id: any } }, res: { send: (arg0: any) => void }) => {
	try {
		console.log({ delivery: req.body });
		const updated_order = req.body;
		// const order = req.body.order
		// const result = req.body.deliveryResult
		// const updated_order = {
		//   ...req.body,
		//   isDelivered: result,
		//   deliveredAt: result ? "" : Date.now()
		// }
		const updated = await Order.updateOne({ _id: req.params.id }, updated_order);
		console.log({ delivery: updated_order });
		// Send the request back to the front end
		res.send(updated_order);
	} catch (err) {
		console.log(err);
	}
});

// module.exports = router;
export default router;
