import { optionSchema, optionValueSchema } from "../products/product";
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    name: { type: String },
    currentOptions: [optionSchema],
    selectedOptions: [optionValueSchema],
    qty: { type: Number },
    max_quantity: { type: Number },
    quantity: { type: Number },
    display_image: { type: String }, // Uncomment on first migration
    // display_image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" }, // Uncomment on first migration uncomment on second migration
    display_image_object: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    secondary_image: { type: String },
    category: { type: String },
    count_in_stock: { type: Number },
    subcategory: { type: String },
    product_collection: { type: String },
    pathname: { type: String },
    size: { type: String },
    preorder: { type: Boolean },
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
    finite_stock: { type: Boolean },
    wholesale_product: { type: Boolean },
    wholesale_price: { type: Number },

    is_printing: { type: Boolean, default: false },
    is_crafting: { type: Boolean, default: false },
    is_crafted: { type: Boolean, default: false },
    is_packaged: { type: Boolean, default: false },
    reviewed: { type: Boolean, default: false },
    review_email_sent: { type: Boolean, default: false },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    // Depreciated
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

    secondary_color: { type: String },
    color_group_name: { type: String },
    secondary_color_group_name: { type: String },
    secondary_color_code: { type: String },
    secondary_group_name: { type: String },
    option_group_name: { type: String },
    color: { type: String },
    color_code: { type: String },
    price: { type: Number },
    add_on_price: { type: Number },
    show_add_on: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

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
  phone_number: { type: Boolean },
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

const changeLogSchema = {
  change: { type: String },
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  changedAt: { type: Date },
  deleted: { type: Boolean, default: false },
};

const OrderStatusEnum = {
  UNPAID: "unpaid",
  PAID: "paid",
  LABEL_CREATED: "label_created",
  CRAFTING: "crafting",
  CRAFTED: "crafted",
  PACKAGED: "packaged",
  SHIPPED: "shipped",
  IN_TRANSIT: "in_transit",
  OUT_FOR_DELIVERY: "out_for_delivery",
  DELIVERED: "delivered",
  RETURN_LABEL_CREATED: "return_label_created",
  CANCELED: "canceled",
};

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
    // Primary status
    status: {
      type: String,
      enum: Object.values(OrderStatusEnum),
      default: "unpaid",
    },
    // Exceptional statuses as booleans
    isReassured: { type: Boolean, default: false },
    isRefunded: { type: Boolean, default: false },
    isUpdated: { type: Boolean, default: false },
    isPaused: { type: Boolean, default: false },
    isError: { type: Boolean, default: false },
    isPrioritized: { type: Boolean, default: false },
    // Date fields for each status change
    reassuredAt: { type: Date },
    refundedAt: { type: Date },
    pausedAt: { type: Date },
    errorAt: { type: Date },
    updatedAt: { type: Date },
    // Tracking the primary status changes
    paidAt: { type: Date },
    craftingAt: { type: Date },
    craftedAt: { type: Date },
    packagedAt: { type: Date },
    shippedAt: { type: Date },
    inTransitAt: { type: Date },
    outForDeliveryAt: { type: Date },
    deliveredAt: { type: Date },
    status: { type: String, enum: Object.values(OrderStatusEnum), default: OrderStatusEnum.UNPAID },
    guest: { type: Boolean, default: false },
    parcel: { type: mongoose.Schema.Types.ObjectId, ref: "Parcel" },
    order_note: { type: String },
    change_log: [changeLogSchema],
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
