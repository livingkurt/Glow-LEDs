/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const featureSlice = createSlice({
  name: "features",
  initialState: {
    loading: false,
    features: [],
    feature: {},
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
    set_feature: (state, { payload }) => {
      const updated_feature = payload;
      return {
        ...state,
        feature: { ...state.feature, ...updated_feature }
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
    [API.listFeatures.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.features = [];
    },
    [API.listFeatures.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.features = payload.features;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Features Found";
    },
    [API.listFeatures.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.saveFeature.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveFeature.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Feature Saved";
    },
    [API.saveFeature.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsFeature.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsFeature.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.feature = payload;
      state.message = "Feature Found";
    },
    [API.detailsFeature.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteFeature.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteFeature.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.feature = payload.feature;
      state.message = "Feature Deleted";
    },
    [API.deleteFeature.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_feature } = featureSlice.actions;
export default featureSlice.reducer;
