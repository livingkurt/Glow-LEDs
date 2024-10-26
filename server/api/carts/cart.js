import mongoose from "mongoose";
import { sharedItemSchema } from "./shared_item.js";

const cartSchema = new mongoose.Schema(
  {
    cartItems: [sharedItemSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    affiliate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Affiliate",
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
