import { optionSchema, optionValueSchema } from "../products/product";
import mongoose from "mongoose";
import { sharedItemSchema } from "./shared_item";

const cartSchema = new mongoose.Schema(
  {
    cartItems: [sharedItemSchema],
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
