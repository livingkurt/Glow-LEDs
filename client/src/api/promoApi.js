/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const getPromos = async ({ search, sorting, filters, page, pageSize }) => {
  try {
    return await axios.get(`/api/promos/table`, {
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

export const getPromoFilters = async () => {
  const { data } = await axios.get(`/api/promos/filters`);
  return data;
};

export const listPromos = createAsyncThunk("promos/listPromos", async (query, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/promos?${create_query(query)}`);

    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const listSponsorCodes = createAsyncThunk(
  "promos/listSponsorCodes",
  async (affiliateId, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/promos/${affiliateId}/sponsor_codes`);
      dispatch(showSuccess({ message: `Sponsor Promos Found` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const savePromo = createAsyncThunk("promos/savePromo", async (promo, { dispatch, rejectWithValue }) => {
  try {
    if (!promo._id) {
      const { data } = await axios.post("/api/promos", promo);
      dispatch(showSuccess({ message: `Promo Created` }));
      return data;
    } else {
      const { data } = await axios.put(`/api/promos/${promo._id}`, promo);
      dispatch(showSuccess({ message: `Promo Updated` }));
      return data;
    }
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const detailsPromo = createAsyncThunk("promos/detailsPromo", async (id, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/promos/${id}`);
    dispatch(showSuccess({ message: `Promo Found` }));
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const deletePromo = createAsyncThunk("promos/deletePromo", async (pathname, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.delete("/api/promos/" + pathname);
    dispatch(showSuccess({ message: `Promo Deleted` }));
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const deleteMultiplePromos = createAsyncThunk(
  "promo/deleteMultiplePromos",
  async (ids, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/promos/delete_multiple`, { ids });
      dispatch(showSuccess({ message: `Promos Deleted` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const refreshSponsorCodes = createAsyncThunk(
  "promo/refreshSponsorCodes",
  async (_data, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/promos/refresh_sponsor_codes`, {});
      dispatch(showSuccess({ message: `Sponsor Codes Refreshed` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const validatePromoCode = createAsyncThunk(
  "promo/validatePromoCode",
  async ({ promo_code, current_user, cartItems, shipping }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/promos/${promo_code}/validate`, { cartItems, current_user, shipping });
      console.log({ data });
      if (!data?.errors) {
        dispatch(showSuccess({ message: `Promo Code Validated` }));
      }
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);
