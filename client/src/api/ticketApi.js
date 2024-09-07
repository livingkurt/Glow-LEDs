/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const getTickets = async ({ search, sorting, filters, page, pageSize }) => {
  try {
    return await axios.get(`/api/tickets/table`, {
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
export const reorderTickets = async ({ reorderedItems }) => {
  try {
    return axios.put(`/api/tickets/reorder`, { reorderedItems });
  } catch (error) {
    store.dispatch(showError({ message: errorMessage(error) }));
  }
};

export const listTickets = createAsyncThunk("tickets/listTickets", async (query, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/tickets?${create_query(query)}`);

    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const saveTicket = createAsyncThunk("tickets/saveTicket", async (ticket, { dispatch, rejectWithValue }) => {
  try {
    if (!ticket._id) {
      const { data } = await axios.post("/api/tickets", ticket);
      dispatch(showSuccess({ message: `Ticket Created` }));
      return data;
    } else {
      const { data } = await axios.put(`/api/tickets/${ticket._id}`, ticket);
      dispatch(showSuccess({ message: `Tickets Updated` }));
      return data;
    }
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const detailsTicket = createAsyncThunk(
  "tickets/detailsTicket",
  async ({ pathname, id }, { dispatch, rejectWithValue }) => {
    try {
      let response = {};
      if (id) {
        response = await axios.get(`/api/tickets/${id}`);
      } else if (pathname) {
        response = await axios.get(`/api/tickets/${pathname}/pathname`);
      }
      dispatch(showSuccess({ message: `Ticket Found` }));
      return response.data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteTicket = createAsyncThunk("tickets/deleteTicket", async (id, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`/api/tickets/${id}`);
    dispatch(showSuccess({ message: `Ticket Deleted` }));
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});
