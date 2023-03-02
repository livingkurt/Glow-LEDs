/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const paletteSlice = createSlice({
  name: "palettes",
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
    sort_options: ["Newest", "Artist Name", "Facebook Name", "Instagram Handle", "Sponsor", "Promoter"],
    colors: [
      { name: "Sponsor", color: "#3e4c6d" },
      { name: "Promoter", color: "#7d5555" },
      { name: "Team", color: "#557d6c" },
      { name: "Not Active", color: "#757575" },
      { name: "Rave Mob", color: "#55797d" }
    ]
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
    [API.listPalettes.pending]: (state: any, { payload }: any) => {
      state.loading = true;
      state.palettes = [];
    },
    [API.listPalettes.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.palettes = payload.palettes;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Palettes Found";
    },
    [API.listPalettes.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.createPalette.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.createPalette.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.palette = payload.palette;
      state.message = "Palette Saved";
    },
    [API.createPalette.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.updatePalette.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.updatePalette.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.palette = payload.palette;
      state.message = "Palette Saved";
    },
    [API.updatePalette.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsPalette.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsPalette.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.palette = payload;
      state.message = "Palette Found";
    },
    [API.detailsPalette.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deletePalette.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deletePalette.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.palette = payload.palette;
      state.message = "Palette Deleted";
    },
    [API.deletePalette.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_palette } = paletteSlice.actions;
export default paletteSlice.reducer;
