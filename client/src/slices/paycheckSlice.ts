/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";
import { format_date } from "../utils/helper_functions";

const paycheckSlice = createSlice({
  name: "paychecks",
  initialState: {
    loading: false,
    paychecks: [],
    paycheck: {
      id: "",
      affiliate: "",
      team: "",
      amount: 0,
      venmo: "",
      paid: "",
      reciept: "",
      paid_at: ""
    },
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
    set_paycheck: (state, { payload }) => {
      const updated_paycheck = payload;
      return {
        ...state,
        paycheck: { ...state.paycheck, ...updated_paycheck }
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
    [API.listPaychecks.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.paychecks = [];
    },
    [API.listPaychecks.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.paychecks = payload.paychecks;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Paychecks Found";
    },
    [API.listPaychecks.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.savePaycheck.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.savePaycheck.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Paycheck Saved";
    },
    [API.savePaycheck.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsPaycheck.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsPaycheck.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.paycheck = { ...payload, paid_at: payload.paid_at ? format_date(payload.paid_at) : "" };
      state.message = "Paycheck Found";
    },
    [API.detailsPaycheck.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deletePaycheck.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deletePaycheck.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.paycheck = payload.paycheck;
      state.message = "Paycheck Deleted";
    },
    [API.deletePaycheck.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_paycheck } = paycheckSlice.actions;
export default paycheckSlice.reducer;
