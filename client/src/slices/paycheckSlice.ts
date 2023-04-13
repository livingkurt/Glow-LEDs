/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";
import { format_date } from "../utils/helper_functions";

const paycheckPage = createSlice({
  name: "paycheckPage",
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
    remoteVersionRequirement: 0,
    edit_paycheck_modal: false,
    paycheck_modal: false,
    message: "",
    error: {},
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
    set_edit_paycheck_modal: (state, { payload }) => {
      state.edit_paycheck_modal = payload;
    },
    open_create_paycheck_modal: (state, { payload }) => {
      state.edit_paycheck_modal = true;
      state.paycheck = {
        id: "",
        affiliate: "",
        team: "",
        amount: 0,
        venmo: "",
        paid: "",
        reciept: "",
        paid_at: ""
      };
    },
    open_edit_paycheck_modal: (state, { payload }) => {
      state.edit_paycheck_modal = true;
      state.paycheck = payload;
    },
    close_paycheck_modal: (state, { payload }) => {
      state.paycheck_modal = false;
      state.paycheck = {
        id: "",
        affiliate: "",
        team: "",
        amount: 0,
        venmo: "",
        paid: "",
        reciept: "",
        paid_at: ""
      };
    },
    open_paycheck_modal: (state, { payload }) => {
      state.paycheck_modal = true;
      state.paycheck = payload;
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

export const {
  set_loading,
  set_paycheck,
  set_edit_paycheck_modal,
  open_create_paycheck_modal,
  open_paycheck_modal,
  close_paycheck_modal,
  open_edit_paycheck_modal
} = paycheckPage.actions;
export default paycheckPage.reducer;
