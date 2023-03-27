/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const surveySlice = createSlice({
  name: "surveys",
  initialState: {
    loading: false,
    surveys: [],
    survey: {
      id: "",
      question_1: "",
      question_2: "",
      question_3: "",
      question_4: "",
      question_5: "",
      answer_1: "",
      answer_2: "",
      answer_3: "",
      answer_4: "",
      answer_5: "",
      user: "",
      survey_questions: "",
      order: "",
      is_survey: "",
      active: "",
      rating: null
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
    [API.listSurveys.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.surveys = [];
    },
    [API.listSurveys.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.surveys = payload.surveys;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Surveys Found";
    },
    [API.listSurveys.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.saveSurvey.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveSurvey.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Survey Saved";
    },
    [API.saveSurvey.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsSurvey.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsSurvey.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.survey = payload;
      state.message = "Survey Found";
    },
    [API.detailsSurvey.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteSurvey.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteSurvey.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.survey = payload.survey;
      state.message = "Survey Deleted";
    },
    [API.deleteSurvey.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_survey } = surveySlice.actions;
export default surveySlice.reducer;
