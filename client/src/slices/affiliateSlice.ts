/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const affiliatesSlice = createSlice({
  name: "affiliates",
  initialState: {
    loading: false,
    affiliates: [],
    affiliate: {
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
    remoteVersionRequirement: 0,
    edit_affiliate_modal: false,
    affiliate_modal: false,
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
    set_affiliate: (state, { payload }) => {
      const updated_affiliate = payload;
      return {
        ...state,
        affiliate: { ...state.affiliate, ...updated_affiliate }
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_success: (state, { payload }) => {
      state.success = payload;
    },
    set_edit_affiliate_modal: (state, { payload }) => {
      state.edit_affiliate_modal = payload;
    },
    open_create_affiliate_modal: (state, { payload }) => {
      state.edit_affiliate_modal = true;
      state.affiliate = {
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
    },
    open_edit_affiliate_modal: (state, { payload }) => {
      state.edit_affiliate_modal = true;
      state.affiliate = payload;
    },
    close_affiliate_modal: (state, { payload }) => {
      state.affiliate_modal = false;
      state.affiliate = {
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
    },
    open_affiliate_modal: (state, { payload }) => {
      state.affiliate_modal = true;
      state.affiliate = payload;
    }
  },
  extraReducers: {
    [API.listAffiliates.pending as any as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.affiliates = [];
    },
    [API.listAffiliates.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.affiliates = payload.data;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Affiliates Found";
    },
    [API.listAffiliates.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.saveAffiliate.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveAffiliate.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.success = true;
      state.edit_affiliate_modal = false;
      state.message = "Affiliate Saved";
      state.remoteVersionRequirement = Date.now();
    },
    [API.saveAffiliate.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsAffiliate.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsAffiliate.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.affiliate = payload;
      state.message = "Affiliate Found";
    },
    [API.detailsAffiliate.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteAffiliate.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteAffiliate.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.affiliate = payload.affiliate;
      state.message = "Affiliate Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteAffiliate.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.affiliateEarnings.pending as any]: (state: any, { payload }: any) => {
      state.loading_year_earnings = true;
      state.loading_month_earnings = true;
    },
    [API.affiliateEarnings.fulfilled as any]: (state: any, { payload }: any) => {
      const { data, type } = payload;
      if (type === "month") {
        state.month_earnings = data;
        state.loading_month_earnings = false;
      } else if (type === "year") {
        state.year_earnings = data;
        state.loading_year_earnings = false;
      }

      state.message = "Affiliate Earnings Found";
      state.remoteVersionRequirement = Date.now();
    },
    [API.affiliateEarnings.rejected as any]: (state: any, { payload }: any) => {
      state.loading_month_earnings = false;
      state.loading_year_earnings = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const {
  set_success,
  set_loading,
  set_affiliate,
  open_create_affiliate_modal,
  open_edit_affiliate_modal,
  close_affiliate_modal,
  open_affiliate_modal,
  set_edit_affiliate_modal
} = affiliatesSlice.actions;
export default affiliatesSlice.reducer;
