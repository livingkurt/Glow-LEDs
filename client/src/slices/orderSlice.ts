/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const order = {
  user: {},
  orderItems: [],
  messages: [],
  shipping: {
    shipment_id: "",
    shipping_rate: {},
    shipping_label: {},
    shipment_tracker: {},
    return_shipment_id: "",
    return_shipping_rate: {},
    return_shipping_label: {},
    return_shipment_tracker: {},
    first_name: "",
    last_name: "",
    email: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postalCode: "",
    international: "",
    country: "",
  },
  payments: [{ paymentMethod: "stripe", payment: {}, charge: {}, refund: [], refund_reason: "" }],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  refundTotal: 0,
  guest: false,
  isPaid: false,
  paidAt: "",
  isReassured: false,
  reassuredAt: "",
  isCrafting: false,
  craftingAt: "",
  isCrafted: false,
  craftedAt: "",
  isPackaged: false,
  packagedAt: "",
  isShipped: false,
  shippedAt: "",
  isInTransit: false,
  inTransitAt: "",
  isOutForDelivery: false,
  outForDeliveryAt: "",
  isDelivered: false,
  deliveredAt: "",
  isRefunded: false,
  isPaused: false,
  pausedAt: "",
  parcel: {},
  refundedAt: "",
  order_note: "",
  production_note: "",
  tip: 0,
  promo_code: "",
  tracking_number: "",
  tracking_url: "",
  return_tracking_number: "",
  is_error: false,
  error_at: "",
  error: false,
};

const orderPage = createSlice({
  name: "orderPage",
  initialState: {
    loading: false,
    loading_order: false,
    loading_payment: false,
    orders: [],
    order: order,
    message: "",
    success: false,
    success_order: false,
    success_no_pay_order: false,
    refundModal: false,
    remoteVersionRequirement: 0,
    edit_order_modal: false,
    hide_label_button: true,
    refundAmount: 0,
    refundReason: "",
    shippingModal: false,
    createLabelModal: false,
    loading_label: false,
  },
  reducers: {
    set_order: (state, { payload }) => {
      const updated_order = payload;
      return {
        ...state,
        order: { ...state.order, ...updated_order },
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_loading_payment: (state, { payload }) => {
      state.loading_payment = payload;
    },
    set_success: (state, { payload }) => {
      state.success = payload;
    },
    clear_order_state: (state, { payload }) => {
      state.order = order;
    },
    set_edit_order_modal: (state, { payload }) => {
      state.edit_order_modal = payload;
    },
    open_create_order_modal: (state, { payload }) => {
      state.edit_order_modal = true;
      state.order = order;
    },

    open_edit_order_modal: (state, { payload }) => {
      state.edit_order_modal = true;
      state.order = payload;
    },
    close_edit_order_modal: (state, { payload }) => {
      state.edit_order_modal = false;
    },
    set_hide_label_button: (state, { payload }) => {
      state.hide_label_button = payload;
    },
    set_loading_label: (state, { payload }) => {
      state.loading_label = payload;
    },
    setRemoteVersionRequirement: (state, { payload }) => {
      state.remoteVersionRequirement = Date.now();
    },
    openShippingModal: (state, { payload }) => {
      state.shippingModal = true;
      state.order = payload;
    },
    openRefundModal: (state, { payload }) => {
      state.refundModal = true;
      state.order = payload;
    },
    closeRefundModal: (state, { payload }) => {
      state.refundModal = false;
      state.order = order;
    },
    setRefundAmount: (state, { payload }) => {
      state.refundAmount = payload;
    },
    setRefundReason: (state, { payload }) => {
      state.refundReason = payload;
    },
    closeShippingModal: (state, { payload }) => {
      state.shippingModal = false;
    },
  },
  extraReducers: {
    [API.listOrders.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.orders = [];
    },
    [API.listOrders.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.orders = payload.orders;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Orders Found";
    },
    [API.listOrders.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.listMyOrders.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.orders = [];
    },
    [API.listMyOrders.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.orders = payload;
      state.message = "Orders Found";
    },
    [API.listMyOrders.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.createPayOrder.pending as any]: (state: any, { payload }: any) => {
      state.loading_payment = true;
    },
    [API.createPayOrder.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading_payment = false;
      state.success = true;
      state.order = payload.order;
      state.message = "Order Created and Paid";
    },
    [API.createPayOrder.rejected as any]: (state: any, { payload }: any) => {
      state.loading_payment = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.saveOrder.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveOrder.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Order Saved";
      state.shippingModal = false;
      state.edit_order_modal = false;
      state.remoteVersionRequirement = Date.now();
    },
    [API.saveOrder.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.createNoPayOrder.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.createNoPayOrder.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Order Saved";
      state.shippingModal = false;
      state.edit_order_modal = false;
      state.order = payload;
      state.success_no_pay_order = true;
      state.remoteVersionRequirement = Date.now();
    },
    [API.createNoPayOrder.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsOrder.pending as any]: (state: any, { payload }: any) => {
      state.loading_order = true;
    },
    [API.detailsOrder.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading_order = false;
      state.order = payload;
      state.message = "Order Found";
    },
    [API.detailsOrder.rejected as any]: (state: any, { payload }: any) => {
      state.loading_order = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteOrder.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteOrder.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Order Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteOrder.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteMultipleOrders.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteMultipleOrders.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Order Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteMultipleOrders.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.refundOrder.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.refundOrder.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.refund = true;
      state.refundModal = false;
      state.message = "Order Refunded";
      state.remoteVersionRequirement = Date.now();
    },
    [API.refundOrder.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.payOrder.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.payOrder.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.success = true;
      state.message = "Order Paied";
    },
    [API.payOrder.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.payOrderGuest.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.payOrderGuest.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.success = true;
      state.message = "Order Paid Guest";
    },
    [API.payOrderGuest.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.transferOrders.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.transferOrders.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.success = true;
      state.message = "Orders Transfered to New User";
    },
    [API.transferOrders.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },

    [API.buyLabel.fulfilled as any]: (state: any, { payload }: any) => {
      state.remoteVersionRequirement = Date.now();
    },
    [API.createLabel.fulfilled as any]: (state: any, { payload }: any) => {
      state.remoteVersionRequirement = Date.now();
    },
    [API.createReturnLabel.fulfilled as any]: (state: any, { payload }: any) => {
      state.remoteVersionRequirement = Date.now();
    },
    [API.createTracker.fulfilled as any]: (state: any, { payload }: any) => {
      state.remoteVersionRequirement = Date.now();
    },
  },
});

export const {
  set_loading,
  set_loading_payment,
  set_order,
  clear_order_state,
  set_edit_order_modal,
  open_create_order_modal,
  openRefundModal,
  close_edit_order_modal,
  open_edit_order_modal,
  setRemoteVersionRequirement,
  set_hide_label_button,
  set_loading_label,
  openShippingModal,
  closeRefundModal,
  setRefundAmount,
  setRefundReason,
  closeShippingModal,
} = orderPage.actions;
export default orderPage.reducer;
