import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api/wholesalerApi";

const wholesalersSlice = createSlice({
  name: "wholesalers",
  initialState: {
    loading: false,
    wholesalers: [],
    wholesaler: {
      user: "",
      company: "",
      minimum_order_amount: "",
      active: false
    },
    remoteVersionRequirement: 0,
    edit_wholesaler_modal: false,
    wholesaler_modal: false,
    message: "",
    success: false,
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
    set_wholesaler: (state, { payload }) => {
      const updated_wholesaler = payload;
      return {
        ...state,
        wholesaler: { ...state.wholesaler, ...updated_wholesaler }
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
      state.wholesaler = {
        user: "",
        company: "",
        minimum_order_amount: "",
        active: false
      };
    },
    open_edit_wholesaler_modal: (state, { payload }) => {
      state.edit_wholesaler_modal = true;
      state.wholesaler = payload;
    },
    close_wholesaler_modal: (state, { payload }) => {
      state.wholesaler_modal = false;
      state.wholesaler = {
        user: "",
        company: "",
        minimum_order_amount: "",
        active: false
      };
    },
    open_wholesaler_modal: (state, { payload }) => {
      state.wholesaler_modal = true;
      state.wholesaler = payload;
    }
  },
  extraReducers: {
    [API.listWholesalers.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.wholesalers = [];
    },
    [API.listWholesalers.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.wholesalers = payload.data;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Wholesalers Found";
    },
    [API.listWholesalers.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.saveWholesaler.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveWholesaler.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.edit_wholesaler_modal = false;
      state.success = true;
      state.message = "Wholesaler Saved";
      state.remoteVersionRequirement = Date.now();
    },
    [API.saveWholesaler.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsWholesaler.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsWholesaler.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.wholesaler = payload;
      state.message = "Wholesaler Found";
    },
    [API.detailsWholesaler.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteWholesaler.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteWholesaler.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.wholesaler = payload.wholesaler;
      state.message = "Wholesaler Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteWholesaler.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const {
  set_loading,
  set_wholesaler,
  set_edit_wholesaler_modal,
  open_create_wholesaler_modal,
  open_wholesaler_modal,
  close_wholesaler_modal,
  open_edit_wholesaler_modal
} = wholesalersSlice.actions;
export default wholesalersSlice.reducer;
