import mongoose from 'mongoose';
export {};
// const mongoose = require('mongoose');

const cartItemsSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		qty: { type: Number, required: true },
		display_image: { type: String, required: true },
		color: { type: String },
		secondary_color: { type: String },
		color_group_name: { type: String },
		secondary_color_group_name: { type: String },
		color_code: { type: String },
		secondary_color_code: { type: String },
		price: { type: Number, required: true },
		category: { type: String, required: true },
		pathname: { type: String },
		size: { type: Number },
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
