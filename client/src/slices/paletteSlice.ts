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
    limit: 10
  },
  reducers: {
    set_palette: (state, { payload }) => {
      const updated_palette = payload;
      return {
        ...state,
        palette: { ...state.palette, ...updated_palette }
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
    }
  },
  extraReducers: {
    [API.listPalettes.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.palettes = [];
    },
    [API.listPalettes.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.palettes = payload.palettes;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Palettes Found";
    },
    [API.listPalettes.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.savePalette.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.savePalette.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Palette Saved";
    },
    [API.savePalette.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsPalette.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsPalette.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.palette = payload;
      state.message = "Palette Found";
    },
    [API.detailsPalette.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deletePalette.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deletePalette.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.palette = payload.palette;
      state.message = "Palette Deleted";
    },
    [API.deletePalette.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_palette } = palettePage.actions;
export default palettePage.reducer;
