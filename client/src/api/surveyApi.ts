/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const listSurveys = createAsyncThunk("surveys/listSurveys", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/surveys?${create_query(query)}`);
    thunkApi.dispatch(showSuccess({ message: `Surveys Found` }));
    return data;
  } catch (error: any) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveSurvey = createAsyncThunk("surveys/saveSurvey", async (survey: any, thunkApi: any) => {
  try {
    if (!survey._id) {
      const { data } = await axios.post("/api/surveys", survey);
      thunkApi.dispatch(showSuccess({ message: `Survey Created` }));
      return data;
    } else {
      const { data } = await axios.put(`/api/surveys/${survey._id}`, survey);
      thunkApi.dispatch(showSuccess({ message: `Survey Updated` }));
      return data;
    }
  } catch (error: any) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsSurvey = createAsyncThunk("surveys/detailsSurvey", async (id: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/surveys/${id}`);
    thunkApi.dispatch(showSuccess({ message: `Survey Found` }));
    return data;
  } catch (error: any) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteSurvey = createAsyncThunk("surveys/deleteSurvey", async (pathname, thunkApi: any) => {
  try {
    const { data } = await axios.delete("/api/surveys/" + pathname);
    thunkApi.dispatch(showSuccess({ message: `Survey Deleted` }));
    return data;
  } catch (error: any) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});
