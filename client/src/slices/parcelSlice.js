/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const parcelPage = createSlice({
  name: "parcelPage",
  initialState: {
    loading: false,
    parcels: [],
    parcel: {},
    message: "",
    error: {},
    search: "",
    sort: "",
    page: 1,
    limit: 10,
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
    [API.listParcels.pending]: (state, { payload }) => {
      state.loading = true;
      state.parcels = [];
    },
    [API.listParcels.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.parcels = payload.parcels;
      state.totalPages = payload.totalPages;
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
      state.parcel = payload.parcel;
      state.message = "Parcel Deleted";
    },
    [API.deleteParcel.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_parcel } = parcelPage.actions;
export default parcelPage.reducer;
