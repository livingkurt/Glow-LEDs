/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const getEvents = async ({ search, sorting, filters, page, pageSize }) => {
  try {
    return await axios.get(`/api/events/table`, {
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
export const reorderEvents = async ({ reorderedItems }) => {
  try {
    return axios.put(`/api/events/reorder`, { reorderedItems });
  } catch (error) {
    store.dispatch(showError({ message: errorMessage(error) }));
  }
};

export const listEvents = createAsyncThunk("events/listEvents", async (query, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/events?${create_query(query)}`);

    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const saveEvent = createAsyncThunk("events/saveEvent", async (event, { dispatch, rejectWithValue }) => {
  try {
    if (!event._id) {
      const { data } = await axios.post("/api/events", event);
      dispatch(showSuccess({ message: `Event Created` }));
      return data;
    } else {
      const { data } = await axios.put(`/api/events/${event._id}`, event);
      dispatch(showSuccess({ message: `Events Updated` }));
      return data;
    }
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const getEventTickets = createAsyncThunk(
  "events/getEventTickets",
  async (pathname, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/tickets/event/${pathname}`);
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const detailsEvent = createAsyncThunk(
  "events/detailsEvent",
  async ({ pathname, id }, { dispatch, rejectWithValue }) => {
    try {
      let response = {};
      if (id) {
        response = await axios.get(`/api/events/${id}`);
      } else if (pathname) {
        response = await axios.get(`/api/events/${pathname}/pathname`);
      }
      dispatch(showSuccess({ message: `Event Found` }));
      return response.data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteEvent = createAsyncThunk("events/deleteEvent", async (id, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`/api/events/${id}`);
    dispatch(showSuccess({ message: `Event Deleted` }));
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});
