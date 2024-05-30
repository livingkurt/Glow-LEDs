/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const palette = {
  id: "",
  question_1: "",
  question_2: "",
  question_3: "",
  question_4: "",
  question_5: "",
  answer_1: "",
  answer_2: "",
  answer_3: "",
  answer_4: "",
  answer_5: "",
  question_answer: [{ question: "", answer: "" }],
  user: "",
  palette_questions: "",
  order: "",
  is_palette: "",
  active: "",
  rating: null,
};

const palettePage = createSlice({
  name: "palettePage",
  initialState: {
    loading: false,
    palettes: [],
    palette: palette,
    remoteVersionRequirement: 0,
    edit_palette_modal: false,
    upload_palette_modal: false,
    palette_modal: false,
    message: "",
    error: {},
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
    set_edit_palette_modal: (state, { payload }) => {
      state.edit_palette_modal = payload;
    },
    open_create_palette_modal: (state, { payload }) => {
      state.edit_palette_modal = true;
      state.palette = palette;
    },
    open_edit_palette_modal: (state, { payload }) => {
      state.edit_palette_modal = true;
      state.palette = payload;
    },
    close_palette_modal: (state, { payload }) => {
      state.edit_palette_modal = false;
      state.upload_palette_modal = false;
      state.palette_modal = false;
      state.palette = palette;
    },
    open_palette_modal: (state, { payload }) => {
      state.palette_modal = true;
      state.palette = payload;
    },
    palette_uploaded: (state, { payload }) => {
      state.upload_palette_modal = false;
      state.remoteVersionRequirement = Date.now();
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
      state.totalPages = payload.total_count;
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
      state.remoteVersionRequirement = Date.now();
      state.edit_palette_modal = false;
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
      state.message = "Palette Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deletePalette.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_palette,
  set_edit_palette_modal,
  open_create_palette_modal,
  open_palette_modal,
  close_palette_modal,
  open_edit_palette_modal,
  palette_uploaded,
} = palettePage.actions;
export default palettePage.reducer;
