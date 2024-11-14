import mongoose from "mongoose";
import { sharedItemSchema } from "./shared_item.js";

const cartSchema = new mongoose.Schema(
  {
    title: { type: String },
    subtitle: { type: String },
    short_description: { type: String },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    cartItems: [sharedItemSchema],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    video: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    affiliate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Affiliate",
    },
    pathname: { type: String },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
