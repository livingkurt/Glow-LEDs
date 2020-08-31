// import mongoose from 'mongoose';
export {};
const mongoose = require('mongoose');

const shippingSchema = {
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	email: { type: String, required: true },
	address: { type: String, required: true },
	city: { type: String, required: true },
	state: { type: String, required: true },
	postalCode: { type: String, required: true },
	international: { type: Boolean },
	country: { type: String, required: true }
};

const paymentSchema = {
	paymentMethod: { type: String, required: true },
	charge: { type: Object },
	refund: { type: Array },
	refund_reason: { type: Array }
};

const orderItemSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		qty: { type: Number, required: true },
		display_image: { type: String, required: true },
		price: { type: Number, required: true },
		sale_price: { type: Number },
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			required: true
		}
	},
	{
		timestamps: true
	}
);

const orderSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		orderItems: [ orderItemSchema ],
		shipping: shippingSchema,
		payment: paymentSchema,
		itemsPrice: { type: Number },
		taxPrice: { type: Number },
		shippingPrice: { type: Number },
		totalPrice: { type: Number },
		isPaid: { type: Boolean, default: false },
		paidAt: { type: Date },
		isShipped: { type: Boolean, default: false },
		shippedAt: { type: Date },
		isRefunded: { type: Boolean, default: false },
		refundedAt: { type: Date },
		isDelivered: { type: Boolean, default: false },
		deliveredAt: { type: Date },
		order_note: { type: String },
		promo_code: { type: String },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
// module.exports = Order;
