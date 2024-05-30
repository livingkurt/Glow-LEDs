/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const parcel = {
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
  parcel_questions: "",
  order: "",
  is_parcel: "",
  active: "",
  rating: null,
};

const parcelPage = createSlice({
  name: "parcelPage",
  initialState: {
    loading: false,
    parcels: [],
    parcel: parcel,
    remoteVersionRequirement: 0,
    edit_parcel_modal: false,
    upload_parcel_modal: false,
    parcel_modal: false,
    message: "",
    error: {},
  },
  reducers: {
    set_parcel: (state, { payload }) => {
      const updated_parcel = payload;
      return {
        ...state,
        parcel: { ...state.parcel, ...updated_parcel },
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_edit_parcel_modal: (state, { payload }) => {
      state.edit_parcel_modal = payload;
    },
    open_create_parcel_modal: (state, { payload }) => {
      state.edit_parcel_modal = true;
      state.parcel = parcel;
    },
    open_edit_parcel_modal: (state, { payload }) => {
      state.edit_parcel_modal = true;
      state.parcel = payload;
    },
    close_parcel_modal: (state, { payload }) => {
      state.edit_parcel_modal = false;
      state.upload_parcel_modal = false;
      state.parcel_modal = false;
      state.parcel = parcel;
    },
    open_parcel_modal: (state, { payload }) => {
      state.parcel_modal = true;
      state.parcel = payload;
    },
    parcel_uploaded: (state, { payload }) => {
      state.upload_parcel_modal = false;
      state.remoteVersionRequirement = Date.now();
    },
  },
  extraReducers: {
    [API.listParcels.pending]: (state, { payload }) => {
      state.loading = true;
      state.parcels = [];
    },
    [API.listParcels.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.parcels = payload.parcels;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Parcels Found";
    },
    [API.listParcels.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveParcel.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.saveParcel.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Parcel Saved";
      state.remoteVersionRequirement = Date.now();
      state.edit_parcel_modal = false;
    },
    [API.saveParcel.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsParcel.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsParcel.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.parcel = payload;
      state.message = "Parcel Found";
    },
    [API.detailsParcel.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteParcel.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteParcel.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Parcel Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteParcel.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_parcel,
  set_edit_parcel_modal,
  open_create_parcel_modal,
  open_parcel_modal,
  close_parcel_modal,
  open_edit_parcel_modal,
  parcel_uploaded,
} = parcelPage.actions;
export default parcelPage.reducer;
