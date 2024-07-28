/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

let my_cart;
const cart_string = localStorage.getItem("cartItems");

if (cart_string && cart_string !== "undefined" && cart_string !== null) {
  my_cart = { cartItems: cart_string && JSON.parse(cart_string) };
} else {
  my_cart = { cartItems: [] };
}

let shippingAddress;
const shipping_string = sessionStorage.getItem("shippingAddress");

if (shipping_string) {
  shippingAddress = JSON.parse(shipping_string);
} else {
  shippingAddress = {};
}

const cartPage = createSlice({
  name: "cartPage",
  initialState: {
    loading: false,
    loadingAddToCart: false,
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
    cartDrawer: false,
    sideNavDrawer: false,
  },
  reducers: {
    set_cart: (state, { payload }) => {
      const updated_cart = payload;
      return {
        ...state,
        cart: { ...state.cart, ...updated_cart },
      };
    },
    set_my_cart: (state, { payload }) => {
      const updated_cart = payload;
      return {
        ...state,
        my_cart: { ...state.cart, ...updated_cart },
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    save_payment_method: (state, { payload }) => {
      state.paymentMethod = payload;
    },
    save_shipping: (state, { payload }) => {
      const updated_shipping = payload;
      return {
        ...state,
        shipping: { ...state.shipping, ...updated_shipping },
      };
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
    setCartDrawer: (state, { payload }) => {
      state.cartDrawer = payload;
    },
    setSideNavDrawer: (state, { payload }) => {
      state.sideNavDrawer = payload;
    },
    updateGoogleShipping: (state, { payload }) => {
      const { shipping, street_num } = payload;

      if (!shipping || !shipping.address_components) {
        return;
      }

      const street_number = shipping.address_components.find(comp => comp.types.includes("street_number")) || {};

      const address = shipping.address_components.find(comp => comp.types.includes("route"));
      const city = shipping.address_components.find(comp => comp.types.includes("locality"));
      const stateObj = shipping.address_components.find(comp => comp.types.includes("administrative_area_level_1"));
      const country = shipping.address_components.find(comp => comp.types.includes("country"));
      const postal_code = shipping.address_components.find(comp => comp.types.includes("postal_code"));

      state.shipping.address_1 = `${(street_number && street_number.long_name) || street_num.split(" ")[0]} ${
        address.short_name
      }`;
      state.shipping.city = city.long_name || city.short_name;
      state.shipping.state = stateObj.short_name;
      state.shipping.postalCode = postal_code.long_name;
      state.shipping.country = country.short_name;

      if (country.short_name !== "US") {
        state.shipping.international = true;
        state.shipping.state = stateObj.short_name;
        state.shipping.country = country.long_name;
      }
    },
  },
  extraReducers: {
    [API.listCarts.pending]: (state, { payload }) => {
      state.loading = true;
      state.carts = [];
    },
    [API.listCarts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.carts = payload.carts;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Carts Found";
    },
    [API.listCarts.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveCart.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.saveCart.fulfilled]: (state, { payload }) => {
      state.success = true;
      state.message = "Cart Created";
      state.edit_cart_modal = false;
      state.remoteVersionRequirement = Date.now();
      state.loading = false;
    },
    [API.saveCart.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.updateQuantity.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.updateQuantity.fulfilled]: (state, { payload }) => {
      const { data, current_user } = payload;
      state.my_cart = data;
      // Only update local storage if the user is not logged in
      if (Object.keys(current_user).length === 0) {
        localStorage.setItem("cartItems", JSON.stringify(data.cartItems));
      }
      state.loading = false;
    },
    [API.updateQuantity.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.addToCart.pending]: (state, { payload }) => {
      state.loadingAddToCart = true;
    },
    [API.addToCart.fulfilled]: (state, { payload }) => {
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
      state.cartDrawer = true;
      state.message = "Cart Created";
      state.edit_cart_modal = false;
      state.loadingAddToCart = false;
    },

    [API.addToCart.rejected]: (state, { payload, error }) => {
      state.loadingAddToCart = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsCart.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsCart.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.cart = payload;
      state.message = "Cart Found";
    },
    [API.detailsCart.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteCart.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteCart.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.my_cart = { cartItems: [] };
      state.message = "Cart Deleted";
      localStorage.removeItem("cartItems");
    },
    [API.deleteCart.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteCartItem.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteCartItem.fulfilled]: (state, { payload }) => {
      const { data, type } = payload;
      state.loading = false;
      if (data.message === "Cart Deleted") {
        state.my_cart = { cartItems: [] };
        localStorage.removeItem("cartItems");
      } else if (data.message === "Cart is now empty") {
        state.my_cart = { cartItems: [] };
        localStorage.removeItem("cartItems");
      } else if (type === "add_to_cart") {
        state.my_cart = data;
        localStorage.setItem("cartItems", JSON.stringify(data.cartItems));
      } else if (type === "edit_cart") {
        state.cart = data;
      }
      state.message = "Cart Deleted";
    },
    [API.deleteCartItem.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.createPayOrder.fulfilled]: (state, { payload }) => {
      state.cart = {};
    },
    [API.emptyCart.fulfilled]: (state, { payload }) => {
      localStorage.removeItem("cartItems");
      state.my_cart = { cartItems: [] };
    },
    [API.emptyCart.rejected]: (state, { payload }) => {
      localStorage.removeItem("cartItems");
      state.my_cart = { cartItems: [] };
    },
    [API.getCurrentUserCart.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.getCurrentUserCart.fulfilled]: (state, { payload }) => {
      if (payload !== state.my_cart && payload.cartItems) {
        state.loading = false;
        state.my_cart = payload;
        state.message = "User Cart Found";
      }
    },
    [API.getCurrentUserCart.rejected]: (state, { payload, error }) => {
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
  setCartDrawer,
  setSideNavDrawer,
  updateGoogleShipping,
  set_my_cart,
} = cartPage.actions;
export default cartPage.reducer;
