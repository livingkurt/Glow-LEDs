/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
import { create_query } from "../utils/helper_functions";

export const getUsers = async ({
  search,
  sorting,
  filters,
  page,
  pageSize
}: {
  search: string;
  sorting: any;
  filters: any;
  page: number;
  pageSize: number;
}) => {
  try {
    return axios.get(`/api/users`, {
      params: {
        limit: pageSize,
        page: page,
        search: search,
        sort: sorting,
        filters
      }
    });
  } catch (error) {}
};

export const getUserFilters = async () => {
  const { data } = await axios.get(`/api/users/filters`);
  console.log({ data });
  return data;
};

export const listUsers = createAsyncThunk("users/listUsers", async (query: any, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/users?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const saveUser = createAsyncThunk("users/saveUser", async (user: any, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();

    if (!user._id) {
      const { data } = await axios.post("/api/users", user, headers(current_user));
      return data;
    } else {
      const { data } = await axios.put(`/api/users/${user._id}`, user, headers(current_user));
      return data;
    }
  } catch (error) {}
});

export const detailsUser = createAsyncThunk("users/detailsUser", async (id: any, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/users/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id: string, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.delete(`/api/users/${id}`, headers(current_user));
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

export const loginAsUser = createAsyncThunk("users/loginAsUser", async (userData: any, thunkApi: any) => {
  try {
    const { data } = await axios.post("/api/users/login_as_user", userData);
    return data;
  } catch (error) {}
});

export const passwordReset = createAsyncThunk(
  "users/passwordReset",
  async ({ user_id, password, rePassword }: { user_id: string; password: string; rePassword: string }, thunkApi: any) => {
    try {
      const { data } = await axios.put("/api/users/password_reset", {
        user_id,
        password,
        rePassword
      });

      if (data && data.hasOwnProperty("first_name")) {
        axios.post("/api/emails/password_reset", data);
        return data;
      }
    } catch (error) {}
  }
);

export const resetPassword = createAsyncThunk("users/resetPassword", async (email: string, thunkApi: any) => {
  try {
    const { data } = await axios.post("/api/users/reset_password", { email });

    axios.post("/api/emails/reset_password", data);
    return data;
  } catch (error) {}
});
