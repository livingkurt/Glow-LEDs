/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const promoSlice = createSlice({
  name: "promos",
  initialState: {
    loading: false,
    promos: [],
    promo: {
      id: "",
      affiliate: "",
      user: "",
      promo_code: "",
      admin_only: "",
      affiliate_only: "",
      sponsor_only: "",
      single_use: "",
      used_once: "",
      excluded_categories: [],
      excluded_products: [],
      included_categories: [],
      included_products: [],
      exclude: false,
      include: false,
      percentage_off: 0,
      amount_off: 0,
      minimum_total: 0,
      free_shipping: false,
      time_limit: false,
      active: "",
      start_date: "",
      end_date: ""
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
    set_promo: (state, { payload }) => {
      const updated_promo = payload;
      return {
        ...state,
        promo: { ...state.promo, ...updated_promo }
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
    [API.listPromos.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.promos = [];
    },
    [API.listPromos.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.promos = payload.promos;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Promos Found";
    },
    [API.listPromos.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.savePromo.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.savePromo.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Promo Saved";
    },
    [API.savePromo.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsPromo.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsPromo.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.promo = payload;
      state.message = "Promo Found";
    },
    [API.detailsPromo.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deletePromo.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deletePromo.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.promo = payload.promo;
      state.message = "Promo Deleted";
    },
    [API.deletePromo.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_promo } = promoSlice.actions;
export default promoSlice.reducer;
