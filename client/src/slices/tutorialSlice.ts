/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api/tutorialApi";

const tutorialsSlice = createSlice({
  name: "tutorials",
  initialState: {
    loading: false,
    tutorials: [],
    tutorial: {
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
    set_tutorial: (state, { payload }) => {
      const updated_tutorial = payload;
      return {
        ...state,
        tutorial: { ...state.tutorial, ...updated_tutorial }
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
    [API.listTutorials.pending]: (state: any, { payload }: any) => {
      state.loading = true;
      state.tutorials = [];
    },
    [API.listTutorials.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.tutorials = payload.tutorials;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Tutorials Found";
    },
    [API.listTutorials.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.createTutorial.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.createTutorial.fulfilled]: (state: any, { payload }: any) => {
      const tutorial = {
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
      state.tutorial = tutorial;
      state.message = "Tutorial Saved";
    },
    [API.createTutorial.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.updateTutorial.pending]: (state: any, { payload }: any) => {
      state.loading = true;
      state.success = false;
    },
    [API.updateTutorial.fulfilled]: (state: any, { payload }: any) => {
      const tutorial = {
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
      state.tutorial = tutorial;
      state.message = "Tutorial Saved";
    },
    [API.updateTutorial.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
      state.success = false;
    },
    [API.detailsTutorial.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsTutorial.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.tutorial = payload;
      state.message = "Tutorial Found";
    },
    [API.detailsTutorial.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteTutorial.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteTutorial.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.tutorial = payload.tutorial;
      state.message = "Tutorial Deleted";
    },
    [API.deleteTutorial.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_success, set_limit, set_loading, set_tutorial } = tutorialsSlice.actions;
export default tutorialsSlice.reducer;
