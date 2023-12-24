/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

import * as API from "../api";

import { handleTokenRefresh } from "./axiosInstance";

export const getAffiliates = async ({ search, sorting, filters, page, pageSize }) => {
  try {
    return await axios.get(`/api/affiliates`, {
      params: {
        limit: pageSize,
        page: page,
        search: search,
        // sort: sorting,
        // filters: pickBy(filters, (val) => val.length > 0)
      },
    });
  } catch (error) {
    store.dispatch(showError({ message: errorMessage(error) }));
  }
};

export const listAffiliates = createAsyncThunk(
  "affiliates/listAffiliates",
  async (query, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/affiliates?${create_query(query)}`);
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const saveAffiliate = createAsyncThunk(
  "affiliates/saveAffiliate",
  async ({ affiliate, profile }, { dispatch, rejectWithValue, getState }) => {
    try {
      const {
        users: {
          userPage: { current_user },
        },
      } = getState();

      const newAffiliate = !affiliate._id;

      if (newAffiliate) {
        const { data } = await axios.post("/api/affiliates", affiliate);
        dispatch(showSuccess({ message: `Affiliate Created` }));
        if (profile) {
          await dispatch(API.saveUser({ user: { _id: current_user._id, affiliate: data.newAffiliate._id }, profile }));
        }
        return data;
      } else {
        const { data } = await axios.put(`/api/affiliates/${affiliate._id}`, affiliate);
        dispatch(showSuccess({ message: `Affiliate Updated` }));
        return data;
      }
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const detailsAffiliate = createAsyncThunk(
  "affiliates/detailsAffiliate",
  async ({ pathname, id }, { dispatch, rejectWithValue }) => {
    try {
      if (id) {
        const { data } = await axios.get(`/api/affiliates/${id}`);
        return data;
      } else if (pathname) {
        const { data } = await axios.get(`/api/affiliates/${pathname}/pathname`);
        return data;
      }
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteAffiliate = createAsyncThunk(
  "affiliates/deleteAffiliate",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/affiliates/${id}`);
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const generateSponsorCodes = createAsyncThunk(
  "affiliates/generateSponsorCodes",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/affiliates/${id}/generate_sponsor_codes`);

      dispatch(showSuccess({ message: `Codes Generated` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createRaveMobAffiliates = createAsyncThunk(
  "affiliates/createRaveMobAffiliates",
  async (csv, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.put("/api/affiliates/create_rave_mob_affiliates", { csv });
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const sponsorMonthlyCheckin = createAsyncThunk(
  "affiliate/sponsorMonthlyCheckin",
  async ({ affiliateId, questionsConcerns, numberOfContent, month, year }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/affiliates/${affiliateId}/monthly_checkin`, {
        questionsConcerns,
        numberOfContent,
        month,
        year,
      });
      dispatch(showSuccess({ message: `Checkin Success` }));
      await handleTokenRefresh(true);
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const affiliateApi = createApi({
  reducerPath: "affiliateApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: builder => ({
    affiliateEarnings: builder.query({
      query: ({ promo_code, start_date, end_date, sponsor, type, sponsorTeamCaptain }) =>
        `/orders/code_usage/${promo_code}?start_date=${start_date}&end_date=${end_date}&sponsor=${sponsor}&sponsorTeamCaptain=${sponsorTeamCaptain}`,
    }),
    monthlyAffiliateEarnings: builder.query({
      query: ({ promo_code, start_date, end_date, sponsor, type, sponsorTeamCaptain }) =>
        `/orders/monthly_code_usage/${promo_code}?start_date=${start_date}&end_date=${end_date}&sponsor=${sponsor}&sponsorTeamCaptain=${sponsorTeamCaptain}`,
    }),
    sponsorCodes: builder.query({
      query: ({ affiliateId }) => `/promos/${affiliateId}/sponsor_codes`,
    }),
  }),
});

export const { useAffiliateEarningsQuery, useSponsorCodesQuery, useMonthlyAffiliateEarningsQuery } = affiliateApi;
