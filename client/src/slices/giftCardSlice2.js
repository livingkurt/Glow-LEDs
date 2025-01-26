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
    generate_gift_card_modal: false,
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
    set_generate_gift_card_modal: (state, action) => {
      state.generate_gift_card_modal = action.payload;
    },
    open_generate_gift_card_modal: state => {
      state.gift_card = {};
      state.generate_gift_card_modal = true;
    },
  },
  extraReducers: {
    [API.listGiftCards.pending]: (state, { payload }) => {
      state.gift_cards = [];
    },
    [API.listGiftCards.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.gift_cards = payload;
      state.message = "GiftCards Found";
    },
    [API.listGiftCards.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveGiftCard.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "GiftCard Saved";
      state.remoteVersionRequirement = Date.now();
      state.edit_gift_card_modal = false;
    },
    [API.saveGiftCard.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsGiftCard.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsGiftCard.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.gift_card = payload;
      state.message = "GiftCard Found";
    },
    [API.detailsGiftCard.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteGiftCard.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteGiftCard.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "GiftCard Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteGiftCard.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.generateGiftCard.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.generateGiftCard.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Gift Card Generated Successfully";
      state.generate_gift_card_modal = false;
      state.gift_card = {};
    },
    [API.generateGiftCard.rejected]: (state, { payload, error }) => {
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
  set_generate_gift_card_modal,
} = giftCardPage.actions;
export default giftCardPage.reducer;
