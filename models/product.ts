// import mongoose from 'mongoose';
export {};
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		first_name: { type: String },
		last_name: { type: String },
		rating: { type: Number, default: 0 },
		comment: { type: String, required: true },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);
const productOptionsSchema = new mongoose.Schema(
	{
		name: { type: String },
		price: { type: Number, default: 0 },
		sale_price: { type: Number, default: 0 },
		size: { type: Number },
		color: { type: String },
		images: { type: Array },
		quantity_state: { type: Number },
		finite_stock: { type: Boolean, default: false },
		default: { type: Boolean, default: false },
		dropdown: { type: Boolean, default: false },
		no_dropdown: { type: Boolean, default: false },
		deleted: { type: Boolean, default: false },
		package_length: { type: Number },
		package_width: { type: Number },
		package_height: { type: Number },
		package_volume: { type: Number },
		package_pounds: { type: Number },
		package_ounces: { type: Number },
		material_cost: { type: Number },
		filament_used: { type: Number },
		printing_time: { type: Number },
		assembly_time: { type: Number }
	},
	{
		timestamps: true
	}
);

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		// display_image: { type: String, required: true },
		images: { type: Array },
		video: { type: String },
		brand: { type: String, required: true },
		price: { type: Number },
		previous_price: { type: Number },
		category: { type: String, required: true },
		product_collection: { type: String },
		categorys: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Category' } ],
		subcategorys: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Category' } ],
		subcategory: { type: String },
		countInStock: { type: Number, default: 30, required: true },
		count_in_stock: { type: Number, default: 30, required: true },
		quantity: { type: Number, default: 30, required: true },
		finite_stock: { type: Boolean, default: false },
		facts: { type: String },
		included_items: { type: String },
		contributers: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: '5f2d7c0e9005a57059801ce8' } ],
		description: { type: String },
		rating: { type: Number, default: 0 },
		numReviews: { type: Number, default: 0 },
		reviews: [ reviewSchema ],
		hidden: { type: Boolean, default: false },
		sale_price: { type: Number, default: 0 },
		sale_start_date: { type: Date },
		sale_end_date: { type: Date },
		deleted: { type: Boolean, default: false },
		preorder: { type: Boolean, default: false },
		pathname: { type: String },
		meta_title: { type: String },
		meta_description: { type: String },
		meta_keywords: { type: String },
		length: { type: Number },
		width: { type: Number },
		height: { type: Number },
		volume: { type: Number },
		package_length: { type: Number },
		package_width: { type: Number },
		package_height: { type: Number },
		package_volume: { type: Number },
		product_length: { type: Number },
		product_width: { type: Number },
		product_height: { type: Number },
		weight_pounds: { type: Number },
		weight_ounces: { type: Number },
		material_cost: { type: Number },
		filament_used: { type: Number },
		printing_time: { type: Number },
		assembly_time: { type: Number },
		order: { type: Number },
		item_group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
		chips: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Chip' } ],
		product_options: [ productOptionsSchema ],
		group_product: { type: Boolean, default: false },
		group_name: { type: String },
		products: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } ],

		color_product_group: { type: Boolean, default: false },
		color_group_name: { type: String },
		color_products: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } ],

		secondary_color_product_group: { type: Boolean, default: false },
		secondary_color_group_name: { type: String },
		secondary_color_products: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } ],

		secondary_product_group: { type: Boolean, default: false },
		secondary_group_name: { type: String },
		secondary_products: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } ],

		option_product_group: { type: Boolean, default: false },
		option_group_name: { type: String },
		option_products: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } ],
		color: { type: String },
		color_code: { type: String },
		size: { type: String },
		sizing: { type: String },
		default_option: { type: Boolean, default: false },
		option: { type: Boolean, default: false },
		macro_product: { type: Boolean, default: false },
		extra_cost: { type: Number }
	},
	{
		timestamps: true
	}
);

const productModel = mongoose.model('Product', productSchema);

export default productModel;
