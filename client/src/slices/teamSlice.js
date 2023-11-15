/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const team = {
  user: null,
  products: [],
  chips: [],
  artist_name: "",
  instagram_handle: "",
  facebook_name: "",
  youtube_link: "",
  facebook_link: "",
  instagram_link: "",
  tiktok_link: "",
  tiktok: "",
  percentage_off: 0,
  public_code: null,
  private_code: null,
  location: "",
  years: "",
  start_year: "",
  bio: "",
  picture: "",
  video: "",
  style: "",
  inspiration: "",
  link: "",
  venmo: "",
  pathname: "",
  answers: [],
  promoter: true,
  rave_mob: false,
  team: false,
  sponsor: false,
  active: true,
  deleted: false,
};

const teamPage = createSlice({
  name: "teamPage",
  initialState: {
    loading: false,
    teams: [],
    team: team,
    remoteVersionRequirement: 0,
    edit_team_modal: false,
    team_modal: false,
    message: "",
    month_earnings: { revenue: 0, number_of_uses: 0 },
    loading_month_earnings: false,
    year_earnings: { revenue: 0, number_of_uses: 0 },
    loading_year_earnings: false,
    success: false,
    error: {},
    search: "",
    sort: "",
    page: 1,
    limit: 10,
    month: "",
    year: "",
    files: [],
    monthlyCheckinModal: false,
    monthlyCheckinSuccess: false,
    loadingSaveTeam: false,
    questionsConcerns: "",
    numberOfContent: 0,
    createTeamStep: 0,
  },
  reducers: {
    set_team: (state, { payload }) => {
      const updated_team = payload;
      return {
        ...state,
        team: { ...state.team, ...updated_team },
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_success: (state, { payload }) => {
      state.success = payload;
    },
    set_edit_team_modal: (state, { payload }) => {
      state.edit_team_modal = payload;
    },
    open_create_team_modal: (state, { payload }) => {
      state.edit_team_modal = true;
      state.team = team;
    },
    open_edit_team_modal: (state, { payload }) => {
      state.edit_team_modal = true;
      state.team = payload;
    },
    close_team_modal: (state, { payload }) => {
      state.team_modal = false;
      state.team = team;
    },
    open_team_modal: (state, { payload }) => {
      state.team_modal = true;
      state.team = payload;
    },
    setMonth: (state, { payload }) => {
      state.month = payload;
    },
    setFiles: (state, { payload }) => {
      state.files = payload;
    },
    openMonthlyCheckinModal: (state, { payload }) => {
      const { month, year } = payload;
      state.monthlyCheckinModal = true;
      state.month = month;
      state.year = year;
      state.numberOfContent = 0;
      state.questionsConcerns = "";
    },
    closeMonthlyCheckinModal: (state, { payload }) => {
      state.monthlyCheckinModal = false;
      state.month = "";
      state.year = "";
    },
    setNumberOfContent: (state, { payload }) => {
      state.numberOfContent = payload;
    },
    setCheckin: (state, { payload }) => {
      const { numberOfContent, questionsConcerns } = payload;
      state.numberOfContent = numberOfContent;
      state.questionsConcerns = questionsConcerns;
    },
    setQuestion: (state, { payload }) => {
      state.questionsConcerns = payload;
    },
    addNewCheckin: (state, { payload }) => {
      state.team = payload;
    },
    showStripeAccountLink: (state, { payload }) => {
      state.stripeAccountLinkModal = true;
      state.stripeAccountLink = payload.link;
    },
    setCreateTeamStep: (state, { payload }) => {
      state.createTeamStep = payload;
    },
  },
  extraReducers: {
    [API.listTeams.pending]: (state, { payload }) => {
      state.loading = true;
      state.teams = [];
    },
    [API.listTeams.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.teams = payload.teams;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Teams Found";
    },
    [API.listTeams.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveTeam.pending]: (state, { payload }) => {
      state.loadingSaveTeam = true;
    },
    [API.saveTeam.fulfilled]: (state, { payload }) => {
      state.loadingSaveTeam = false;
      state.success = true;
      state.createTeamStep = 1;
      state.stripeAccountLink = payload?.accountLink?.url;
      state.message = "Team Saved";
      state.remoteVersionRequirement = Date.now();
    },
    [API.saveTeam.rejected]: (state, { payload, error }) => {
      state.loadingSaveTeam = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsTeam.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsTeam.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.team = payload;
      state.message = "Team Found";
    },
    [API.detailsTeam.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteTeam.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteTeam.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.team = payload.team;
      state.message = "Team Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteTeam.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.teamMonthlyCheckin.pending]: (state, { payload }) => {
      state.loading = true;
      state.monthlyCheckinSuccess = false;
    },
    [API.teamMonthlyCheckin.fulfilled]: (state, { payload }) => {
      state.monthlyCheckinModal = false;
      state.numberOfContent = 0;
      state.questionsConcerns = "";
      state.monthlyCheckinSuccess = true;
    },
    [API.teamMonthlyCheckin.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.monthlyCheckinSuccess = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.teamEarnings.pending]: (state, { payload }) => {
      state.loading_year_earnings = true;
      state.loading_month_earnings = true;
    },
    [API.teamEarnings.fulfilled]: (state, { payload }) => {
      const { data, type } = payload;
      if (type === "month") {
        state.month_earnings = data;
        state.loading_month_earnings = false;
      } else if (type === "year") {
        state.year_earnings = data;
        state.loading_year_earnings = false;
      }

      state.message = "Team Earnings Found";
      state.remoteVersionRequirement = Date.now();
    },
    [API.teamEarnings.rejected]: (state, { payload, error }) => {
      state.loading_month_earnings = false;
      state.loading_year_earnings = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_success,
  set_loading,
  set_team,
  open_create_team_modal,
  open_edit_team_modal,
  close_team_modal,
  open_team_modal,
  set_edit_team_modal,
  openMonthlyCheckinModal,
  closeMonthlyCheckinModal,
  setMonth,
  setFiles,
  setQuestion,
  setNumberOfContent,
  setCheckin,
  addNewCheckin,
  setCreateTeamStep,
} = teamPage.actions;
export default teamPage.reducer;
