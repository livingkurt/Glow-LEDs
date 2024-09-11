import mongoose from "mongoose";

const promoSchema = new mongoose.Schema(
  {
    affiliate: { type: mongoose.Schema.Types.ObjectId, ref: "Affiliate" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    promo_code: { type: String },
    promotionType: { type: String, enum: ["discount", "freeItem"], default: "discount" },
    requiredQuantity: { type: Number },
    requiredCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    requiredTags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    freeItemCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    freeItemTags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    admin_only: { type: Boolean, default: true },
    affiliate_only: { type: Boolean, default: false },
    sponsor_only: { type: Boolean, default: false },
    excluded_tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    excluded_tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    excluded_categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    included_categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    included_products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    excluded_products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    percentage_off: { type: Number },
    can_be_combined: { type: Boolean, default: false },
    free_shipping: { type: Boolean, default: false },
    amount_off: { type: Number },
    single_use: { type: Boolean },
    time_limit: { type: Boolean },
    start_date: { type: Date },
    end_date: { type: Date },
    used_once: { type: Boolean, default: false },
    minimum_total: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Promo = mongoose.model("Promo", promoSchema);

export default Promo;
