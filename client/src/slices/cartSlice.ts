/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
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
    paymentMethod: "",
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
    add_to_cart: (state, { payload }) => {
      state.cartItems = payload;
    }
  },
  extraReducers: {
    [API.listCarts.pending]: (state: any, { payload }: any) => {
      state.loading = true;
      state.carts = [];
    },
    [API.listCarts.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.carts = payload.carts;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Carts Found";
    },
    [API.listCarts.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.createCart.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.createCart.fulfilled]: (state: any, { payload }: any) => {
      const { data, type } = payload;
      if (type === "add_to_cart") {
        state.my_cart = data;
        localStorage.setItem("my_cart", JSON.stringify(data));
      }
      if (type === "edit_cart") {
        state.cart = data;
      }
      state.message = "Cart Created";
      state.loading = false;
    },
    [API.createCart.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.updateCart.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.updateCart.fulfilled]: (state: any, { payload }: any) => {
      const { data, type } = payload;
      state.loading = false;
      if (type === "add_to_cart") {
        state.my_cart = data;
        localStorage.setItem("my_cart", JSON.stringify(data));
      }
      if (type === "edit_cart") {
        state.cart = data;
      }
      state.message = "Cart Updated";
    },
    [API.updateCart.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsCart.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsCart.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.cart = payload;
      state.message = "Cart Found";
    },
    [API.detailsCart.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteCart.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteCart.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.cart = payload.cart;
      state.message = "Cart Deleted";
    },
    [API.deleteCart.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_cart } = cartSlice.actions;
export default cartSlice.reducer;
