/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api/surveyApi";

const surveySlice = createSlice({
  name: "surveys",
  initialState: {
    loading: false,
    surveys: [],
    survey: {
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
    set_survey: (state, { payload }) => {
      const updated_survey = payload;
      return {
        ...state,
        survey: { ...state.survey, ...updated_survey }
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
    [API.listSurveys.pending]: (state: any, { payload }: any) => {
      state.loading = true;
      state.surveys = [];
    },
    [API.listSurveys.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.surveys = payload.surveys;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Surveys Found";
    },
    [API.listSurveys.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.saveSurvey.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveSurvey.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.survey = payload.survey;
      state.message = "Survey Saved";
    },
    [API.saveSurvey.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsSurvey.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsSurvey.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.survey = payload;
      state.message = "Survey Found";
    },
    [API.detailsSurvey.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteSurvey.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteSurvey.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.survey = payload.survey;
      state.message = "Survey Deleted";
    },
    [API.deleteSurvey.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_survey } = surveySlice.actions;
export default surveySlice.reducer;
