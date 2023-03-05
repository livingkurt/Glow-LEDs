/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    orders: [],
    order: {},
    message: "",
    // error: {},
    search: "",
    sort: "",
    page: 1,
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
    }
  },
  extraReducers: {
    [API.listOrders.pending]: (state: any, { payload }: any) => {
      state.loading = true;
      state.orders = [];
    },
    [API.listOrders.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.orders = payload.orders;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Orders Found";
    },
    [API.listOrders.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.createOrder.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.createOrder.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.order = payload.order;
      state.message = "Order Saved";
    },
    [API.createOrder.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.createOrderPayment.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.createOrderPayment.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.order = payload.order;
      state.message = "Order Saved";
    },
    [API.createOrderPayment.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.updateOrder.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.updateOrder.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.order = payload.order;
      state.message = "Order Saved";
    },
    [API.updateOrder.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsOrder.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsOrder.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.order = payload;
      state.message = "Order Found";
    },
    [API.detailsOrder.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteOrder.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteOrder.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.order = payload.order;
      state.message = "Order Deleted";
    },
    [API.deleteOrder.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_order } = orderSlice.actions;
export default orderSlice.reducer;
