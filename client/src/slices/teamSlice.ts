/* eslint-disable max-lines-per-function */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const teamPage = createSlice({
  name: "teamPage",
  initialState: {
    loading: false,
    teams: [],
    team: {
      _id: "",
      affiliate: "",
      affiliates: [],
      team_name: "",
      instagram_handle: "",
      facebook_name: "",
      percentage_off: "",
      promo_code: "",
      captain: "",
      sponsor: "",
      promoter: "",
      rave_mob: "",
      active: "",
      bio: "",
      map: "",
      link: "",
      pathname: "",
      images: [],
      image: "",
      picture: "",
      video: "",
      public_code: "",
      private_code: "",
      venmo: ""
    },
    message: "",
    error: {},
    search: "",
    sort: "",
    page: 1,
    limit: 10
  },
  reducers: {
    set_team: (state, { payload }) => {
      const updated_team = payload;
      return {
        ...state,
        team: { ...state.team, ...updated_team }
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
    [API.listTeams.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.teams = [];
    },
    [API.listTeams.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.teams = payload.teams;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Teams Found";
    },
    [API.listTeams.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.saveTeam.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveTeam.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Team Saved";
    },
    [API.saveTeam.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsTeam.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsTeam.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.team = payload;
      state.message = "Team Found";
    },
    [API.detailsTeam.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteTeam.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteTeam.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.team = payload.team;
      state.message = "Team Deleted";
    },
    [API.deleteTeam.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_team } = teamPage.actions;
export default teamPage.reducer;
