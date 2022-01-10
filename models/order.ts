// import mongoose from 'mongoose';
export {};
const mongoose = require('mongoose');

const shippingSchema = {
	shipment_id: { type: String },
	shipping_rate: { type: Object },
	shipping_label: { type: Object },
	shipment_tracking: { type: Object },
	return_shipment_id: { type: String },
	return_shipping_rate: { type: Object },
	return_shipping_label: { type: Object },
	return_shipment_tracking: { type: Object },
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	email: { type: String, required: true },
	address: { type: String },
	address_1: { type: String, required: true },
	address_2: { type: String },
	city: { type: String, required: true },
	state: { type: String, required: true },
	postalCode: { type: String, required: true },
	international: { type: Boolean },
	country: { type: String, required: true }
};

const paymentSchema = {
	paymentMethod: { type: String },
	payment: { type: Object },
	charge: { type: Object },
	refund: { type: Array },
	refund_reason: { type: Array }
};

const messageSchema = {
	message: { type: String },
	user: { type: Boolean },
	admin: { type: Boolean },
	deleted: { type: Boolean, default: false }
};

const productOptionsSchema = new mongoose.Schema({
	name: { type: String },
	price: { type: Number },
	sale_price: { type: Number, default: 0 },
	size: { type: Number },
	color: { type: String }
});

const orderItemSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		qty: { type: Number, required: true },
		display_image: { type: String, required: true },
		secondary_image: { type: String },
		color: { type: String },
		secondary_color: { type: String },
		color_group_name: { type: String },
		is_manufactured: { type: Boolean },
		secondary_color_group_name: { type: String },
		option_group_name: { type: String },
		secondary_group_name: { type: String },
		color_code: { type: String },
		secondary_color_code: { type: String },
		price: { type: Number, required: true },
		category: { type: String, required: true },
		count_in_stock: { type: Number },
		subcategory: { type: String },
		pathname: { type: String },
		size: { type: String },
		preorder: { type: Boolean },
		sale_price: { type: Number },
		package_volume: { type: Number },
		weight_pounds: { type: Number },
		weight_ounces: { type: Number },
		length: { type: Number },
		width: { type: Number },
		height: { type: Number },
		package_length: { type: Number },
		package_width: { type: Number },
		package_height: { type: Number },
		is_manufacturered: { type: Boolean },
		reviewed: { type: Boolean, default: false },
		product_option: productOptionsSchema,
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			required: true
		},
		color_product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product'
		},
		color_product_name: { type: String },
		secondary_color_product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product'
		},
		secondary_color_product_name: { type: String },
		option_product_name: { type: String },
		option_product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product'
		},
		secondary_product_name: { type: String },
		secondary_product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product'
		}
	},
	{
		timestamps: true
	}
);

const orderSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		orderItems: [ orderItemSchema ],
		messages: [ messageSchema ],
		shipping: shippingSchema,
		payment: paymentSchema,
		itemsPrice: { type: Number },
		taxPrice: { type: Number },
		shippingPrice: { type: Number },
		totalPrice: { type: Number },
		guest: { type: Boolean, default: false },
		isPaid: { type: Boolean, default: false },
		paidAt: { type: Date },
		isReassured: { type: Boolean, default: false },
		reassuredAt: { type: Date },
		isManufactured: { type: Boolean, default: false },
		manufacturedAt: { type: Date },
		isPackaged: { type: Boolean, default: false },
		packagedAt: { type: Date },
		isShipped: { type: Boolean, default: false },
		shippedAt: { type: Date },
		isDelivered: { type: Boolean, default: false },
		deliveredAt: { type: Date },
		isRefunded: { type: Boolean, default: false },
		parcel: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Parcel'
		},
		refundedAt: { type: Date },
		order_note: { type: String },
		tip: { type: Number },
		promo_code: { type: String },
		tracking_number: { type: String },
		return_tracking_number: { type: String },
		is_error: { type: Boolean, default: false },
		error_at: { type: Date },
		error: { type: Object },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
// module.exports = Order;
