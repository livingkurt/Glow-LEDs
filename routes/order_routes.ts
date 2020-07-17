// import express from 'express';
// import Order from '../models/orderModel';
// import { isAuth, isAdmin } from '../util';
export {};
const express = require('express');
const Order = require('../models/order');
const { isAuth, isAdmin } = require('../util');

const router = express.Router();

router.get('/', isAuth, async (req, res) => {
	const orders = await Order.find({}).populate('user');
	res.send(orders);
});
router.get('/mine', isAuth, async (req, res) => {
	const orders = await Order.find({ user: req.user._id });
	res.send(orders);
});

router.get('/:id', isAuth, async (req, res) => {
	const order = await Order.findOne({ _id: req.params.id });
	if (order) {
		res.send(order);
	} else {
		res.status(404).send('Order Not Found.');
	}
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
	const order = await Order.findOne({ _id: req.params.id });
	if (order) {
		const deletedOrder = await order.remove();
		res.send(deletedOrder);
	} else {
		res.status(404).send('Order Not Found.');
	}
});

router.post('/', isAuth, async (req, res) => {
	const newOrder = new Order({
		orderItems: req.body.orderItems,
		user: req.user._id,
		shipping: req.body.shipping,
		payment: req.body.payment,
		itemsPrice: req.body.itemsPrice,
		taxPrice: req.body.taxPrice,
		shippingPrice: req.body.shippingPrice,
		totalPrice: req.body.totalPrice,
		order_note: req.body.order_note
	});
	const newOrderCreated = await newOrder.save();
	res.status(201).send({ message: 'New Order Created', data: newOrderCreated });
});

router.put('/:id/pay', isAuth, async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.payment = {
			paymentMethod: 'paypal',
			paymentResult: {
				payerID: req.body.payerID,
				orderID: req.body.orderID,
				paymentID: req.body.paymentID
			}
		};
		const updatedOrder = await order.save();
		res.send({ message: 'Order Paid.', order: updatedOrder });
	} else {
		res.status(404).send({ message: 'Order not found.' });
	}
});

router.put('/:id/shipping', async (req, res) => {
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

router.put('/:id/delivery', async (req, res) => {
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

// export default router;

module.exports = router;
