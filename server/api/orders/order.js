import mongoose from "mongoose";
import { sharedItemSchema } from "../carts/shared_item";

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
  phone_number: { type: String },
  country: { type: String },
  address_string: { type: String },
};

const paymentSchema = {
  paymentMethod: { type: String },
  payment: { type: Object },
  charge: { type: Object },
  refund: { type: Array },
  refund_reason: { type: Array },
  last4: { type: String },
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

const orderItemSchema = {
  ...sharedItemSchema,
  reviewed: { type: Boolean, default: false },
  review_email_sent: { type: Boolean, default: false },
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
    serviceFee: { type: Number },
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
    isPrintIssue: { type: Boolean, default: false },
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
