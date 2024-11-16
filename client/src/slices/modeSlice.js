import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const mode = {
  name: "",
  description: "",
  colors: [],
  microlight: null,
  flashing_pattern: {
    name: "",
    type: "",
    on_dur: 5,
    off_dur: 8,
    gap_dur: 0,
    dash_dur: 0,
    group_size: 0,
    blend_speed: 0,
  },
  visibility: "public",
};

const modePage = createSlice({
  name: "modePage",
  initialState: {
    loading: false,
    modes: [],
    mode: mode,
    remoteVersionRequirement: 0,
    edit_mode_modal: false,
    mode_modal: false,
    message: "",
    error: {},
  },
  reducers: {
    set_mode: (state, { payload }) => {
      const updated_mode = payload;
      return {
        ...state,
        mode: { ...state.mode, ...updated_mode },
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_edit_mode_modal: (state, { payload }) => {
      state.edit_mode_modal = payload;
    },
    open_create_mode_modal: state => {
      state.edit_mode_modal = true;
      state.mode = mode;
    },
    open_edit_mode_modal: (state, { payload }) => {
      state.edit_mode_modal = true;
      state.mode = payload;
    },
    close_mode_modal: state => {
      state.edit_mode_modal = false;
      state.mode_modal = false;
      state.mode = mode;
    },
    open_mode_modal: (state, { payload }) => {
      state.mode_modal = true;
      state.mode = payload;
    },
  },
  extraReducers: {
    [API.listModes.pending]: state => {
      state.loading = true;
      state.modes = [];
    },
    [API.listModes.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.modes = payload.modes;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Modes Found";
    },
    [API.listModes.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveMode.pending]: state => {
      state.loading = true;
    },
    [API.saveMode.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Mode Saved";
      state.remoteVersionRequirement = Date.now();
      state.edit_mode_modal = false;
    },
    [API.saveMode.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsMode.pending]: state => {
      state.loading = true;
    },
    [API.detailsMode.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.mode = payload;
      state.message = "Mode Found";
    },
    [API.detailsMode.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteMode.pending]: state => {
      state.loading = true;
    },
    [API.deleteMode.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Mode Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteMode.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_mode,
  set_edit_mode_modal,
  open_create_mode_modal,
  open_mode_modal,
  close_mode_modal,
  open_edit_mode_modal,
} = modePage.actions;
export default modePage.reducer;
