import mongoose from "mongoose";

const wholesaler_schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company: { type: String },
    minimum_order_amount: { type: Number, default: 750 },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Wholesaler = mongoose.model("Wholesaler", wholesaler_schema);

export default Wholesaler;
