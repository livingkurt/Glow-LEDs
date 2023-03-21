/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api/wholesalerApi";

const wholesalersSlice = createSlice({
  name: "wholesalers",
  initialState: {
    loading: false,
    wholesalers: [],
    wholesaler: {
      id: "",
      user: undefined,
      artist_name: "",
      instagram_handle: "",
      facebook_name: "",
      percentage_off: "",
      sponsor: "",
      promoter: "",
      rave_mob: "",
      active: "",
      style: "",
      inspiration: "",
      bio: "",
      link: "",
      picture: "",
      location: "",
      years: "",
      team: "",
      video: "",
      venmo: "",
      products: [],
      chips: [],
      pathname: "",
      public_code: undefined,
      private_code: undefined
    },
    message: "",
    success: false,
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
    [API.listWholesalers.pending]: (state: any, { payload }: any) => {
      state.loading = true;
      state.wholesalers = [];
    },
    [API.listWholesalers.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.wholesalers = payload.wholesalers;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Wholesalers Found";
    },
    [API.listWholesalers.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.createWholesaler.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.createWholesaler.fulfilled]: (state: any, { payload }: any) => {
      const wholesaler = {
        id: "",
        user: undefined,
        artist_name: "",
        instagram_handle: "",
        facebook_name: "",
        percentage_off: "",
        sponsor: "",
        promoter: "",
        rave_mob: "",
        active: "",
        style: "",
        inspiration: "",
        bio: "",
        link: "",
        picture: "",
        location: "",
        years: "",
        team: "",
        video: "",
        venmo: "",
        products: [],
        chips: [],
        pathname: "",
        public_code: undefined,
        private_code: undefined
      };
      state.loading = false;
      state.wholesaler = wholesaler;
      state.message = "Wholesaler Saved";
    },
    [API.createWholesaler.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.updateWholesaler.pending]: (state: any, { payload }: any) => {
      state.loading = true;
      state.success = false;
    },
    [API.updateWholesaler.fulfilled]: (state: any, { payload }: any) => {
      const wholesaler = {
        id: "",
        user: undefined,
        artist_name: "",
        instagram_handle: "",
        facebook_name: "",
        percentage_off: "",
        sponsor: "",
        promoter: "",
        rave_mob: "",
        active: "",
        style: "",
        inspiration: "",
        bio: "",
        link: "",
        picture: "",
        location: "",
        years: "",
        team: "",
        video: "",
        venmo: "",
        products: [],
        chips: [],
        pathname: "",
        public_code: undefined,
        private_code: undefined
      };
      state.loading = false;
      state.success = true;
      state.wholesaler = wholesaler;
      state.message = "Wholesaler Saved";
    },
    [API.updateWholesaler.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
      state.success = false;
    },
    [API.detailsWholesaler.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsWholesaler.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.wholesaler = payload;
      state.message = "Wholesaler Found";
    },
    [API.detailsWholesaler.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteWholesaler.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteWholesaler.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.wholesaler = payload.wholesaler;
      state.message = "Wholesaler Deleted";
    },
    [API.deleteWholesaler.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_success, set_limit, set_loading, set_wholesaler } = wholesalersSlice.actions;
export default wholesalersSlice.reducer;
