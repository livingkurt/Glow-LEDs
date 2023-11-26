/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const chip = {
  id: "",
  name: "",
  company: "",
  category: "",
  category_object: {},
  programmmable: false,
  number_of_modes: 0,
  characteristics: "",
  colors_per_mode: 0,
  pathname: "",
  image: "",
  image_object: {},
  colors: [],
  dimensions: {
    height: 0,
    width: 0,
    length: 0,
  },
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
      state.remoteVersionRequirement = Date.now();
      state.edit_chip_modal = false;
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
      state.chip = chip;
      state.message = "Chip Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteChip.rejected]: (state, { payload, error }) => {
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
