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

export const listPromos = createAsyncThunk("promos/listPromos", async (query, thunkApi) => {
  try {
    const { data } = await axios.get(`/api/promos?${create_query(query)}`);

    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const listSponsorCodes = createAsyncThunk("promos/listSponsorCodes", async (affiliateId, thunkApi) => {
  try {
    const { data } = await axios.get(`/api/promos/${affiliateId}/sponsor_codes`);
    thunkApi.dispatch(showSuccess({ message: `Sponsor Promos Found` }));
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
  }
});

export const savePromo = createAsyncThunk("promos/savePromo", async (promo, thunkApi) => {
  try {
    if (!promo._id) {
      const { data } = await axios.post("/api/promos", promo);
      thunkApi.dispatch(showSuccess({ message: `Promo Created` }));
      return data;
    } else {
      const { data } = await axios.put(`/api/promos/${promo._id}`, promo);
      thunkApi.dispatch(showSuccess({ message: `Promo Updated` }));
      return data;
    }
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsPromo = createAsyncThunk("promos/detailsPromo", async (id, thunkApi) => {
  try {
    const { data } = await axios.get(`/api/promos/${id}`);
    thunkApi.dispatch(showSuccess({ message: `Promo Found` }));
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deletePromo = createAsyncThunk("promos/deletePromo", async (pathname, thunkApi) => {
  try {
    const { data } = await axios.delete("/api/promos/" + pathname);
    thunkApi.dispatch(showSuccess({ message: `Promo Deleted` }));
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteMultiplePromos = createAsyncThunk("promo/deleteMultiplePromos", async (ids, thunkApi) => {
  try {
    const { data } = await axios.put(`/api/promos/delete_multiple`, { ids });
    thunkApi.dispatch(showSuccess({ message: `Promos Deleted` }));
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
  }
});

export const refreshSponsorCodes = createAsyncThunk("promo/refreshSponsorCodes", async (_data, thunkApi) => {
  try {
    const { data } = await axios.post(`/api/promos/refresh_sponsor_codes`, {});
    thunkApi.dispatch(showSuccess({ message: `Sponsor Codes Refreshed` }));
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const validatePromoCode = createAsyncThunk(
  "promo/validatePromoCode",
  async ({ promo_code, current_user, cartItems }, thunkApi) => {
    try {
      const { data } = await axios.put(`/api/promos/validate/${promo_code}`, { cartItems, current_user });
      console.log({ data });
      thunkApi.dispatch(showSuccess({ message: `Promo Code Validated` }));
      return data;
    } catch (error) {
      thunkApi.dispatch(showError({ message: errorMessage(error) }));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
