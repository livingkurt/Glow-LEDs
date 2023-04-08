/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
import { create_query } from "../utils/helper_functions";
import { pickBy } from "lodash";

export const getPaychecks = async ({
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
    return axios.get(`/api/paychecks`, {
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

export const listPaychecks = createAsyncThunk("paychecks/listPaychecks", async (query: any, thunkApi: any) => {
  try {
    const {
      userSlice: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/paychecks?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const savePaycheck = createAsyncThunk("paychecks/savePaycheck", async (paycheck: any, thunkApi: any) => {
  try {
    const {
      userSlice: {
        userPage: { current_user }
      }
    } = thunkApi.getState();

    if (!paycheck._id) {
      const { data } = await axios.post("/api/paychecks", paycheck, headers(current_user));
      return data;
    } else {
      const { data } = await axios.put(`/api/paychecks/${paycheck._id}`, paycheck, headers(current_user));
      return data;
    }
  } catch (error) {}
});

export const detailsPaycheck = createAsyncThunk("paychecks/detailsPaycheck", async (id: string, thunkApi: any) => {
  try {
    const {
      userSlice: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/paychecks/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const deletePaycheck = createAsyncThunk("paychecks/deletePaycheck", async (pathname, thunkApi: any) => {
  try {
    const {
      userSlice: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/paychecks/" + pathname, headers(current_user));
    return data;
  } catch (error) {}
});
