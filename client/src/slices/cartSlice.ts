/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api/cartApi";

const cartSlice = createSlice({
  name: "carts",
  initialState: {
    loading: false,
    carts: [],
    cart: {
      id: "",
      user: undefined,
      artist_name: "",
      instagram_handle: "",
      facebook_name: "",
      percentage_off: "",
      sponsor: "",
      promoter: "",
      rave_mob: "",
      active: "",
      style: "",
      inspiration: "",
      bio: "",
      link: "",
      picture: "",
      location: "",
      years: "",
      team: "",
      video: "",
      venmo: "",
      products: [],
      chips: [],
      pathname: "",
      public_code: undefined,
      private_code: undefined
    },
    message: "",
    error: {},
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
      state.loading = false;
      state.cart = payload.cart;
      state.message = "Cart Saved";
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
      state.loading = false;
      state.cart = payload.cart;
      state.message = "Cart Saved";
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
