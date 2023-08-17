/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Covy from "../shared/GlowLEDsComponents/GLCovy/GLCovy";
import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";

export const listSurveys = createAsyncThunk("surveys/listSurveys", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/surveys?${create_query(query)}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveSurvey = createAsyncThunk("surveys/saveSurvey", async (survey: any, thunkApi: any) => {
  try {
    if (!survey._id) {
      const { data } = await axios.post("/api/surveys", survey);
      return data;
    } else {
      const { data } = await axios.put(`/api/surveys/${survey._id}`, survey);
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

export const detailsSurvey = createAsyncThunk("surveys/detailsSurvey", async (id: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/surveys/${id}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteSurvey = createAsyncThunk("surveys/deleteSurvey", async (pathname, thunkApi: any) => {
  try {
    const { data } = await axios.delete("/api/surveys/" + pathname);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});
