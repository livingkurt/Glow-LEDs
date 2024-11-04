/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const gift_card = {
  type: "bubble_mailer",
  length: 0,
  width: 0,
  height: 0,
  quantity_state: 0,
};

const giftCardPage = createSlice({
  name: "giftCardPage",
  initialState: {
    loading: false,
    gift_cards: [],
    gift_card: gift_card,
    remoteVersionRequirement: 0,
    edit_gift_card_modal: false,
    upload_gift_card_modal: false,
    gift_card_modal: false,
    message: "",
    error: {},
  },
  reducers: {
    set_gift_card: (state, { payload }) => {
      const updated_gift_card = payload;
      return {
        ...state,
        gift_card: { ...state.gift_card, ...updated_gift_card },
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_edit_gift_card_modal: (state, { payload }) => {
      state.edit_gift_card_modal = payload;
    },
    open_create_gift_card_modal: (state, { payload }) => {
      state.edit_gift_card_modal = true;
      state.gift_card = gift_card;
    },
    open_edit_gift_card_modal: (state, { payload }) => {
      state.edit_gift_card_modal = true;
      state.gift_card = payload;
    },
    close_gift_card_modal: (state, { payload }) => {
      state.edit_gift_card_modal = false;
      state.upload_gift_card_modal = false;
      state.gift_card_modal = false;
      state.gift_card = gift_card;
    },
    open_gift_card_modal: (state, { payload }) => {
      state.gift_card_modal = true;
      state.gift_card = payload;
    },
    gift_card_uploaded: (state, { payload }) => {
      state.upload_gift_card_modal = false;
      state.remoteVersionRequirement = Date.now();
    },
  },
  extraReducers: {
    [API.listParcels.pending]: (state, { payload }) => {
      state.loading = true;
      state.gift_cards = [];
    },
    [API.listParcels.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.gift_cards = payload.gift_cards;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Parcels Found";
    },
    [API.listParcels.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveParcel.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.saveParcel.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Parcel Saved";
      state.remoteVersionRequirement = Date.now();
      state.edit_gift_card_modal = false;
    },
    [API.saveParcel.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsParcel.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsParcel.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.gift_card = payload;
      state.message = "Parcel Found";
    },
    [API.detailsParcel.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteParcel.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteParcel.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Parcel Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteParcel.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_gift_card,
  set_edit_gift_card_modal,
  open_create_gift_card_modal,
  open_gift_card_modal,
  close_gift_card_modal,
  open_edit_gift_card_modal,
  gift_card_uploaded,
} = giftCardPage.actions;
export default giftCardPage.reducer;
