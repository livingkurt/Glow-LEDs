/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const getPaychecks = async ({ search, sorting, filters, page, pageSize }) => {
  try {
    return await axios.get(`/api/paychecks/table`, {
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

export const getMyPaychecks = async ({ search, sorting, filters, page, pageSize }, affiliateId) => {
  try {
    return await axios.get(`/api/paychecks/table/${affiliateId}/affiliate`, {
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

export const listPaychecks = createAsyncThunk(
  "paychecks/listPaychecks",
  async (query, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/paychecks?${create_query(query)}`);

      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const savePaycheck = createAsyncThunk(
  "paychecks/savePaycheck",
  async (paycheck, { dispatch, rejectWithValue }) => {
    try {
      if (!paycheck._id) {
        const { data } = await axios.post("/api/paychecks", paycheck);
        dispatch(showSuccess({ message: `Paycheck Created` }));
        return data;
      } else {
        const { data } = await axios.put(`/api/paychecks/${paycheck._id}`, paycheck);
        dispatch(showSuccess({ message: `Paycheck Updated` }));
        return data;
      }
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const detailsPaycheck = createAsyncThunk(
  "paychecks/detailsPaycheck",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/paychecks/${id}`);
      dispatch(showSuccess({ message: `Paycheck Found` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deletePaycheck = createAsyncThunk(
  "paychecks/deletePaycheck",
  async (pathname, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.delete("/api/paychecks/" + pathname);
      dispatch(showSuccess({ message: `Paycheck Deleted` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteMultiplePaychecks = createAsyncThunk(
  "paycheck/deleteMultiplePaychecks",
  async (ids, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/paychecks/delete_multiple`, { ids });
      dispatch(showSuccess({ message: `Paychecks Deleted` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);
