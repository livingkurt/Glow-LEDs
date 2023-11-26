/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const chipPage = createSlice({
  name: "chipPage",
  initialState: {
    loading: false,
    chips: [],
    chip: {},
    message: "",
    error: {},
    search: "",
    sort: "",
    page: 1,
    limit: 10,
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
    },
  },
  extraReducers: {
    [API.listChips.pending]: (state, { payload }) => {
      state.loading = true;
      state.chips = [];
    },
    [API.listChips.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.chips = payload.chips;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Chips Found";
    },
    [API.listChips.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveChip.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.saveChip.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Chip Saved";
    },
    [API.saveChip.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsChip.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsChip.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.chip = payload;
      state.message = "Chip Found";
    },
    [API.detailsChip.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteChip.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteChip.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.chip = payload.chip;
      state.message = "Chip Deleted";
    },
    [API.deleteChip.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_chip } = chipPage.actions;
export default chipPage.reducer;
