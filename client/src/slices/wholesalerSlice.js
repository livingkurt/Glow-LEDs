import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api/wholesalerApi";

const wholesaler = {
  user: {
    first_name: "",
    last_name: "",
    email: "",
    is_affiliated: false,
    is_employee: false,
    affiliate: {},
    isVerified: false,
    isAdmin: false,
    shipping: {
      first_name: "",
      last_name: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postalCode: "",
      international: false,
      country: "",
    },
    email_subscription: false,
    stripe_connect_id: "",
    weekly_wage: 0,
    isWholesaler: false,
    guest: false,
    international: false,
  },
  company: "",
  minimum_order_amount: "",
  active: false,
};

const wholesalerPage = createSlice({
  name: "wholesalerPage",
  initialState: {
    loading: false,
    wholesalers: [],
    wholesaler: wholesaler,
    remoteVersionRequirement: 0,
    edit_wholesaler_modal: false,
    wholesaler_modal: false,
    message: "",
    success: false,
    error: {},
  },
  reducers: {
    set_wholesaler: (state, { payload }) => {
      const updated_wholesaler = payload;
      return {
        ...state,
        wholesaler: { ...state.wholesaler, ...updated_wholesaler },
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_success: (state, { payload }) => {
      state.success = payload;
    },
    set_edit_wholesaler_modal: (state, { payload }) => {
      state.edit_wholesaler_modal = payload;
    },
    open_create_wholesaler_modal: (state, { payload }) => {
      state.edit_wholesaler_modal = true;
      state.wholesaler = wholesaler;
    },
    open_edit_wholesaler_modal: (state, { payload }) => {
      state.edit_wholesaler_modal = true;
      state.wholesaler = payload;
    },
    close_wholesaler_modal: (state, { payload }) => {
      state.wholesaler_modal = false;
      state.wholesaler = wholesaler;
    },
    open_wholesaler_modal: (state, { payload }) => {
      state.wholesaler_modal = true;
      state.wholesaler = payload;
    },
  },
  extraReducers: {
    [API.listWholesalers.pending as any]: (state, { payload }) => {
      state.loading = true;
      state.wholesalers = [];
    },
    [API.listWholesalers.fulfilled as any]: (state, { payload }) => {
      state.loading = false;
      state.wholesalers = payload.data;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Wholesalers Found";
    },
    [API.listWholesalers.rejected as any]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveWholesaler.pending as any]: (state, { payload }) => {
      state.loading = true;
    },
    [API.saveWholesaler.fulfilled as any]: (state, { payload }) => {
      state.loading = false;
      state.edit_wholesaler_modal = false;
      state.success = true;
      state.message = "Wholesaler Saved";
      state.remoteVersionRequirement = Date.now();
    },
    [API.saveWholesaler.rejected as any]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsWholesaler.pending as any]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsWholesaler.fulfilled as any]: (state, { payload }) => {
      state.loading = false;
      state.wholesaler = payload;
      state.message = "Wholesaler Found";
    },
    [API.detailsWholesaler.rejected as any]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteWholesaler.pending as any]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteWholesaler.fulfilled as any]: (state, { payload }) => {
      state.loading = false;
      state.wholesaler = payload.wholesaler;
      state.message = "Wholesaler Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteWholesaler.rejected as any]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_wholesaler,
  set_edit_wholesaler_modal,
  open_create_wholesaler_modal,
  open_wholesaler_modal,
  close_wholesaler_modal,
  open_edit_wholesaler_modal,
} = wholesalerPage.actions;
export default wholesalerPage.reducer;
