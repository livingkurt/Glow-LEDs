/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";
import { format_date } from "../utils/helper_functions";

const paycheck = {
  id: "",
  affiliate: "",
  team: "",
  amount: 0,
  venmo: "",
  paid: "",
  reciept: "",
  paid_at: ""
};

const paycheckPage = createSlice({
  name: "paycheckPage",
  initialState: {
    loading: false,
    paychecks: [],
    paycheck: paycheck,
    remoteVersionRequirement: 0,
    edit_paycheck_modal: false,
    paycheck_modal: false,
    message: "",
    error: {}
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
      state.paycheck = paycheck;
    },
    open_edit_paycheck_modal: (state, { payload }) => {
      state.edit_paycheck_modal = true;
      state.paycheck = payload;
    },
    close_paycheck_modal: (state, { payload }) => {
      state.paycheck_modal = false;
      state.paycheck = paycheck;
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
      state.remoteVersionRequirement = Date.now();
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
      state.remoteVersionRequirement = Date.now();
    },
    [API.deletePaycheck.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteMultiplePaychecks.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteMultiplePaychecks.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Paycheck Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteMultiplePaychecks.rejected as any]: (state: any, { payload }: any) => {
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
