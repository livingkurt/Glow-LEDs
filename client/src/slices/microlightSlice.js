/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const microlight = {
  id: "",
  name: "",
  company: "",
  category: "",
  tags: {},
  programmable: false,
  number_of_modes: 0,
  characteristics: "",
  colors_per_mode: 0,
  pathname: "",
  images: [],
  colors: [],
  dimensions: {
    height: 0,
    width: 0,
    length: 0,
  },
};

const microlightPage = createSlice({
  name: "microlightPage",
  initialState: {
    loading: false,
    microlights: [],
    microlight: microlight,
    remoteVersionRequirement: 0,
    edit_microlight_modal: false,
    upload_microlight_modal: false,
    microlight_modal: false,
    message: "",
    error: {},
  },
  reducers: {
    set_microlight: (state, { payload }) => {
      const updated_microlight = payload;
      return {
        ...state,
        microlight: { ...state.microlight, ...updated_microlight },
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_edit_microlight_modal: (state, { payload }) => {
      state.edit_microlight_modal = payload;
    },
    open_create_microlight_modal: (state, { payload }) => {
      state.edit_microlight_modal = true;
      state.microlight = microlight;
    },
    open_edit_microlight_modal: (state, { payload }) => {
      state.edit_microlight_modal = true;
      state.microlight = payload;
    },
    close_microlight_modal: (state, { payload }) => {
      state.edit_microlight_modal = false;
      state.upload_microlight_modal = false;
      state.microlight_modal = false;
      state.microlight = microlight;
    },
    open_microlight_modal: (state, { payload }) => {
      state.microlight_modal = true;
      state.microlight = payload;
    },
    microlight_uploaded: (state, { payload }) => {
      state.upload_microlight_modal = false;
      state.remoteVersionRequirement = Date.now();
    },
  },
  extraReducers: {
    [API.listMicrolights.pending]: (state, { payload }) => {
      state.loading = true;
      state.microlights = [];
    },
    [API.listMicrolights.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.microlights = payload.microlights;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Microlights Found";
    },
    [API.listMicrolights.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveMicrolight.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.saveMicrolight.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Microlight Saved";
      state.remoteVersionRequirement = Date.now();
      state.edit_microlight_modal = false;
    },
    [API.saveMicrolight.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsMicrolight.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsMicrolight.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.microlight = payload;
      state.message = "Microlight Found";
    },
    [API.detailsMicrolight.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteMicrolight.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteMicrolight.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Microlight Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteMicrolight.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_microlight,
  set_edit_microlight_modal,
  open_create_microlight_modal,
  open_microlight_modal,
  close_microlight_modal,
  open_edit_microlight_modal,
  microlight_uploaded,
} = microlightPage.actions;
export default microlightPage.reducer;
