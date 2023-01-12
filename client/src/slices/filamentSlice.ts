/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api/filamentApi";

const filamentSlice = createSlice({
  name: "filaments",
  initialState: {
    loading: false,
    filaments: [],
    filament: {
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
    set_filament: (state, { payload }) => {
      const updated_filament = payload;
      return {
        ...state,
        filament: { ...state.filament, ...updated_filament }
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
    [API.listFilaments.pending]: (state: any, { payload }: any) => {
      state.loading = true;
      state.filaments = [];
    },
    [API.listFilaments.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.filaments = payload.filaments;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Filaments Found";
    },
    [API.listFilaments.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.createFilament.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.createFilament.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.filament = payload.filament;
      state.message = "Filament Saved";
    },
    [API.createFilament.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.updateFilament.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.updateFilament.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.filament = payload.filament;
      state.message = "Filament Saved";
    },
    [API.updateFilament.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsFilament.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsFilament.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.filament = payload;
      state.message = "Filament Found";
    },
    [API.detailsFilament.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteFilament.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteFilament.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.filament = payload.filament;
      state.message = "Filament Deleted";
    },
    [API.deleteFilament.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_filament } = filamentSlice.actions;
export default filamentSlice.reducer;
