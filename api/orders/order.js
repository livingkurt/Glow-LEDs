import mongoose from "mongoose";
export {};

const shippingSchema = {
  shipment_id: { type: String },
  shipping_rate: { type: Object },
  shipping_label: { type: Object },
  shipment_tracker: { type: Object },
  return_shipment_id: { type: String },
  return_shipping_rate: { type: Object },
  return_shipping_label: { type: Object },
  return_shipment_tracker: { type: Object },
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  address: { type: String },
  address_1: { type: String },
  address_2: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  international: { type: Boolean },
  country: { type: String },
};

const paymentSchema = {
  paymentMethod: { type: String },
  payment: { type: Object },
  charge: { type: Object },
  refund: { type: Array },
  refund_reason: { type: Array },
};
const paymentsSchema = {
  paymentMethod: { type: String },
  stripePaymentIntentId: { type: String },
  stripePaymentId: { type: String },
  amount: { type: Number },
  isPaid: { type: Boolean },
  paidAt: { type: Date },
  brand: { type: String },
  last4: { type: String },
};
const refundsSchema = {
  refundId: { type: String },
  amount: { type: Number },
  reason: { type: String },
  isRefunded: { type: Boolean },
  refundedAt: { type: Date },
};

const messageSchema = {
  message: { type: String },
  user: { type: Boolean },
  admin: { type: Boolean },
  deleted: { type: Boolean, default: false },
};

const productOptionsSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  sale_price: { type: Number, default: 0 },
  size: { type: Number },
  color: { type: String },
});

const orderItemSchema = new mongoose.Schema(
  {
    name: { type: String },
    qty: { type: Number },
    display_image: { type: String },
    secondary_image: { type: String },
    color: { type: String },
    secondary_color: { type: String },
    color_group_name: { type: String },
    is_printing: { type: Boolean, default: false },
    is_crafting: { type: Boolean, default: false },
    is_crafted: { type: Boolean, default: false },
    is_packaged: { type: Boolean, default: false },
    secondary_color_group_name: { type: String },
    secondary_color_code: { type: String },
    secondary_group_name: { type: String },
    option_group_name: { type: String },
    color_code: { type: String },
    price: { type: Number },
    add_on_price: { type: Number },
    show_add_on: { type: Boolean },
    category: { type: String },
    count_in_stock: { type: Number },
    subcategory: { type: String },
    pathname: { type: String },
    size: { type: String },
    preorder: { type: Boolean },
    sale_price: { type: Number },
    package_volume: { type: Number },
    weight_pounds: { type: Number },
    weight_ounces: { type: Number },
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
    package_length: { type: Number },
    package_width: { type: Number },
    package_height: { type: Number },
    reviewed: { type: Boolean, default: false },
    review_email_sent: { type: Boolean, default: false },
    product_option: productOptionsSchema,
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    color_product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    color_product_name: { type: String },
    secondary_color_product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    secondary_color_product_name: { type: String },
    option_product_name: { type: String },
    option_product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    secondary_product_name: { type: String },
    secondary_product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderItems: [orderItemSchema],
    messages: [messageSchema],
    shipping: shippingSchema,
    payment: paymentSchema, // Deprecated
    payments: [paymentsSchema],
    refunds: [refundsSchema],
    itemsPrice: { type: Number },
    taxPrice: { type: Number },
    shippingPrice: { type: Number },
    totalPrice: { type: Number },
    refundTotal: { type: Number },
    guest: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isPickup: { type: Boolean, default: false },
    pickupAt: { type: Date },
    isReassured: { type: Boolean, default: false },
    reassuredAt: { type: Date },
    isUpdated: { type: Boolean, default: false },
    updatedAt: { type: Date },
    isManufactured: { type: Boolean, default: false },
    manufacturedAt: { type: Date },
    isCrafting: { type: Boolean, default: false },
    craftingAt: { type: Date },
    isCrafted: { type: Boolean, default: false },
    craftedAt: { type: Date },
    isPackaged: { type: Boolean, default: false },
    packagedAt: { type: Date },
    isShipped: { type: Boolean, default: false },
    shippedAt: { type: Date },
    isInTransit: { type: Boolean, default: false },
    inTransitAt: { type: Date },
    isOutForDelivery: { type: Boolean, default: false },
    outForDeliveryAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    isRefunded: { type: Boolean, default: false },
    isPaused: { type: Boolean, default: false },
    pausedAt: { type: Date },
    parcel: { type: mongoose.Schema.Types.ObjectId, ref: "Parcel" },
    refundedAt: { type: Date },
    order_note: { type: String },
    production_note: { type: String },
    tip: { type: Number },
    promo_code: { type: String },
    tracking_number: { type: String },
    tracking_url: { type: String },
    return_tracking_number: { type: String },
    return_tracking_url: { type: String },
    is_error: { type: Boolean, default: false },
    error_at: { type: Date },
    error: { type: Object },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
