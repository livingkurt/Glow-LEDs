/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const shippingSlice = createSlice({
  name: "shippingSlice",
  initialState: {
    loading_label: false,
    invoice: "",
    label: "",
    shippingRates: [],
    shippingRate: {},
    create_pickup_modal: false,
    createLabelModal: false,
    csvLabel: [],
    rate: {},
    hideLabelButton: true,
    parcel: {},
    toShipping: {
      first_name: "",
      last_name: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      international: "",
      phone: "",
      email: "",
      company: ""
    },
    fromShipping: {
      first_name: "",
      last_name: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      international: "",
      phone: "",
      email: "",
      company: ""
    }
  },
  reducers: {
    clearPrints: (state, { payload }) => {
      state.invoice = "";
      state.label = "";
    },
    setToShipping: (state, { payload }) => {
      const updatedToShipping = payload;
      return {
        ...state,
        toShipping: { ...state.toShipping, ...updatedToShipping }
      };
    },
    setFromShipping: (state, { payload }) => {
      const updatedFromShipping = payload;
      return {
        ...state,
        fromShipping: { ...state.fromShipping, ...updatedFromShipping }
      };
    },
    setParcel: (state, { payload }) => {
      state.parcel = payload;
    },
    chooseShippingRate: (state, { payload }) => {
      const { rate, speed } = payload;
      state.hideLabelButton = false;
      state.shippingRate = rate;
      state.rate = { rate, speed };
    },
    openCreateLabelModal: (state, { payload }) => {
      state.createLabelModal = true;
    },
    closeCreateLabelModal: (state, { payload }) => {
      state.createLabelModal = false;
    },
    open_create_pickup_modal: (state, { payload }) => {
      state.create_pickup_modal = true;
    },
    close_create_pickup_modal: (state, { payload }) => {
      state.create_pickup_modal = false;
    },
    reChooseShippingRate: (state, { payload }) => {
      state.hideLabelButton = true;
      state.shippingRate = {};
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
    },
    [API.createTracker.pending as any]: (state: any, { payload }: any) => {
      state.loading_label = true;
    },
    [API.createTracker.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading_label = false;
    },
    [API.createTracker.rejected as any]: (state: any, { payload }: any) => {
      state.loading_label = false;
    },
    [API.generateCSVLabel.pending as any]: (state: any, { payload }: any) => {
      state.loading_label = true;
    },
    [API.generateCSVLabel.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading_label = false;
      state.csvLabel = payload;
    },
    [API.generateCSVLabel.rejected as any]: (state: any, { payload }: any) => {
      state.loading_label = false;
    },
    [API.differentShippingRates.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.shippingRates = [];
    },
    [API.differentShippingRates.fulfilled as any]: (state: any, { payload }: any) => {
      const { shipment } = payload;
      state.loading = false;
      state.success = true;
      state.shippingRates = shipment.rates;
      state.shipment_id = shipment.id;
      state.message = "Orders Transfered to New User";
    },
    [API.differentShippingRates.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const {
  clearPrints,
  chooseShippingRate,
  reChooseShippingRate,
  open_create_pickup_modal,
  close_create_pickup_modal,
  openCreateLabelModal,
  closeCreateLabelModal,
  setToShipping,
  setFromShipping,
  setParcel
} = shippingSlice.actions;
export default shippingSlice.reducer;
