/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const orderPage = createSlice({
  name: "orderPage",
  initialState: {
    loading: false,
    loading_payment: false,
    orders: [],
    order: {
      user: {},
      orderItems: [],
      messages: [],
      shipping: {},
      payment: {},
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
      isManufactured: false,
      manufacturedAt: "",
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
      error: { type: Object },
      deleted: false
    },
    message: "",
    // error: {},
    search: "",
    sort: "",
    page: 1,
    success: false,
    limit: 10,
    sort_options: ["Newest", "Artist Name", "Facebook Name", "Instagram Handle", "Sponsor", "Promoter"],
    colors: [
      { name: "Sponsor", color: "#3e4c6d" },
      { name: "Promoter", color: "#7d5555" },
      { name: "Team", color: "#557d6c" },
      { name: "Not Active", color: "#757575" },
      { name: "Rave Mob", color: "#55797d" }
    ]
  },
  reducers: {
    set_order: (state, { payload }) => {
      const updated_order = payload;
      return {
        ...state,
        order: { ...state.order, ...updated_order }
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_loading_payment: (state, { payload }) => {
      state.loading_payment = payload;
    },
    set_search: (state, { payload }) => {
      state.search = payload;
    },
    set_sort: (state, { payload }) => {
      state.sort = payload;
    },
    set_page: (state, { payload }) => {
      state.page = payload;
    },
    set_limit: (state, { payload }) => {
      state.limit = payload;
    },
    set_success: (state, { payload }) => {
      state.success = payload;
    },
    clear_order_state: (state, { payload }) => {
      state.order = {
        user: {},
        orderItems: [],
        messages: [],
        shipping: {},
        payment: {},
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
        isManufactured: false,
        manufacturedAt: "",
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
        error: { type: Object },
        deleted: false
      };
    }
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
    [API.createPayOrderGuest.pending as any]: (state: any, { payload }: any) => {
      state.loading_payment = true;
    },
    [API.createPayOrderGuest.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading_payment = false;
      state.success = true;
      state.order = payload.order;
      state.message = "Guest Order Created and Paid";
    },
    [API.createPayOrderGuest.rejected as any]: (state: any, { payload }: any) => {
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
    },
    [API.saveOrder.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsOrder.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsOrder.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.order = payload;
      state.message = "Order Found";
    },
    [API.detailsOrder.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteOrder.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteOrder.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Order Deleted";
    },
    [API.deleteOrder.rejected as any]: (state: any, { payload }: any) => {
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
      state.message = "Order Refunded";
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
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_loading_payment, set_order, clear_order_state } =
  orderPage.actions;
export default orderPage.reducer;
