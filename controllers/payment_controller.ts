import { Order } from '../models';
require('dotenv').config();
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

export default {
	secure_pay: async (req: any, res: any) => {
		try {
			const order = await Order.findById(req.params.id).populate('user');
			// console.log({ order });
			const intent = await stripe.paymentIntents.create(
				{
					amount: (order.totalPrice * 100).toFixed(0),
					currency: 'usd',
					payment_method_types: [ 'card' ]
				},
				async (err: any, result: any) => {
					if (err) {
						console.log({ err });

						return res.status(500).send({ error: err, message: err.raw.message });
					} else {
						console.log({ payment_method: req.body.paymentMethod.id });
						await stripe.paymentIntents.confirm(
							result.id,
							{
								payment_method:
									process.env.NODE_ENV === 'production'
										? req.body.paymentMethod.id
										: 'pm_card_' + req.body.paymentMethod.card.brand
							},
							async (err: any, result: any) => {
								if (err) {
									console.log({ err });

									return res.status(404).send({ error: err, message: err.raw.message });
								} else {
									order.isPaid = true;
									order.paidAt = Date.now();
									order.payment = {
										paymentMethod: 'stripe',
										charge: result,
										payment: req.body.paymentMethod
									};

									const updatedOrder = await order.save();
									if (updatedOrder) {
										res.send({ message: 'Order Paid.', order: updatedOrder });
									}
									// }
								}
							}
						);
					}
				}
			);
		} catch (error) {
			console.log({ error });

			console.log({ error });
			res.status(500).send({ error, message: 'Error Paying for Order' });
		}
	},
	guest_pay: async (req: any, res: any) => {
		try {
			const order = await Order.findById(req.params.id);
			await stripe.paymentIntents.create(
				{
					amount: (order.totalPrice * 100).toFixed(0),
					currency: 'usd',
					payment_method_types: [ 'card' ]
				},
				async (err: any, result: any) => {
					if (err) {
						console.log({ err });

						return res.status(500).send({ error: err, message: err.raw.message });
					} else {
						await stripe.paymentIntents.confirm(
							result.id,
							{
								payment_method:
									process.env.NODE_ENV === 'production'
										? req.body.paymentMethod.id
										: 'pm_card_' + req.body.paymentMethod.card.brand
							},
							async (err: any, result: any) => {
								if (err) {
									return res.status(500).send({ error: err, message: err.raw.message });
								} else {
									order.isPaid = true;
									order.paidAt = Date.now();
									order.payment = {
										paymentMethod: 'stripe',
										charge: result,
										payment: req.body.paymentMethod
									};
									const updatedOrder = await order.save();
									if (updatedOrder) {
										res.send({ message: 'Order Paid.', order: updatedOrder });
									}
								}
							}
						);
					}
				}
			);
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Paying for Order' });
		}
	},
	secure_refund: async (req: any, res: any) => {
		try {
			const order = await Order.findById(req.params.id);
			console.log({ order });
			console.log({ body: req.body });
			const refund = await stripe.refunds.create({
				payment_intent: order.payment.charge.id,
				amount: req.body.refund_amount.toFixed(2) * 100
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
				if (updated) {
					res.send(updated);
				} else {
					res.status(404).send({ message: 'Order not Updated.' });
				}
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Refunding Order' });
		}
	},
	update: async (req: any, res: any) => {},
	remove: async (req: any, res: any) => {}
};
