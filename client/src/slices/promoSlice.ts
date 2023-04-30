/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";
import { format_date } from "../utils/helper_functions";

const promo = {
  id: "",
  affiliate: "",
  team: "",
  amount: 0,
  venmo: "",
  paid: "",
  reciept: "",
  paid_at: ""
};

const promoPage = createSlice({
  name: "promoPage",
  initialState: {
    loading: false,
    promos: [],
    promo: promo,
    remoteVersionRequirement: 0,
    edit_promo_modal: false,
    promo_modal: false,
    message: "",
    error: {},
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
    set_edit_promo_modal: (state, { payload }) => {
      state.edit_promo_modal = payload;
    },
    open_create_promo_modal: (state, { payload }) => {
      state.edit_promo_modal = true;
      state.promo = promo;
    },
    open_edit_promo_modal: (state, { payload }) => {
      state.edit_promo_modal = true;
      state.promo = payload;
    },
    close_promo_modal: (state, { payload }) => {
      state.promo_modal = false;
      state.promo = promo;
    },
    open_promo_modal: (state, { payload }) => {
      state.promo_modal = true;
      state.promo = payload;
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
      state.promo = { ...payload, paid_at: payload.paid_at ? format_date(payload.paid_at) : "" };
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
    },
    [API.deleteMultiplePromos.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteMultiplePromos.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Promo Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteMultiplePromos.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const {
  set_loading,
  set_promo,
  set_edit_promo_modal,
  open_create_promo_modal,
  open_promo_modal,
  close_promo_modal,
  open_edit_promo_modal
} = promoPage.actions;
export default promoPage.reducer;
