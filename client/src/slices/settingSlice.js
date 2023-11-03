/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const settingPage = createSlice({
  name: "settingPage",
  initialState: {
    loading: false,
    settings: [],
    setting: {},
    message: "",
    error: {},
    show_search_bar: true,
    first_name: "",
    display: false,
    options: [],
    pathname: "",
    search: "",
    chip_name: "",
  },
  reducers: {
    set_setting: (state, { payload }) => {
      const updated_setting = payload;
      return {
        ...state,
        setting: { ...state.setting, ...updated_setting },
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_show_search_bar: (state, { payload }) => {
      state.show_search_bar = payload;
    },
    set_first_name: (state, { payload }) => {
      state.first_name = payload;
    },
    setDisplay: (state, { payload }) => {
      state.display = payload;
    },
    set_options: (state, { payload }) => {
      state.options = payload;
    },
    set_pathname: (state, { payload }) => {
      state.pathname = payload;
    },
    set_search: (state, { payload }) => {
      state.search = payload;
    },
    set_chip_name: (state, { payload }) => {
      state.chip_name = payload;
    },
  },
  extraReducers: {
    [API.listSettings.pending]: (state, { payload }) => {
      state.loading = true;
      state.settings = [];
    },
    [API.listSettings.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.settings = payload.settings;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Settings Found";
    },
    [API.listSettings.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveSetting.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.saveSetting.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Setting Saved";
    },
    [API.saveSetting.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },

    [API.detailsSetting.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsSetting.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.setting = payload;
      state.message = "Setting Found";
    },
    [API.detailsSetting.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteSetting.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteSetting.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.setting = payload.setting;
      state.message = "Setting Deleted";
    },
    [API.deleteSetting.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_setting,
  set_show_search_bar,
  set_first_name,
  setDisplay,
  set_options,
  set_pathname,
  set_search,
  set_chip_name,
} = settingPage.actions;
export default settingPage.reducer;
