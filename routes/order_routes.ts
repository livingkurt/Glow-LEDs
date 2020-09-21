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
	const orders = await Order.find({ deleted: false, ...category, ...searchKeyword })
		.populate('user')
		.populate('orderItems.product')
		.populate('orderItems.secondary_product')
		.sort(sortOrder);
	// const orders = await Expense.find({}).sort({ date_of_purchase: -1 });
	// console.log(orders);
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

router.put('/:id/manufactured', async (req: { body: any; params: { id: any } }, res: { send: (arg0: any) => void }) => {
	try {
		console.log({ manufactured: req.body });
		const updated_order = req.body;
		const updated = await Order.updateOne({ _id: req.params.id }, updated_order);
		console.log({ manufactured: updated_order });
		// Send the request back to the front end
		res.send(updated_order);
	} catch (err) {
		console.log(err);
	}
});

router.put('/:id/packaged', async (req: { body: any; params: { id: any } }, res: { send: (arg0: any) => void }) => {
	try {
		console.log({ packaged: req.body });
		const updated_order = req.body;
		const updated = await Order.updateOne({ _id: req.params.id }, updated_order);
		console.log({ packaged: updated_order });
		// Send the request back to the front end
		res.send(updated_order);
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

// router.put('/refunds', async (req: { user: { _id: any } }, res: { send: (arg0: any) => void }) => {
// 	const refund = [
// 		{
// 			id: 're_1HLvSrJUIKBwBp0wYDg5ccVt',
// 			object: 'refund',
// 			amount: 500,
// 			balance_transaction: 'txn_1HLvSrJUIKBwBp0wUY9DcKXf',
// 			charge: 'ch_1HLNi2JUIKBwBp0w0Umg12R8',
// 			created: 1598812877,
// 			currency: 'usd',
// 			metadata: {},
// 			payment_intent: null,
// 			reason: null,
// 			receipt_number: null,
// 			source_transfer_reversal: null,
// 			status: 'succeeded',
// 			transfer_reversal: null
// 		}
// 	];
// 	const charge = {
// 		id: 'ch_1HLNi2JUIKBwBp0w0Umg12R8',
// 		object: 'charge',
// 		amount: 1804,
// 		amount_refunded: 500,
// 		application: null,
// 		application_fee: null,
// 		application_fee_amount: null,
// 		balance_transaction: 'txn_1HLNi3JUIKBwBp0wVtvqBVff',
// 		billing_details: {
// 			address: {
// 				city: null,
// 				country: null,
// 				line1: null,
// 				line2: null,
// 				postal_code: null,
// 				state: null
// 			},
// 			email: null,
// 			name: 'Tsnyde16@gmail.com',
// 			phone: null
// 		},
// 		calculated_statement_descriptor: 'GLOW-LEDS',
// 		captured: true,
// 		created: 1598683122,
// 		currency: 'usd',
// 		customer: null,
// 		description: 'Order Paid',
// 		destination: null,
// 		dispute: null,
// 		disputed: false,
// 		failure_code: null,
// 		failure_message: null,
// 		fraud_details: {},
// 		invoice: null,
// 		livemode: true,
// 		metadata: {},
// 		on_behalf_of: null,
// 		order: null,
// 		outcome: {
// 			network_status: 'approved_by_network',
// 			reason: null,
// 			risk_level: 'normal',
// 			seller_message: 'Payment complete.',
// 			type: 'authorized'
// 		},
// 		paid: true,
// 		payment_intent: null,
// 		payment_method: 'card_1HLNhyJUIKBwBp0wUAyy3anC',
// 		payment_method_details: {
// 			card: {
// 				brand: 'visa',
// 				checks: {
// 					address_line1_check: null,
// 					address_postal_code_check: null,
// 					cvc_check: 'pass'
// 				},
// 				country: 'US',
// 				exp_month: 9,
// 				exp_year: 2022,
// 				fingerprint: 'Bf8kKB1vyAbLKTd8',
// 				funding: 'credit',
// 				installments: null,
// 				last4: '5079',
// 				network: 'visa',
// 				three_d_secure: null,
// 				wallet: null
// 			},
// 			type: 'card'
// 		},
// 		receipt_email: null,
// 		receipt_number: null,
// 		receipt_url:
// 			'https://pay.stripe.com/receipts/acct_1GEFSPJUIKBwBp0w/ch_1HLNi2JUIKBwBp0w0Umg12R8/rcpt_HvEA1s3cdZe5E8Hxj9m17MCq6j3HuX7',
// 		refunded: false,
// 		refunds: {
// 			object: 'list',
// 			data: [
// 				{
// 					id: 're_1HLvSrJUIKBwBp0wYDg5ccVt',
// 					object: 'refund',
// 					amount: 500,
// 					balance_transaction: 'txn_1HLvSrJUIKBwBp0wUY9DcKXf',
// 					charge: 'ch_1HLNi2JUIKBwBp0w0Umg12R8',
// 					created: 1598812877,
// 					currency: 'usd',
// 					metadata: {},
// 					payment_intent: null,
// 					reason: null,
// 					receipt_number: null,
// 					source_transfer_reversal: null,
// 					status: 'succeeded',
// 					transfer_reversal: null
// 				}
// 			],
// 			has_more: false,
// 			total_count: 1,
// 			url: '/v1/charges/ch_1HLNi2JUIKBwBp0w0Umg12R8/refunds'
// 		},
// 		review: null,
// 		shipping: null,
// 		source: {
// 			id: 'card_1HLNhyJUIKBwBp0wUAyy3anC',
// 			object: 'card',
// 			address_city: null,
// 			address_country: null,
// 			address_line1: null,
// 			address_line1_check: null,
// 			address_line2: null,
// 			address_state: null,
// 			address_zip: null,
// 			address_zip_check: null,
// 			brand: 'Visa',
// 			country: 'US',
// 			customer: null,
// 			cvc_check: 'pass',
// 			dynamic_last4: null,
// 			exp_month: 9,
// 			exp_year: 2022,
// 			fingerprint: 'Bf8kKB1vyAbLKTd8',
// 			funding: 'credit',
// 			last4: '5079',
// 			metadata: {},
// 			name: 'Tsnyde16@gmail.com',
// 			tokenization_method: null
// 		},
// 		source_transfer: null,
// 		statement_descriptor: null,
// 		statement_descriptor_suffix: null,
// 		status: 'succeeded',
// 		transfer_data: null,
// 		transfer_group: null
// 	};
// 	try {
// 		// console.log(req.body);
// 		// console.log({ Pay: req.body.token });
// 		// const order = await Order.findOne({ _id: '5f4a8aee4b7048002a000738' }).populate('user');
// 		// const order = await Order.updateOne({ _id: '5f495379cf122f780209e0ea' }, { payment: { charge: charge } });
// 		// console.log(order);
// 		// res.send(order);
// 		const order = await Order.updateOne(
// 			{ _id: '5f49f7f14b7048002a000731' },
// 			{
// 				payment: { charge: charge, refund: refund, refund_reason: 'Shipping' },
// 				isRefunded: true,
// 				refundedAt: new Date('2020-08-30T18:34:53.430+00:00')
// 			}
// 		);
// 		console.log(order);
// 		res.send(order);
// 		// if (order) {
// 		// order.payment.charge = charge;
// 		// const updatedOrder = await order.save();
// 		// res.send({ message: 'Order Paid.', order: updatedOrder });
// 		// }
// 		// else {
// 		// if (charge) {
// 		//   order.isPaid = true;
// 		//   order.paidAt = Date.now();
// 		//   order.payment = {
// 		//     paymentMethod: 'stripe',
// 		//     charge: charge
// 		//     // paymentResult: {
// 		//     // 	payment_id: charge.id,
// 		//     // 	last_4: charge.payment_method_details.last4,
// 		//     // 	payment_created: charge.created
// 		//     // }
// 		//   };

// 		// res.status(404).send({ message: 'Order not found.' });
// 		// }
// 	} catch (error) {
// 		// res.status(503).send({ message: 'Order and Payment Failed' });
// 		console.log({ error });
// 		res.send(error);
// 	}
// });

// router.put('/charge', async (req: { user: { _id: any } }, res: { send: (arg0: any) => void }) => {
// 	const charge = {
// 		id: 'ch_1HLXUxJUIKBwBp0weEYLWN75',
// 		object: 'charge',
// 		amount: 1804,
// 		amount_refunded: 0,
// 		application: null,
// 		application_fee: null,
// 		application_fee_amount: null,
// 		balance_transaction: 'txn_1HLXUyJUIKBwBp0wztOer7F1',
// 		billing_details: {
// 			address: {
// 				city: null,
// 				country: null,
// 				line1: null,
// 				line2: null,
// 				postal_code: null,
// 				state: null
// 			},
// 			email: null,
// 			name: 'mickeydustin@gmail.com',
// 			phone: null
// 		},
// 		calculated_statement_descriptor: 'GLOW-LEDS',
// 		captured: true,
// 		created: 1598720751,
// 		currency: 'usd',
// 		customer: null,
// 		description: 'Order Paid',
// 		destination: null,
// 		dispute: null,
// 		disputed: false,
// 		failure_code: null,
// 		failure_message: null,
// 		fraud_details: {},
// 		invoice: null,
// 		livemode: true,
// 		metadata: {},
// 		on_behalf_of: null,
// 		order: null,
// 		outcome: {
// 			network_status: 'approved_by_network',
// 			reason: null,
// 			risk_level: 'normal',
// 			seller_message: 'Payment complete.',
// 			type: 'authorized'
// 		},
// 		paid: true,
// 		payment_intent: null,
// 		payment_method: 'card_1HLXUsJUIKBwBp0w2uVdKjlg',
// 		payment_method_details: {
// 			card: {
// 				brand: 'visa',
// 				checks: {
// 					address_line1_check: null,
// 					address_postal_code_check: null,
// 					cvc_check: 'pass'
// 				},
// 				country: 'US',
// 				exp_month: 8,
// 				exp_year: 2025,
// 				fingerprint: 'EMZu4Tq0WHVwHhDG',
// 				funding: 'debit',
// 				installments: null,
// 				last4: '7823',
// 				network: 'visa',
// 				three_d_secure: null,
// 				wallet: null
// 			},
// 			type: 'card'
// 		},
// 		receipt_email: null,
// 		receipt_number: null,
// 		receipt_url:
// 			'https://pay.stripe.com/receipts/acct_1GEFSPJUIKBwBp0w/ch_1HLXUxJUIKBwBp0weEYLWN75/rcpt_HvOH05NFPwPo88xZSUtHkqzvk2GKnsT',
// 		refunded: false,
// 		refunds: {
// 			object: 'list',
// 			data: [],
// 			has_more: false,
// 			total_count: 0,
// 			url: '/v1/charges/ch_1HLXUxJUIKBwBp0weEYLWN75/refunds'
// 		},
// 		review: null,
// 		shipping: null,
// 		source: {
// 			id: 'card_1HLXUsJUIKBwBp0w2uVdKjlg',
// 			object: 'card',
// 			address_city: null,
// 			address_country: null,
// 			address_line1: null,
// 			address_line1_check: null,
// 			address_line2: null,
// 			address_state: null,
// 			address_zip: null,
// 			address_zip_check: null,
// 			brand: 'Visa',
// 			country: 'US',
// 			customer: null,
// 			cvc_check: 'pass',
// 			dynamic_last4: null,
// 			exp_month: 8,
// 			exp_year: 2025,
// 			fingerprint: 'EMZu4Tq0WHVwHhDG',
// 			funding: 'debit',
// 			last4: '7823',
// 			metadata: {},
// 			name: 'mickeydustin@gmail.com',
// 			tokenization_method: null
// 		},
// 		source_transfer: null,
// 		statement_descriptor: null,
// 		statement_descriptor_suffix: null,
// 		status: 'succeeded',
// 		transfer_data: null,
// 		transfer_group: null
// 	};
// 	try {
// 		// console.log(req.body);
// 		// console.log({ Pay: req.body.token });
// 		// const order = await Order.findOne({ _id: '5f4a8aee4b7048002a000738' }).populate('user');
// 		// const order = await Order.updateOne({ _id: '5f495379cf122f780209e0ea' }, { payment: { charge: charge } });
// 		// console.log(order);
// 		// res.send(order);
// 		const order = await Order.updateOne({ _id: '5f4a8aee4b7048002a000738' }, { payment: { charge: charge } });
// 		console.log(order);
// 		res.send(order);
// 		// if (order) {
// 		// order.payment.charge = charge;
// 		// const updatedOrder = await order.save();
// 		// res.send({ message: 'Order Paid.', order: updatedOrder });
// 		// }
// 		// else {
// 		// if (charge) {
// 		//   order.isPaid = true;
// 		//   order.paidAt = Date.now();
// 		//   order.payment = {
// 		//     paymentMethod: 'stripe',
// 		//     charge: charge
// 		//     // paymentResult: {
// 		//     // 	payment_id: charge.id,
// 		//     // 	last_4: charge.payment_method_details.last4,
// 		//     // 	payment_created: charge.created
// 		//     // }
// 		//   };

// 		// res.status(404).send({ message: 'Order not found.' });
// 		// }
// 	} catch (error) {
// 		// res.status(503).send({ message: 'Order and Payment Failed' });
// 		console.log({ error });
// 		res.send(error);
// 	}
// });
