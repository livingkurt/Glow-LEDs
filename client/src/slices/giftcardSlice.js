import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  giftcardPage: {
    edit_giftcard_modal: false,
    create_giftcard_modal: false,
    giftcard: null,
    loading: false,
  },
  giftcardTable: {
    selectedRows: [],
  },
};

const giftcardSlice = createSlice({
  name: "giftcards",
  initialState,
  reducers: {
    open_edit_giftcard_modal: (state, action) => {
      state.giftcardPage.edit_giftcard_modal = true;
      state.giftcardPage.giftcard = action.payload;
    },
    close_edit_giftcard_modal: state => {
      state.giftcardPage.edit_giftcard_modal = false;
      state.giftcardPage.giftcard = null;
    },
    open_create_giftcard_modal: state => {
      state.giftcardPage.create_giftcard_modal = true;
    },
    close_create_giftcard_modal: state => {
      state.giftcardPage.create_giftcard_modal = false;
    },
    set_giftcard: (state, action) => {
      state.giftcardPage.giftcard = action.payload;
    },
    set_loading: (state, action) => {
      state.giftcardPage.loading = action.payload;
    },
    set_selected_rows: (state, action) => {
      state.giftcardTable.selectedRows = action.payload;
    },
  },
});

export const {
  open_edit_giftcard_modal,
  close_edit_giftcard_modal,
  open_create_giftcard_modal,
  close_create_giftcard_modal,
  set_giftcard,
  set_loading,
  set_selected_rows,
} = giftcardSlice.actions;

export default giftcardSlice.reducer;
