/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Covy from "../shared/GlowLEDsComponents/GLCovy/GLCovy";
import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";

export const listTeams = createAsyncThunk("teams/listTeams", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/teams?${create_query(query)}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveTeam = createAsyncThunk("teams/saveTeam", async (team: any, thunkApi: any) => {
  try {
    if (!team._id) {
      const { data } = await axios.post("/api/teams", team);
      return data;
    } else {
      const { data } = await axios.put(`/api/teams/${team._id}`, team);
      return data;
    }
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsTeam = createAsyncThunk("teams/detailsTeam", async (pathname: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/teams/${pathname}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteTeam = createAsyncThunk("teams/deleteTeam", async (pathname, thunkApi: any) => {
  try {
    const { data } = await axios.delete("/api/teams/" + pathname);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});
