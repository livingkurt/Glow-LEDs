/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const settingSlice = createSlice({
  name: "settings",
  initialState: {
    loading: false,
    settings: [],
    setting: {},
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
    set_setting: (state, { payload }) => {
      const updated_setting = payload;
      return {
        ...state,
        setting: { ...state.setting, ...updated_setting }
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
    [API.listSettings.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.settings = [];
    },
    [API.listSettings.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.settings = payload.settings;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Settings Found";
    },
    [API.listSettings.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.saveSetting.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveSetting.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Setting Saved";
    },
    [API.saveSetting.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },

    [API.detailsSetting.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsSetting.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.setting = payload;
      state.message = "Setting Found";
    },
    [API.detailsSetting.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteSetting.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteSetting.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.setting = payload.setting;
      state.message = "Setting Deleted";
    },
    [API.deleteSetting.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_setting } = settingSlice.actions;
export default settingSlice.reducer;
