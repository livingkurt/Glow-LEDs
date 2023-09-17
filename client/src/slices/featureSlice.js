/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const featurePage = createSlice({
  name: "featurePage",
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
  },
  reducers: {
    set_feature: (state, { payload }) => {
      const updated_feature = payload;
      return {
        ...state,
        feature: { ...state.feature, ...updated_feature },
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
    },
  },
  extraReducers: {
    [API.listFeatures.pending]: (state, { payload }) => {
      state.loading = true;
      state.features = [];
    },
    [API.listFeatures.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.features = payload.features;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Features Found";
    },
    [API.listFeatures.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveFeature.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.saveFeature.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Feature Saved";
    },
    [API.saveFeature.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsFeature.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsFeature.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.feature = payload;
      state.message = "Feature Found";
    },
    [API.detailsFeature.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteFeature.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteFeature.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.feature = payload.feature;
      state.message = "Feature Deleted";
    },
    [API.deleteFeature.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_feature } = featurePage.actions;
export default featurePage.reducer;
