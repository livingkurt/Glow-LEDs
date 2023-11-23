/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const chip = {
  id: "",
  chip_name: "",
  application: "",
  url: "",
  place_of_purchase: "",
  date_of_purchase: "",
  category: "",
  card: "",
  amount: 0,
  documents: [],
};

const chipPage = createSlice({
  name: "chipPage",
  initialState: {
    loading: false,
    chips: [],
    chip: chip,
    remoteVersionRequirement: 0,
    edit_chip_modal: false,
    upload_chip_modal: false,
    chip_modal: false,
    message: "",
    error: {},
  },
  reducers: {
    set_chip: (state, { payload }) => {
      const updated_chip = payload;
      return {
        ...state,
        chip: { ...state.chip, ...updated_chip },
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_edit_chip_modal: (state, { payload }) => {
      state.edit_chip_modal = payload;
    },
    open_create_chip_modal: (state, { payload }) => {
      state.edit_chip_modal = true;
      state.chip = chip;
    },
    open_edit_chip_modal: (state, { payload }) => {
      state.edit_chip_modal = true;
      state.chip = payload;
    },
    close_chip_modal: (state, { payload }) => {
      state.edit_chip_modal = false;
      state.upload_chip_modal = false;
      state.chip_modal = false;
      state.chip = chip;
    },
    open_chip_modal: (state, { payload }) => {
      state.chip_modal = true;
      state.chip = payload;
    },
    chip_uploaded: (state, { payload }) => {
      state.upload_chip_modal = false;
      state.remoteVersionRequirement = Date.now();
    },
  },
  extraReducers: {
    [API.listExpenses.pending]: (state, { payload }) => {
      state.loading = true;
      state.chips = [];
    },
    [API.listExpenses.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.chips = payload.data;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Expenses Found";
    },
    [API.listExpenses.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveExpense.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.saveExpense.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Expense Saved";
      state.remoteVersionRequirement = Date.now();
      state.edit_chip_modal = false;
    },
    [API.saveExpense.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsExpense.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsExpense.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.chip = payload;
      state.message = "Expense Found";
    },
    [API.detailsExpense.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteExpense.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteExpense.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.chip = chip;
      state.message = "Expense Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteExpense.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_chip,
  set_edit_chip_modal,
  open_create_chip_modal,
  open_chip_modal,
  close_chip_modal,
  open_edit_chip_modal,
  chip_uploaded,
} = chipPage.actions;
export default chipPage.reducer;
