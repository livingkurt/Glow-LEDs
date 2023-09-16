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
  },
  extraReducers: {
    [API.listSettings.pending as any]: (state, { payload }) => {
      state.loading = true;
      state.settings = [];
    },
    [API.listSettings.fulfilled as any]: (state, { payload }) => {
      state.loading = false;
      state.settings = payload.settings;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Settings Found";
    },
    [API.listSettings.rejected as any]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveSetting.pending as any]: (state, { payload }) => {
      state.loading = true;
    },
    [API.saveSetting.fulfilled as any]: (state, { payload }) => {
      state.loading = false;
      state.message = "Setting Saved";
    },
    [API.saveSetting.rejected as any]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },

    [API.detailsSetting.pending as any]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsSetting.fulfilled as any]: (state, { payload }) => {
      state.loading = false;
      state.setting = payload;
      state.message = "Setting Found";
    },
    [API.detailsSetting.rejected as any]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteSetting.pending as any]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteSetting.fulfilled as any]: (state, { payload }) => {
      state.loading = false;
      state.setting = payload.setting;
      state.message = "Setting Deleted";
    },
    [API.deleteSetting.rejected as any]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const { set_loading, set_setting, set_show_search_bar } = settingPage.actions;
export default settingPage.reducer;
