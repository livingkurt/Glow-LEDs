import mongoose from "mongoose";
export {};

const cartItemsSchema = {
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  display_image: { type: String, required: true },
  secondary_image: { type: String },
  color: { type: String },
  secondary_color: { type: String },
  color_group_name: { type: String },
  secondary_color_group_name: { type: String },
  color_code: { type: String },
  secondary_color_code: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  product_collection: { type: String },
  pathname: { type: String },
  size: { type: String },
  preorder: { type: Boolean },
  sale_price: { type: Number },
  sale_start_date: { type: Date },
  sale_end_date: { type: Date },
  package_volume: { type: Number },
  weight_pounds: { type: Number },
  weight_ounces: { type: Number },
  count_in_stock: { type: Number },
  length: { type: Number },
  width: { type: Number },
  height: { type: Number },
  package_length: { type: Number },
  package_width: { type: Number },
  package_height: { type: Number },
  processing_time: [{ type: Number }],
  quantity: { type: Number },
  finite_stock: { type: Number },
  add_on_price: { type: Number },
  show_add_on: { type: Boolean },
  wholesale_product: { type: Boolean },
  wholesale_price: { type: Number },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  color_product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  color_product_name: { type: String },
  secondary_color_product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  secondary_color_product_name: { type: String },
  option_product_name: { type: String },
  option_product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  secondary_product_name: { type: String },
  secondary_product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }
};

const cartSchema = new mongoose.Schema(
  {
    cartItems: [cartItemsSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    deleted: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
