/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";
import { format_date } from "../utils/helper_functions";

const promo = {
  affiliate: null,
  user: null,
  promo_code: "",
  admin_only: false,
  affiliate_only: false,
  sponsor_only: false,
  excluded_categories: [],
  included_categories: [],
  included_products: [],
  excluded_products: [],
  percentage_off: 0,
  free_shipping: false,
  exclude: false,
  include: false,
  amount_off: 0,
  single_use: false,
  time_limit: 0,
  start_date: "",
  end_date: "",
  used_once: false,
  minimum_total: 0,
  active: false,
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
    loadingValidatePromoCode: false,
  },
  reducers: {
    set_promo: (state, { payload }) => {
      const updated_promo = payload;
      return {
        ...state,
        promo: { ...state.promo, ...updated_promo },
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
    },
  },
  extraReducers: {
    [API.listPromos.pending]: (state, { payload }) => {
      state.loading = true;
      state.promos = [];
    },
    [API.listPromos.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.promos = payload.promos;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Promos Found";
    },
    [API.listPromos.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.listSponsorCodes.pending]: (state, { payload }) => {
      state.loading = true;
      state.refreshCode = "";
      state.twentyFiveOffCode = "";
    },
    [API.listSponsorCodes.fulfilled]: (state, { payload }) => {
      const { refreshCode, twentyFiveOffCode } = payload;
      state.loading = false;
      state.refreshCode = refreshCode;
      state.twentyFiveOffCode = twentyFiveOffCode;
      state.message = "Promos Found";
    },
    [API.listSponsorCodes.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.savePromo.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.savePromo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Promo Saved";
      state.edit_promo_modal = false;
      state.remoteVersionRequirement = Date.now();
    },
    [API.savePromo.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsPromo.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsPromo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.promo = { ...payload, paid_at: payload.paid_at ? format_date(payload.paid_at) : "" };
      state.message = "Promo Found";
    },
    [API.detailsPromo.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deletePromo.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deletePromo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Promo Deleted";
    },
    [API.deletePromo.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteMultiplePromos.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteMultiplePromos.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Promo Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteMultiplePromos.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.refreshSponsorCodes.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.refreshSponsorCodes.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Sponsor Codes Refreshed";
      state.remoteVersionRequirement = Date.now();
    },
    [API.refreshSponsorCodes.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.validatePromoCode.pending]: (state, { payload }) => {
      state.loadingValidatePromoCode = true;
    },
    [API.validatePromoCode.fulfilled]: (state, { payload }) => {
      state.loadingValidatePromoCode = false;
    },
    [API.validatePromoCode.rejected]: (state, { payload, error }) => {
      state.loadingValidatePromoCode = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_promo,
  set_edit_promo_modal,
  open_create_promo_modal,
  open_promo_modal,
  close_promo_modal,
  open_edit_promo_modal,
} = promoPage.actions;
export default promoPage.reducer;
