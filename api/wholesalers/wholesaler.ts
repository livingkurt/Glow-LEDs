import mongoose from "mongoose";
export {};

const wholesaler_schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company_name: { type: String },
    minimum_order_amount: { type: Number },
    deleted: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

const Wholesaler = mongoose.model("Wholesaler", wholesaler_schema);

export default Wholesaler;
