/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";
import { emptyOrder } from "../emptyState/order";

const orderPage = createSlice({
  name: "orderPage",
  initialState: {
    loading: false,
    loading_order: false,
    loadingPayment: false,
    orders: [],
    order: emptyOrder,
    message: "",
    success: false,
    success_no_pay_order: false,
    refundModal: false,
    remoteVersionRequirement: 0,
    edit_order_modal: false,
    hide_label_button: true,
    refundAmount: 0,
    refundReason: "",
    error: "",
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
    setLoadingPayment: (state, { payload }) => {
      state.loadingPayment = payload;
    },
    set_success: (state, { payload }) => {
      state.success = payload;
    },
    clear_order_state: (state, { payload }) => {
      state.order = emptyOrder;
    },
    set_edit_order_modal: (state, { payload }) => {
      state.edit_order_modal = payload;
    },
    open_create_order_modal: (state, { payload }) => {
      state.edit_order_modal = true;
      state.order = emptyOrder;
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
      state.order = emptyOrder;
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
    [API.listOrders.pending]: (state, { payload }) => {
      state.loading = true;
      state.orders = [];
    },
    [API.listOrders.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.orders = payload.orders;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Orders Found";
    },
    [API.listOrders.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.listMyOrders.pending]: (state, { payload }) => {
      state.loading = true;
      state.orders = [];
    },
    [API.listMyOrders.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.orders = payload;
      state.message = "Orders Found";
    },
    [API.listMyOrders.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.createPayOrder.pending]: (state, { payload }) => {
      state.loadingPayment = true;
      state.hideCheckoutButton = true;
    },
    [API.createPayOrder.fulfilled]: (state, { payload }) => {
      state.loadingPayment = false;
      state.success = true;
      state.order = payload.order;
      state.message = "Order Created and Paid";
    },
    [API.createPayOrder.rejected]: (state, { payload, error }) => {
      state.loadingPayment = false;
      // state.error = payload ? payload.error : error.message;
      // state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveOrder.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.saveOrder.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Order Saved";
      state.shippingModal = false;
      state.edit_order_modal = false;
      state.remoteVersionRequirement = Date.now();
    },
    [API.saveOrder.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.createNoPayOrder.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.createNoPayOrder.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Order Saved";
      state.shippingModal = false;
      state.edit_order_modal = false;
      state.order = payload;
      state.success_no_pay_order = true;
      state.remoteVersionRequirement = Date.now();
    },
    [API.createNoPayOrder.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsOrder.pending]: (state, { payload }) => {
      state.loading_order = true;
    },
    [API.detailsOrder.fulfilled]: (state, { payload }) => {
      state.loading_order = false;
      state.order = payload;
      state.message = "Order Found";
    },
    [API.detailsOrder.rejected]: (state, { payload, error }) => {
      state.loading_order = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteOrder.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteOrder.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Order Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteOrder.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteMultipleOrders.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteMultipleOrders.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Order Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteMultipleOrders.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.refundOrder.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.refundOrder.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.refund = true;
      state.refundModal = false;
      state.message = "Order Refunded";
      state.remoteVersionRequirement = Date.now();
    },
    [API.refundOrder.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.payOrder.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.payOrder.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.message = "Order Paied";
    },
    [API.payOrder.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.payOrderGuest.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.payOrderGuest.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.message = "Order Paid Guest";
    },
    [API.payOrderGuest.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.transferOrders.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.transferOrders.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.message = "Orders Transfered to New User";
    },
    [API.transferOrders.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },

    [API.buyLabel.fulfilled]: (state, { payload }) => {
      state.remoteVersionRequirement = Date.now();
    },
    [API.createLabel.fulfilled]: (state, { payload }) => {
      state.remoteVersionRequirement = Date.now();
    },
    [API.createReturnLabel.fulfilled]: (state, { payload }) => {
      state.remoteVersionRequirement = Date.now();
    },
    [API.createTracker.fulfilled]: (state, { payload }) => {
      state.remoteVersionRequirement = Date.now();
    },
    // [API.getShipments.fulfilled]: (state, { payload }) => {
    //   state.order = payload.order;
    // },
  },
});

export const {
  set_loading,
  setLoadingPayment,
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
