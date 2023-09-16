import mongoose from "mongoose";
export {};

const shippingSchema = {
  first_name: { type: String, default: "" },
  last_name: { type: String, default: "" },
  address_1: { type: String, default: "" },
  address_2: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  postalCode: { type: String, default: "" },
  international: { type: Boolean, default: false },
  country: { type: String, default: "" },
};

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: {
      type: String,
      required: true,
    },
    shipping: shippingSchema,
    password: { type: String },
    stripe_connect_id: { type: String },
    isAdmin: { type: Boolean, required: true, default: false },
    isVerified: { type: Boolean, required: true, default: false },
    is_affiliated: { type: Boolean, required: true, default: false },
    is_employee: { type: Boolean, required: true, default: false },
    weekly_wage: { type: Number },
    palettes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Palette" }],
    affiliate: { type: mongoose.Schema.Types.ObjectId, ref: "Affiliate" },
    employee_code: { type: mongoose.Schema.Types.ObjectId, ref: "Promo" },
    email_subscription: { type: Boolean, default: true },
    guest: { type: Boolean },
    wholesaler: { type: mongoose.Schema.Types.ObjectId, ref: "Wholesaler" },
    isWholesaler: { type: Boolean, default: false },
    minimum_order_amount: { type: Number },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const userModal = mongoose.model("User", userSchema);

export default userModal;
