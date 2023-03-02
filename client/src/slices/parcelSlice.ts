/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const parcelSlice = createSlice({
  name: "parcels",
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
    set_parcel: (state, { payload }) => {
      const updated_parcel = payload;
      return {
        ...state,
        parcel: { ...state.parcel, ...updated_parcel }
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
    [API.listParcels.pending]: (state: any, { payload }: any) => {
      state.loading = true;
      state.parcels = [];
    },
    [API.listParcels.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.parcels = payload.parcels;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Parcels Found";
    },
    [API.listParcels.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.createParcel.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.createParcel.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.parcel = payload.parcel;
      state.message = "Parcel Saved";
    },
    [API.createParcel.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.updateParcel.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.updateParcel.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.parcel = payload.parcel;
      state.message = "Parcel Saved";
    },
    [API.updateParcel.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsParcel.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsParcel.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.parcel = payload;
      state.message = "Parcel Found";
    },
    [API.detailsParcel.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteParcel.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteParcel.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.parcel = payload.parcel;
      state.message = "Parcel Deleted";
    },
    [API.deleteParcel.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_parcel } = parcelSlice.actions;
export default parcelSlice.reducer;
