/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const cartSlice = createSlice({
  name: "carts",
  initialState: {
    loading: false,
    my_cart: {
      // cartItems: []
    },
    carts: [],
    cart: {
      cartItems: []
    },
    message: "",
    error: {},
    success: false,
    shipping: {
      first_name: "",
      last_name: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postalCode: "",
      international: false,
      country: ""
    },
    search: "",
    sort: "",
    page: 1,
    limit: 10,
    paymentMethod: "stripe",
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
    set_cart: (state, { payload }) => {
      const updated_cart = payload;
      return {
        ...state,
        cart: { ...state.cart, ...updated_cart }
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
    },
    save_payment_method: (state, { payload }) => {
      state.paymentMethod = payload;
    },
    save_shipping: (state, { payload }) => {
      state.shipping = payload;
    },
    remove_from_cart: (state, { payload }) => {
      state.shipping = payload;
    },
    set_success: (state, { payload }) => {
      state.success = payload;
    }
  },
  extraReducers: {
    [API.listCarts.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.carts = [];
    },
    [API.listCarts.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.carts = payload.carts;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Carts Found";
    },
    [API.listCarts.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.saveCart.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveCart.fulfilled as any]: (state: any, { payload }: any) => {
      const { data, type } = payload;
      if (type === "add_to_cart") {
        state.my_cart = data;
        localStorage.setItem("my_cart", JSON.stringify(data));
      }
      if (type === "edit_cart") {
        state.cart = data;
      }
      state.success = true;
      state.message = "Cart Created";
      state.loading = false;
    },
    [API.saveCart.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsCart.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsCart.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.cart = payload;
      state.message = "Cart Found";
    },
    [API.detailsCart.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteCart.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteCart.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.my_cart = { cartItems: [] };
      state.message = "Cart Deleted";
      localStorage.removeItem("my_cart");
    },
    [API.deleteCart.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteCartItem.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteCartItem.fulfilled as any]: (state: any, { payload }: any) => {
      const { data, type } = payload;
      state.loading = false;
      if (data.message === "Cart Deleted") {
        state.my_cart = { cartItems: [] };
        localStorage.removeItem("my_cart");
      } else if (type === "add_to_cart") {
        state.my_cart = data;
        localStorage.setItem("my_cart", JSON.stringify(data));
      } else if (type === "edit_cart") {
        state.cart = data;
      }
      state.message = "Cart Deleted";
    },
    [API.deleteCartItem.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.createPayOrder.fulfilled as any]: (state: any, { payload }: any) => {
      state.cart = {};
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_cart, save_shipping, save_payment_method, set_success } =
  cartSlice.actions;
export default cartSlice.reducer;
