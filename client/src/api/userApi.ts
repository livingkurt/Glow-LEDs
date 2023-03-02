/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { create_query } from "../utils/helper_functions";

export const listUsers = createAsyncThunk("users/listUsers", async (query: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get("/api/users?" + create_query(query), {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const updateUser = createAsyncThunk("users/updateUser", async (user: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.put("/api/users/" + user.pathname, user, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const createUser = createAsyncThunk("users/createUser", async (user: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.post("/api/users", user, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const detailsUser = createAsyncThunk("users/detailsUser", async ({ id }: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/users/${id}`, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (pathname, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/users/" + pathname, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const registerUser = createAsyncThunk("users/registerUser", async (userData: any, thunkApi: any) => {
  try {
    const { data } = await axios.post("/api/users/register", userData);
    axios.post("/api/emails/account_created", data);
    return data;
  } catch (error) {}
});

export const loginUser = createAsyncThunk("users/loginUser", async (userData: any, thunkApi: any) => {
  try {
    const { data } = await axios.post("/api/users/login", userData);
    return data;
  } catch (error) {}
});
