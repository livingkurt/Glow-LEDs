// import mongoose from 'mongoose';
export {};
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		rating: { type: Number, default: 0 },
		comment: { type: String, required: true }
	},
	{
		timestamps: true
	}
);

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		display_image: { type: String, required: true },
		video: { type: String },
		brand: { type: String, required: true },
		price: { type: Number, default: 0, required: true },
		category: { type: String, required: true },
		countInStock: { type: Number, default: 0, required: true },
		facts: { type: String },
		included_items: { type: String },
		description: { type: String },
		rating: { type: Number, default: 0 },
		numReviews: { type: Number, default: 0 },
		reviews: [ reviewSchema ],
		hidden: { type: Boolean, default: false },
		sale_price: { type: Number, default: 0 },
		volume: { type: Number, required: 0 },
		deleted: { type: Boolean, default: false },
		pathname: { type: String },
		meta_title: { type: String },
		meta_description: { type: String },
		meta_keywords: { type: String },
		length: { type: Number },
		width: { type: Number },
		height: { type: Number },
		weight_pounds: { type: Number },
		weight_ounces: { type: Number }
	},
	{
		timestamps: true
	}
);

const productModel = mongoose.model('Product', productSchema);

export default productModel;
// module.exports = productModel;
