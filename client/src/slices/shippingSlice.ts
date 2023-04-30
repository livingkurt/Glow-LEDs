/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const shippingSlice = createSlice({
  name: "shippingSlice",
  initialState: {
    loading_label: false,
    invoice: "",
    label: ""
  },
  reducers: {
    clearPrints: (state, { payload }) => {
      state.invoice = "";
      state.label = "";
    }
  },
  extraReducers: {
    [API.buyLabel.pending as any]: (state: any, { payload }: any) => {
      state.loading_label = true;
      state.invoice = "";
      state.label = "";
    },
    [API.buyLabel.fulfilled as any]: (state: any, { payload }: any) => {
      const { invoice, label } = payload;
      state.loading_label = false;
      state.invoice = invoice;
      state.label = label;
      state.message = "Label Bought";
    },
    [API.buyLabel.rejected as any]: (state: any, { payload }: any) => {
      state.loading_label = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.createLabel.pending as any]: (state: any, { payload }: any) => {
      state.loading_label = true;
      state.invoice = "";
      state.label = "";
    },
    [API.createLabel.fulfilled as any]: (state: any, { payload }: any) => {
      const { invoice, label } = payload;
      state.loading_label = false;
      state.invoice = invoice;
      state.label = label;
      state.message = "Label Bought";
    },
    [API.createLabel.rejected as any]: (state: any, { payload }: any) => {
      state.loading_label = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.createReturnLabel.pending as any]: (state: any, { payload }: any) => {
      state.loading_label = true;
      state.invoice = "";
      state.label = "";
    },
    [API.createReturnLabel.fulfilled as any]: (state: any, { payload }: any) => {
      const { label } = payload;
      state.loading_label = false;
      state.label = label;
      state.message = "Label Bought";
    },
    [API.createReturnLabel.rejected as any]: (state: any, { payload }: any) => {
      state.loading_label = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { clearPrints } = shippingSlice.actions;
export default shippingSlice.reducer;
