/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const listTeams = createAsyncThunk("teams/listTeams", async (query, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/teams?${create_query(query)}`);
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const saveTeam = createAsyncThunk("teams/saveTeam", async (team, { dispatch, rejectWithValue }) => {
  try {
    if (!team._id) {
      const { data } = await axios.post("/api/teams", team);
      return data;
    } else {
      const { data } = await axios.put(`/api/teams/${team._id}`, team);
      return data;
    }
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const detailsTeam = createAsyncThunk("teams/detailsTeam", async (pathname, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/teams/${pathname}`);
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const deleteTeam = createAsyncThunk("teams/deleteTeam", async (pathname, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.delete("/api/teams/" + pathname);
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});
