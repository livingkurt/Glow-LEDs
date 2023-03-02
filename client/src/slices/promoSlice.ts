/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const promoSlice = createSlice({
  name: "promos",
  initialState: {
    loading: false,
    promos: [],
    promo: {},
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
    [API.listPromos.pending]: (state: any, { payload }: any) => {
      state.loading = true;
      state.promos = [];
    },
    [API.listPromos.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.promos = payload.promos;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Promos Found";
    },
    [API.listPromos.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.createPromo.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.createPromo.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.promo = payload.promo;
      state.message = "Promo Saved";
    },
    [API.createPromo.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.updatePromo.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.updatePromo.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.promo = payload.promo;
      state.message = "Promo Saved";
    },
    [API.updatePromo.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsPromo.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsPromo.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.promo = payload;
      state.message = "Promo Found";
    },
    [API.detailsPromo.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deletePromo.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deletePromo.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.promo = payload.promo;
      state.message = "Promo Deleted";
    },
    [API.deletePromo.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_promo } = promoSlice.actions;
export default promoSlice.reducer;
