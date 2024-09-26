/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

import * as API from "../api";
import { handleTokenRefresh } from "./axiosInstance";

export const getTeams = async ({ search, sorting, filters, page, pageSize }) => {
  try {
    return await axios.get(`/api/teams/table`, {
      params: {
        limit: pageSize,
        page: page,
        search: search,
        sort: sorting,
        filters: JSON.stringify(filters),
      },
    });
  } catch (error) {
    store.dispatch(showError({ message: errorMessage(error) }));
  }
};

export const listTeams = createAsyncThunk("teams/listTeams", async (query, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/teams?${create_query(query)}`);
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const saveTeam = createAsyncThunk(
  "teams/saveTeam",
  async ({ team, profile }, { dispatch, rejectWithValue, getState }) => {
    try {
      const {
        users: {
          userPage: { current_user, user },
        },
      } = getState();

      const newTeam = !team._id;
      const teamWithCaptain = {
        ...team,
        captain: user?.affiliate._id,
        affiliates: [user?.affiliate?._id],
      };
      if (newTeam) {
        const { data } = await axios.post("/api/teams", teamWithCaptain);
        dispatch(showSuccess({ message: `Team Created` }));
        if (profile) {
          await dispatch(API.saveUser({ user: { _id: current_user._id, team: data.newTeam._id }, profile }));
        }
        return data;
      } else {
        const { data } = await axios.put(`/api/teams/${team._id}`, team);
        dispatch(showSuccess({ message: `Team Updated` }));
        return data;
      }
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const detailsTeam = createAsyncThunk(
  "teams/detailsTeam",
  async ({ pathname, id, affiliateId }, { dispatch, rejectWithValue }) => {
    console.log({ pathname, id, affiliateId });
    try {
      if (id) {
        const { data } = await axios.get(`/api/teams/${id}`);
        return data;
      } else if (pathname) {
        const { data } = await axios.get(`/api/teams/${pathname}/pathname`);
        return data;
      } else if (affiliateId) {
        const { data } = await axios.get(`/api/teams/${affiliateId}/affiliate`);
        return data;
      }
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteTeam = createAsyncThunk("teams/deleteTeam", async (id, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`/api/teams/${id}`);
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const generateTeamCodes = createAsyncThunk(
  "teams/generateTeamCodes",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/teams/${id}/generate_team_codes`);

      dispatch(showSuccess({ message: `Codes Generated` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const teamEarnings = createAsyncThunk(
  "teams/teamEarnings",
  async ({ promo_code, start_date, end_date, sponsor, type }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/api/orders/code_usage/${promo_code}?start_date=${start_date}&end_date=${end_date}&sponsor=${sponsor}`
      );
      return { data, type };
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const teamMonthlyCheckin = createAsyncThunk(
  "team/teamMonthlyCheckin",
  async ({ teamId, questionsConcerns, numberOfContent, month, year }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/teams/${teamId}/monthly_checkin`, {
        questionsConcerns,
        numberOfContent,
        month,
        year,
      });
      dispatch(showSuccess({ message: `Checkin Success` }));
      await handleTokenRefresh(true);
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);
