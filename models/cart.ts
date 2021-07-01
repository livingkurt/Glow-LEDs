import mongoose from 'mongoose';
export {};
// const mongoose = require('mongoose');

const productOptionsSchema = new mongoose.Schema({
	name: { type: String },
	price: { type: Number },
	sale_price: { type: Number, default: 0 },
	size: { type: Number },
	color: { type: String }
});

const cartItemsSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		qty: { type: Number, required: true },
		display_image: { type: String, required: true },
		color: { type: String },
		diffuser_cap: { type: String },
		price: { type: Number, required: true },
		category: { type: String, required: true },
		pathname: { type: String },
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
		product_option: productOptionsSchema,
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			required: true
		},
		secondary_product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product'
		}
	},
	{
		timestamps: true
	}
);

const cartSchema = new mongoose.Schema(
	{
		cartItems: [ cartItemsSchema ],
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const cartModel = mongoose.model('Cart', cartSchema);

export default cartModel;

// module.exports = userModel;
