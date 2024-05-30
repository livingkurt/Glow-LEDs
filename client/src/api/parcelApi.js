/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const getParcels = async ({ search, sorting, filters, page, pageSize }) => {
  try {
    return await axios.get(`/api/parcels/table`, {
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

export const listParcels = createAsyncThunk("parcels/listParcels", async (query, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/parcels?${create_query(query)}`);
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const saveParcel = createAsyncThunk("parcels/saveParcel", async (parcel, { dispatch, rejectWithValue }) => {
  try {
    if (!parcel._id) {
      const { data } = await axios.post("/api/parcels", parcel);
      dispatch(showSuccess({ message: `Parcel Created` }));
      return data;
    } else {
      const { data } = await axios.put(`/api/parcels/${parcel._id}`, parcel);
      dispatch(showSuccess({ message: `Parcel Updated` }));
      return data;
    }
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const detailsParcel = createAsyncThunk("parcels/detailsParcel", async (id, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/parcels/${id}`);
    dispatch(showSuccess({ message: `Parcel Found` }));
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const deleteParcel = createAsyncThunk(
  "parcels/deleteParcel",
  async (pathname, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.delete("/api/parcels/" + pathname);
      dispatch(showSuccess({ message: `Parcel Deleted` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);
