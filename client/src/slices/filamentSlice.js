/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const filamentPage = createSlice({
  name: "filamentPage",
  initialState: {
    loading: false,
    filaments: [],
    filament: {},
    message: "",
    error: {},
    search: "",
    sort: "",
    page: 1,
    limit: 10,
  },
  reducers: {
    set_filament: (state, { payload }) => {
      const updated_filament = payload;
      return {
        ...state,
        filament: { ...state.filament, ...updated_filament },
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
    [API.listFilaments.pending]: (state, { payload }) => {
      state.loading = true;
      state.filaments = [];
    },
    [API.listFilaments.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.filaments = payload.filaments;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Filaments Found";
    },
    [API.listFilaments.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveFilament.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.saveFilament.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Filament Saved";
    },
    [API.saveFilament.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsFilament.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsFilament.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.filament = payload;
      state.message = "Filament Found";
    },
    [API.detailsFilament.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteFilament.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteFilament.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.filament = payload.filament;
      state.message = "Filament Deleted";
    },
    [API.deleteFilament.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_filament } = filamentPage.actions;
export default filamentPage.reducer;
