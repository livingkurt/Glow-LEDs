// import express from 'express';
// import Order from '../models/orderModel';
// import { isAuth, isAdmin } from '../util';
export {};
const express = require('express');
import Order from '../models/order';
const { isAuth, isAdmin } = require('../util');
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

const router = express.Router();

router.get('/', isAuth, async (req: any, res: { send: (arg0: any) => void }) => {
	const orders = await Order.find({ deleted: false }).populate('user').sort({ createdAt: -1 });
	res.send(orders);
});
router.get('/mine', isAuth, async (req: { user: { _id: any } }, res: { send: (arg0: any) => void }) => {
	const orders = await Order.find({ deleted: false, user: req.user._id });
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
		console.log(req.body);
		console.log({ Pay: req.body.token });
		const order = await Order.findById(req.params.id);
		const charge = await stripe.charges.create({
			amount: (order.totalPrice * 100).toFixed(0),
			currency: 'usd',
			description: `Order Paid`,
			source: req.body.token.id
		});
		if (charge) {
			order.isPaid = true;
			order.paidAt = Date.now();
			// order.payment = {
			// 	paymentMethod: 'paypal',
			// 	paymentResult: {
			// 		payerID: req.body.payerID,
			// 		orderID: req.body.orderID,
			// 		paymentID: req.body.paymentID
			// 	}
			// };
			const updatedOrder = await order.save();
			res.send({ message: 'Order Paid.', order: updatedOrder });
		} else {
			res.status(404).send({ message: 'Order not found.' });
		}
	}
);

router.post(
	'/api/stripe',
	isAuth,
	async (
		req: { body: { id: any }; user: { credits: number; save: () => any } },
		res: { send: (arg0: any) => void }
	) => {
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for 5 credits',
			source: req.body.id
		});

		req.user.credits += 5;
		const user = await req.user.save();

		res.send(user);
	}
);

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
