/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
import { create_query } from "../utils/helper_functions";

export const listEmails = createAsyncThunk("emails/listEmails", async (query: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/emails?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const updateEmail = createAsyncThunk("emails/updateEmail", async (email: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.put("/api/emails/" + email.pathname, email, headers(current_user));
    return data;
  } catch (error) {}
});

export const createEmail = createAsyncThunk("emails/createEmail", async (email: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.post("/api/emails", email, headers(current_user));
    return data;
  } catch (error) {}
});

export const detailsEmail = createAsyncThunk("emails/detailsEmail", async ({ id }: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/emails/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const deleteEmail = createAsyncThunk("emails/deleteEmail", async (pathname, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/emails/" + pathname, headers(current_user));
    return data;
  } catch (error) {}
});
