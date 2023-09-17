/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const getPaychecks = async ({ search, sorting, filters, page, pageSize }) => {
  try {
    return await axios.get(`/api/paychecks`, {
      params: {
        limit: pageSize,
        page: page,
        search: search,
        sort: sorting,
        filters: JSON.stringify(filters),
      },
    });
  } catch (error) {
    store.dispatch(showError({ message: errorMessage(error) }));
  }
};

export const getPaycheckFilters = async () => {
  const { data } = await axios.get(`/api/paychecks/filters`);
  return data;
};

export const listPaychecks = createAsyncThunk("paychecks/listPaychecks", async (query, thunkApi) => {
  try {
    const { data } = await axios.get(`/api/paychecks?${create_query(query)}`);

    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const savePaycheck = createAsyncThunk("paychecks/savePaycheck", async (paycheck, thunkApi) => {
  try {
    if (!paycheck._id) {
      const { data } = await axios.post("/api/paychecks", paycheck);
      thunkApi.dispatch(showSuccess({ message: `Paycheck Created` }));
      return data;
    } else {
      const { data } = await axios.put(`/api/paychecks/${paycheck._id}`, paycheck);
      thunkApi.dispatch(showSuccess({ message: `Paycheck Updated` }));
      return data;
    }
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsPaycheck = createAsyncThunk("paychecks/detailsPaycheck", async (id, thunkApi) => {
  try {
    const { data } = await axios.get(`/api/paychecks/${id}`);
    thunkApi.dispatch(showSuccess({ message: `Paycheck Found` }));
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deletePaycheck = createAsyncThunk("paychecks/deletePaycheck", async (pathname, thunkApi) => {
  try {
    const { data } = await axios.delete("/api/paychecks/" + pathname);
    thunkApi.dispatch(showSuccess({ message: `Paycheck Deleted` }));
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteMultiplePaychecks = createAsyncThunk("paycheck/deleteMultiplePaychecks", async (ids, thunkApi) => {
  try {
    const { data } = await axios.put(`/api/paycheck/delete_multiple`, { ids });
    thunkApi.dispatch(showSuccess({ message: `Paychecks Deleted` }));
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
  }
});
