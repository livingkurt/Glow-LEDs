import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  giftCardPage: {
    edit_gift_card_modal: false,
    create_gift_card_modal: false,
    giftCard: null,
    loading: false,
  },
  giftCardTable: {
    selectedRows: [],
  },
};

const giftCardSlice = createSlice({
  name: "giftCards",
  initialState,
  reducers: {
    open_edit_gift_card_modal: (state, action) => {
      state.giftCardPage.edit_gift_card_modal = true;
      state.giftCardPage.giftCard = action.payload;
    },
    close_edit_gift_card_modal: state => {
      state.giftCardPage.edit_gift_card_modal = false;
      state.giftCardPage.giftCard = null;
    },
    open_create_gift_card_modal: state => {
      state.giftCardPage.create_gift_card_modal = true;
    },
    close_create_gift_card_modal: state => {
      state.giftCardPage.create_gift_card_modal = false;
    },
    set_giftCard: (state, action) => {
      state.giftCardPage.giftCard = action.payload;
    },
    set_loading: (state, action) => {
      state.giftCardPage.loading = action.payload;
    },
    set_selected_rows: (state, action) => {
      state.giftCardTable.selectedRows = action.payload;
    },
  },
});

export const {
  open_edit_gift_card_modal,
  close_edit_gift_card_modal,
  open_create_gift_card_modal,
  close_create_gift_card_modal,
  set_giftCard,
  set_loading,
  set_selected_rows,
} = giftCardSlice.actions;

export default giftCardSlice.reducer;
