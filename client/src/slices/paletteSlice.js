/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const palettePage = createSlice({
  name: "palettePage",
  initialState: {
    loading: false,
    palettes: [],
    palette: {},
    message: "",
    error: {},
    search: "",
    sort: "",
    page: 1,
    limit: 10,
  },
  reducers: {
    set_palette: (state, { payload }) => {
      const updated_palette = payload;
      return {
        ...state,
        palette: { ...state.palette, ...updated_palette },
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
    [API.listPalettes.pending]: (state, { payload }) => {
      state.loading = true;
      state.palettes = [];
    },
    [API.listPalettes.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.palettes = payload.palettes;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Palettes Found";
    },
    [API.listPalettes.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.savePalette.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.savePalette.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Palette Saved";
    },
    [API.savePalette.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsPalette.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsPalette.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.palette = payload;
      state.message = "Palette Found";
    },
    [API.detailsPalette.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deletePalette.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deletePalette.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.palette = payload.palette;
      state.message = "Palette Deleted";
    },
    [API.deletePalette.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_palette } = palettePage.actions;
export default palettePage.reducer;
