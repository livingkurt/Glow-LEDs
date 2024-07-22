import { optionSchema, optionValueSchema } from "../products/product";
import mongoose from "mongoose";

const cartItemsSchema = {
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  product_collection: { type: String },
  display_image: { type: String, required: true }, // Uncomment on first migration
  // display_image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" }, // Uncomment on first migration uncomment on second migration
  display_image_object: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  quantity: { type: Number },
  max_quantity: { type: Number },
  quantity: { type: Number },
  count_in_stock: { type: Number },

  currentOptions: [optionSchema],
  selectedOptions: [optionValueSchema],
  pathname: { type: String },
  sale_price: { type: Number },
  sale_start_date: { type: Date },
  sale_end_date: { type: Date },
  dimensions: {
    weight_pounds: { type: Number },
    weight_ounces: { type: Number },
    product_length: { type: Number },
    product_width: { type: Number },
    product_height: { type: Number },
    package_length: { type: Number },
    package_width: { type: Number },
    package_height: { type: Number },
    package_volume: { type: Number },
  },
  processing_time: [{ type: Number }],

  finite_stock: { type: Number },
  wholesale_product: { type: Boolean },
  wholesale_price: { type: Number },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
};

const cartSchema = new mongoose.Schema(
  {
    cartItems: [cartItemsSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
