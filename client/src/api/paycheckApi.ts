/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Covy from "../shared/GlowLEDsComponents/GLCovy/GLCovy";
import axios from "axios";

import { create_query } from "../utils/helper_functions";

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
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
};

export const getPaycheckFilters = async () => {
  const { data } = await axios.get(`/api/paychecks/filters`);
  return data;
};

export const listPaychecks = createAsyncThunk("paychecks/listPaychecks", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/paychecks?${create_query(query)}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const savePaycheck = createAsyncThunk("paychecks/savePaycheck", async (paycheck: any, thunkApi: any) => {
  try {
    if (!paycheck._id) {
      const { data } = await axios.post("/api/paychecks", paycheck);
      return data;
    } else {
      const { data } = await axios.put(`/api/paychecks/${paycheck._id}`, paycheck);
      return data;
    }
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const detailsPaycheck = createAsyncThunk("paychecks/detailsPaycheck", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/paychecks/${id}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const deletePaycheck = createAsyncThunk("paychecks/deletePaycheck", async (pathname, thunkApi: any) => {
  try {
    const { data } = await axios.delete("/api/paychecks/" + pathname);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const deleteMultiplePaychecks = createAsyncThunk("paycheck/deleteMultiplePaychecks", async (ids: string, thunkApi: any) => {
  try {
    const { data } = await axios.put(`/api/paycheck/delete_multiple`, { ids });
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});
