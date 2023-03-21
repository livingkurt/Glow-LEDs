/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const teamSlice = createSlice({
  name: "teams",
  initialState: {
    loading: false,
    teams: [],
    team: {},
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
    [API.listTeams.pending]: (state: any, { payload }: any) => {
      state.loading = true;
      state.teams = [];
    },
    [API.listTeams.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.teams = payload.teams;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Teams Found";
    },
    [API.listTeams.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.saveTeam.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveTeam.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.team = payload.team;
      state.message = "Team Saved";
    },
    [API.saveTeam.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsTeam.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsTeam.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.team = payload;
      state.message = "Team Found";
    },
    [API.detailsTeam.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteTeam.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteTeam.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.team = payload.team;
      state.message = "Team Deleted";
    },
    [API.deleteTeam.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_team } = teamSlice.actions;
export default teamSlice.reducer;
