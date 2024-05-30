/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const feature = {
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
  feature_questions: "",
  order: "",
  is_feature: "",
  active: "",
  rating: null,
};

const featurePage = createSlice({
  name: "featurePage",
  initialState: {
    loading: false,
    features: [],
    feature: feature,
    remoteVersionRequirement: 0,
    edit_feature_modal: false,
    upload_feature_modal: false,
    feature_modal: false,
    message: "",
    error: {},
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
    set_edit_feature_modal: (state, { payload }) => {
      state.edit_feature_modal = payload;
    },
    open_create_feature_modal: (state, { payload }) => {
      state.edit_feature_modal = true;
      state.feature = feature;
    },
    open_edit_feature_modal: (state, { payload }) => {
      state.edit_feature_modal = true;
      state.feature = payload;
    },
    close_feature_modal: (state, { payload }) => {
      state.edit_feature_modal = false;
      state.upload_feature_modal = false;
      state.feature_modal = false;
      state.feature = feature;
    },
    open_feature_modal: (state, { payload }) => {
      state.feature_modal = true;
      state.feature = payload;
    },
    feature_uploaded: (state, { payload }) => {
      state.upload_feature_modal = false;
      state.remoteVersionRequirement = Date.now();
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
      state.totalPages = payload.total_count;
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
      state.remoteVersionRequirement = Date.now();
      state.edit_feature_modal = false;
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
      state.message = "Feature Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteFeature.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_feature,
  set_edit_feature_modal,
  open_create_feature_modal,
  open_feature_modal,
  close_feature_modal,
  open_edit_feature_modal,
  feature_uploaded,
} = featurePage.actions;
export default featurePage.reducer;
