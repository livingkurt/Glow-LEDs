/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const getGiftCards = async ({ search, sorting, filters, page, pageSize }) => {
  try {
    return await axios.get(`/api/gift_cards/table`, {
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

export const listGiftCards = createAsyncThunk(
  "giftCards/listGiftCards",
  async (query, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/gift_cards?${create_query(query)}`);
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const saveGiftCard = createAsyncThunk(
  "giftCards/saveGiftCard",
  async (gift_card, { dispatch, rejectWithValue }) => {
    try {
      if (!gift_card._id) {
        const { data } = await axios.post("/api/gift_cards", gift_card);
        dispatch(showSuccess({ message: `GiftCard Created` }));
        return data;
      } else {
        const { data } = await axios.put(`/api/gift_cards/${gift_card._id}`, gift_card);
        dispatch(showSuccess({ message: `GiftCard Updated` }));
        return data;
      }
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const detailsGiftCard = createAsyncThunk(
  "giftCards/detailsGiftCard",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/gift_cards/${id}`);
      dispatch(showSuccess({ message: `GiftCard Found` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteGiftCard = createAsyncThunk(
  "giftCards/deleteGiftCard",
  async (pathname, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.delete("/api/gift_cards/" + pathname);
      dispatch(showSuccess({ message: `GiftCard Deleted` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const generateGiftCard = createAsyncThunk(
  "giftCard/generate",
  async ({ initialBalance }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/gift_cards/generate", { amount: initialBalance });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
