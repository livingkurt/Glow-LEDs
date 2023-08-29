/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

let my_cart: any;
const cart_string: any = localStorage.getItem("cartItems");

if (cart_string) {
  my_cart = { cartItems: JSON.parse(cart_string) };
} else {
  my_cart = { cartItems: [] };
}

let shippingAddress: any;
const shipping_string: any = sessionStorage.getItem("shippingAddress");

if (shipping_string) {
  shippingAddress = JSON.parse(shipping_string);
} else {
  shippingAddress = {};
}

const cartPage = createSlice({
  name: "cartPage",
  initialState: {
    loading: false,
    my_cart: { ...my_cart },
    carts: [],
    cart: {
      cartItems: [],
    },
    message: "",
    error: {},
    success: false,
    shipping: {
      ...shippingAddress,
      first_name: "",
      last_name: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postalCode: "",
      international: false,
      country: "",
    },
    remoteVersionRequirement: 0,
    edit_cart_modal: false,
    cart_modal: false,
    paymentMethod: "stripe",
  },
  reducers: {
    set_cart: (state, { payload }) => {
      const updated_cart = payload;
      return {
        ...state,
        cart: { ...state.cart, ...updated_cart },
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
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
    },
    set_edit_cart_modal: (state, { payload }) => {
      state.edit_cart_modal = payload;
    },
    open_create_cart_modal: (state, { payload }) => {
      state.edit_cart_modal = true;
      state.cart = {
        cartItems: [],
      };
    },
    open_edit_cart_modal: (state, { payload }) => {
      state.edit_cart_modal = true;
      state.cart = payload;
    },
    close_cart_modal: (state, { payload }) => {
      state.cart_modal = false;
      state.cart = {
        cartItems: [],
      };
    },
    open_cart_modal: (state, { payload }) => {
      state.cart_modal = true;
      state.cart = payload;
    },
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
    [API.listCarts.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveCart.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveCart.fulfilled as any]: (state: any, { payload }: any) => {
      state.success = true;
      state.message = "Cart Created";
      state.edit_cart_modal = false;
      state.remoteVersionRequirement = Date.now();
      state.loading = false;
    },
    [API.saveCart.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.updateQuantity.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.updateQuantity.fulfilled as any]: (state: any, { payload }: any) => {
      const { data, current_user } = payload;
      state.my_cart = data;
      // Only update local storage if the user is not logged in
      if (Object.keys(current_user).length === 0) {
        localStorage.setItem("cartItems", JSON.stringify(data.cartItems));
      }
      state.loading = false;
    },
    [API.updateQuantity.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.addToCart.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.addToCart.fulfilled as any]: (state: any, { payload }: any) => {
      const { data, type, current_user } = payload;
      if (type === "add_to_cart") {
        state.my_cart = data;
        // Only update local storage if the user is not logged in
        if (Object.keys(current_user).length === 0) {
          localStorage.setItem("cartItems", JSON.stringify(data.cartItems));
        }
      }
      if (type === "edit_cart") {
        state.cart = data;
      }
      state.success = true;
      state.message = "Cart Created";
      state.edit_cart_modal = false;
      state.loading = false;
    },

    [API.addToCart.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsCart.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsCart.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.cart = payload;
      state.message = "Cart Found";
    },
    [API.detailsCart.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteCart.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteCart.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.my_cart = { cartItems: [] };
      state.message = "Cart Deleted";
      localStorage.removeItem("cartItems");
    },
    [API.deleteCart.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteCartItem.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteCartItem.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      if (payload.data) {
        if (payload.data.message === "Cart Deleted") {
          state.my_cart = { cartItems: [] };
          localStorage.removeItem("cartItems");
        } else if (payload.type === "add_to_cart") {
          state.my_cart = payload.data;
          localStorage.setItem("cartItems", JSON.stringify(payload.data.cartItems));
        } else if (payload.type === "edit_cart") {
          state.cart = payload.data;
        }
      }
      state.message = "Cart Deleted";
    },
    [API.deleteCartItem.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.createPayOrder.fulfilled as any]: (state: any, { payload }: any) => {
      state.cart = {};
    },
    [API.emptyCart.fulfilled as any]: (state: any, { payload }: any) => {
      console.log("Empty Cart");
      localStorage.removeItem("cartItems");
      state.my_cart = { cartItems: [] };
    },
    [API.emptyCart.rejected as any]: (state: any, { payload }: any) => {
      console.log("Empty Cart");
      localStorage.removeItem("cartItems");
      state.my_cart = { cartItems: [] };
    },
    [API.getCurrentUserCart.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.getCurrentUserCart.fulfilled as any]: (state: any, { payload }: any) => {
      if (payload !== state.my_cart && payload.cartItems) {
        state.loading = false;
        state.my_cart = payload;
        state.message = "User Cart Found";
      }
    },
    [API.getCurrentUserCart.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_cart,
  save_shipping,
  save_payment_method,
  set_success,
  set_edit_cart_modal,
  open_create_cart_modal,
  open_cart_modal,
  close_cart_modal,
  open_edit_cart_modal,
} = cartPage.actions;
export default cartPage.reducer;
