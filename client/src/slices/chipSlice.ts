/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api/chipApi";

const chipSlice = createSlice({
  name: "chips",
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
    set_chip: (state, { payload }) => {
      const updated_chip = payload;
      return {
        ...state,
        chip: { ...state.chip, ...updated_chip }
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
    [API.listChips.pending]: (state: any, { payload }: any) => {
      state.loading = true;
      state.chips = [];
    },
    [API.listChips.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.chips = payload.chips;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Chips Found";
    },
    [API.listChips.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.createChip.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.createChip.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.chip = payload.chip;
      state.message = "Chip Saved";
    },
    [API.createChip.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.updateChip.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.updateChip.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.chip = payload.chip;
      state.message = "Chip Saved";
    },
    [API.updateChip.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsChip.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsChip.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.chip = payload;
      state.message = "Chip Found";
    },
    [API.detailsChip.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteChip.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteChip.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.chip = payload.chip;
      state.message = "Chip Deleted";
    },
    [API.deleteChip.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_chip } = chipSlice.actions;
export default chipSlice.reducer;
