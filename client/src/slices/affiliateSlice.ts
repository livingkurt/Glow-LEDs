/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api/affiliateApi";

const affiliatesSlice = createSlice({
  name: "affiliates",
  initialState: {
    loading: false,
    affiliates: [],
    affiliate: {},
    message: "",
    error: {},
    affilate: {},
    search: "",
    sort: "",
    page: 1,
    limit: 10,
    public_code: "",
    private_code: "",
    loading_checkboxes: false,
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
    },
    set_public_code: (state, { payload }) => {
      state.public_code = payload;
    },
    set_private_code: (state, { payload }) => {
      state.private_code = payload;
    },
    set_loading_checkboxes: (state, { payload }) => {
      state.loading_checkboxes = payload;
    }
  },
  extraReducers: {
    [API.listAffiliates.pending]: (state: any, { payload }: any) => {
      state.loading = true;
      state.affilaites = [];
    },
    [API.listAffiliates.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.affiliates = payload.affiliates;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Affiliates Found";
    },
    [API.listAffiliates.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.saveAffiliate.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveAffiliate.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.affiliate = payload.affiliate;
      state.message = "Affiliate Saved";
    },
    [API.saveAffiliate.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsAffiliate.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsAffiliate.fulfilled]: (state: any, { payload }: any) => {
      console.log({ payload });
      state.loading = false;
      state.affiliate = payload;
      state.message = "Affiliate Found";
    },
    [API.detailsAffiliate.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteAffiliate.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteAffiliate.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.affiliate = payload.affiliate;
      state.message = "Affiliate Deleted";
    },
    [API.deleteAffiliate.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const {
  set_search,
  set_sort,
  set_page,
  set_limit,
  set_loading,
  set_affiliate,
  set_public_code,
  set_private_code,
  set_loading_checkboxes
} = affiliatesSlice.actions;
export default affiliatesSlice.reducer;
