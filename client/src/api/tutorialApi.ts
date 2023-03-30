/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { create_query } from "../utils/helper_functions";
import { headers } from "../utils/helpers/user_helpers";

export const listTutorials = createAsyncThunk("tutorials/listTutorials", async (query: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/tutorials?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const saveTutorial = createAsyncThunk("tutorials/saveTutorial", async (tutorial: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();

    if (!tutorial._id) {
      const { data } = await axios.post("/api/tutorials", tutorial, headers(current_user));
      return data;
    } else {
      const { data } = await axios.put(`/api/tutorials/${tutorial._id}`, tutorial, headers(current_user));
      return data;
    }
  } catch (error) {}
});

export const detailsTutorial = createAsyncThunk("tutorials/detailsTutorial", async ({ pathname, id }: any, thunkApi: any) => {
  try {
    let response: any = {};
    if (id) {
      response = await axios.get(`/api/tutorials/${id}`);
    } else if (pathname) {
      response = await axios.get(`/api/tutorials/${pathname}/pathname`);
    }
    return response.data;
  } catch (error) {}
});

export const deleteTutorial = createAsyncThunk("tutorials/deleteTutorial", async (id: string, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.delete(`/api/tutorials/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});
