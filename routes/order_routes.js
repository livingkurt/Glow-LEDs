// import express from 'express';
// import Order from '../models/orderModel';
// import { isAuth, isAdmin } from '../util';

const express = require('express');
const Order = require('../models/order');
const { isAuth, isAdmin } = require('../util');

const router = express.Router();

router.get("/", isAuth, async (req, res) => {
  const orders = await Order.find({}).populate('user');
  res.send(orders);
});
router.get("/mine", isAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

router.get("/:id", isAuth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send("Order Not Found.")
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const deletedOrder = await order.remove();
    res.send(deletedOrder);
  } else {
    res.status(404).send("Order Not Found.")
  }
});

router.post("/", isAuth, async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });
  const newOrderCreated = await newOrder.save();
  res.status(201).send({ message: "New Order Created", data: newOrderCreated });
});

router.put("/:id/pay", isAuth, async (req, res) => {
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
    }
    const updatedOrder = await order.save();
    res.send({ message: 'Order Paid.', order: updatedOrder });
  } else {
    res.status(404).send({ message: 'Order not found.' })
  }
});

router.put("/:id/shipping", async (req, res) => {
  console.log({ "shipping": req.body })
  console.log(Object.keys(req.body).join(""))
  const shippingResult = Object.keys(req.body).join("")
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isShipped = shippingResult === "true" ? true : false;
    order.shippedAt = Date.now();
    const updatedOrder = await order.save();
    res.send({ message: 'Order Shipped.', order: updatedOrder });
  } else {
    res.status(404).send({ message: 'Order not found.' })
  }
});

router.put("/:id/delivery", async (req, res) => {
  console.log({ "delivery": req.body })
  console.log(Object.keys(req.body).join(""))
  const deliveryResult = Object.keys(req.body).join("")
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = deliveryResult === "true" ? true : false;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.send({ message: 'Order Delivered.', order: updatedOrder });
  } else {
    res.status(404).send({ message: 'Order not found.' })
  }
});

// export default router;

module.exports = router;