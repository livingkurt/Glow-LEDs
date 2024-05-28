/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const survey = {
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
  question_answer: [{ question: "", answer: "" }],
  user: "",
  survey_questions: "",
  order: "",
  is_survey: "",
  active: "",
  rating: null,
};

const surveyPage = createSlice({
  name: "surveyPage",
  initialState: {
    loading: false,
    surveys: [],
    survey: survey,
    remoteVersionRequirement: 0,
    edit_survey_modal: false,
    upload_survey_modal: false,
    survey_modal: false,
    message: "",
    error: {},
  },
  reducers: {
    set_survey: (state, { payload }) => {
      const updated_survey = payload;
      return {
        ...state,
        survey: { ...state.survey, ...updated_survey },
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_edit_survey_modal: (state, { payload }) => {
      state.edit_survey_modal = payload;
    },
    open_create_survey_modal: (state, { payload }) => {
      state.edit_survey_modal = true;
      state.survey = survey;
    },
    open_edit_survey_modal: (state, { payload }) => {
      state.edit_survey_modal = true;
      state.survey = payload;
    },
    close_survey_modal: (state, { payload }) => {
      state.edit_survey_modal = false;
      state.upload_survey_modal = false;
      state.survey_modal = false;
      state.survey = survey;
    },
    open_survey_modal: (state, { payload }) => {
      state.survey_modal = true;
      state.survey = payload;
    },
    survey_uploaded: (state, { payload }) => {
      state.upload_survey_modal = false;
      state.remoteVersionRequirement = Date.now();
    },
  },
  extraReducers: {
    [API.listSurveys.pending]: (state, { payload }) => {
      state.loading = true;
      state.surveys = [];
    },
    [API.listSurveys.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.surveys = payload.surveys;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Surveys Found";
    },
    [API.listSurveys.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveSurvey.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.saveSurvey.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Survey Saved";
      state.remoteVersionRequirement = Date.now();
      state.edit_survey_modal = false;
    },
    [API.saveSurvey.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsSurvey.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsSurvey.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.survey = payload;
      state.message = "Survey Found";
    },
    [API.detailsSurvey.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteSurvey.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteSurvey.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Survey Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteSurvey.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_survey,
  set_edit_survey_modal,
  open_create_survey_modal,
  open_survey_modal,
  close_survey_modal,
  open_edit_survey_modal,
  survey_uploaded,
} = surveyPage.actions;
export default surveyPage.reducer;
