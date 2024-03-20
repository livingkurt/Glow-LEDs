// import mongoose from 'mongoose';

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    first_name: { type: String },
    last_name: { type: String },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const optionValueSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Blue", "Large"
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // Link to product variations
  // images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }], // Specific images for this optièon value, if necessary
  isDefault: { type: Boolean, default: false },
  replacePrice: { type: Boolean, default: false },
  additionalCost: { type: Number, default: 0 },
  isAddOn: { type: Boolean, default: false },
  splitImage: { type: Number, default: 0 },
});

export const optionSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Color", "Size"
  values: [optionValueSchema],
  optionType: { type: String, required: true },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    images_object: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    color_images_object: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    secondary_color_images_object: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    option_images_object: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    secondary_images_object: { type: Array },
    video: { type: String },
    brand: { type: String, required: true },
    price: { type: Number },
    wholesale_price: { type: Number },
    wholesale_product: { type: Boolean, default: false },
    previous_price: { type: Number },
    category: { type: String, required: true },
    subcategory: { type: String },
    product_collection: { type: String },
    categorys: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    subcategorys: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    quantity: { type: Number, default: 30, required: true },
    finite_stock: { type: Boolean, default: false },
    facts: { type: String },
    included_items: { type: String },
    contributers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: "5f2d7c0e9005a57059801ce8" }],
    description: { type: String },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: [reviewSchema],
    options: [optionSchema], // Embed the options schema here
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: null }, // Reference to parent product, if this is a variation
    isVariation: { type: Boolean, default: false }, // Flag to indicate if this is a variation
    hidden: { type: Boolean, default: false },
    sale_price: { type: Number, default: 0 },
    sale_start_date: { type: Date },
    sale_end_date: { type: Date },
    deleted: { type: Boolean, default: false },
    preorder: { type: Boolean, default: false },
    sold_out: { type: Boolean, default: false },
    pathname: { type: String },
    meta_title: { type: String },
    meta_description: { type: String },
    meta_keywords: { type: String },
    package_length: { type: Number },
    package_width: { type: Number },
    package_height: { type: Number },
    package_volume: { type: Number },
    product_length: { type: Number },
    product_width: { type: Number },
    product_height: { type: Number },
    weight_pounds: { type: Number },
    weight_ounces: { type: Number },
    processing_time: { type: Array },
    material_cost: { type: Number },
    filament_used: { type: Number },
    printing_time: { type: Number },
    assembly_time: { type: Number },
    order: { type: Number },
    chips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chip" }],
    filament: { type: mongoose.Schema.Types.ObjectId, ref: "Filament" },
    has_add_on: { type: Boolean, default: false },

    color: { type: String },
    color_code: { type: String },
    size: { type: String },
    sizing: { type: String },
    // Depreciated
    count_in_stock: { type: Number, default: 30, required: true },
    item_group_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    images: { type: Array },
    color_images: { type: Array },
    secondary_color_images: { type: Array },
    option_images: { type: Array },
    secondary_images: { type: Array },

    color_product_group: { type: Boolean, default: false },
    color_group_name: { type: String },
    color_products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    secondary_color_product_group: { type: Boolean, default: false },
    secondary_color_group_name: { type: String },
    secondary_color_products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    secondary_product_group: { type: Boolean, default: false },
    secondary_group_name: { type: String },
    secondary_products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

    option_product_group: { type: Boolean, default: false },
    option_group_name: { type: String },
    option_products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    default_option: { type: Boolean, default: false },
    option: { type: Boolean, default: false },
    macro_product: { type: Boolean, default: false },
    extra_cost: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
