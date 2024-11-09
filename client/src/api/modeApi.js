import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const getModes = async ({ search, sorting, filters, page, pageSize }) => {
  try {
    return await axios.get(`/api/modes/table`, {
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

export const listModes = createAsyncThunk("modes/listModes", async (query, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/modes?${create_query(query)}`);
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const saveMode = createAsyncThunk("modes/saveMode", async (mode, { dispatch, rejectWithValue }) => {
  try {
    if (!mode._id) {
      const { data } = await axios.post("/api/modes", mode);
      dispatch(showSuccess({ message: `Mode Created` }));
      return data;
    } else {
      const { data } = await axios.put(`/api/modes/${mode._id}`, mode);
      dispatch(showSuccess({ message: `Mode Updated` }));
      return data;
    }
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const detailsMode = createAsyncThunk("modes/detailsMode", async (id, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/modes/${id}`);
    dispatch(showSuccess({ message: `Mode Found` }));
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const deleteMode = createAsyncThunk("modes/deleteMode", async (id, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.delete("/api/modes/" + id);
    dispatch(showSuccess({ message: `Mode Deleted` }));
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});
