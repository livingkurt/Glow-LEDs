/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
import { create_query } from "../utils/helper_functions";

export const listSurveys = createAsyncThunk("surveys/listSurveys", async (query: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/surveys?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const updateSurvey = createAsyncThunk("surveys/updateSurvey", async (survey: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.put("/api/surveys/" + survey.pathname, survey, headers(current_user));
    return data;
  } catch (error) {}
});

export const createSurvey = createAsyncThunk("surveys/createSurvey", async (survey: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.post("/api/surveys", survey, headers(current_user));
    return data;
  } catch (error) {}
});

export const detailsSurvey = createAsyncThunk("surveys/detailsSurvey", async ({ id }: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/surveys/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const deleteSurvey = createAsyncThunk("surveys/deleteSurvey", async (pathname, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/surveys/" + pathname, headers(current_user));
    return data;
  } catch (error) {}
});
