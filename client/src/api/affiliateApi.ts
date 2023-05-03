/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { create_query } from "../utils/helper_functions";

import * as API from "../api";

export const getAffiliates = async ({
  search,
  sorting,
  filters,
  page,
  pageSize
}: {
  search: string;
  sorting: any;
  filters: any;
  page: number;
  pageSize: number;
}) => {
  try {
    return axios.get(`/api/affiliates`, {
      params: {
        limit: pageSize,
        page: page,
        search: search
        // sort: sorting,
        // filters: pickBy(filters, (val: any) => val.length > 0)
      }
    });
  } catch (error) {}
};

export const listAffiliates = createAsyncThunk("affiliates/listAffiliates", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/affiliates?${create_query(query)}`);
    return data;
  } catch (error) {}
});

export const saveAffiliate = createAsyncThunk("affiliates/saveAffiliate", async ({ affiliate, profile }: any, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();

    const newAffiliate = !affiliate._id;

    if (newAffiliate) {
      const { data } = await axios.post("/api/affiliates", affiliate);
      if (profile) {
        await thunkApi.dispatch(API.saveUser({ user: { _id: current_user._id, affiliate: data._id }, profile }));
      }
      return data;
    } else {
      const { data } = await axios.put(`/api/affiliates/${affiliate._id}`, affiliate);
      return data;
    }
  } catch (error) {}
});

export const detailsAffiliate = createAsyncThunk("affiliates/detailsAffiliate", async ({ pathname, id }: any, thunkApi: any) => {
  try {
    let response: any = {};
    if (id) {
      response = await axios.get(`/api/affiliates/${id}`);
    } else if (pathname) {
      response = await axios.get(`/api/affiliates/${pathname}/pathname`);
    }
    return response.data;
  } catch (error) {}
});

export const deleteAffiliate = createAsyncThunk("affiliates/deleteAffiliate", async (pathname, thunkApi: any) => {
  try {
    const { data } = await axios.delete(`/api/affiliates/${pathname}`);
    return data;
  } catch (error) {}
});

export const create_rave_mob_affiliates = createAsyncThunk("affiliates/create_rave_mob_affiliates", async (csv, thunkApi: any) => {
  try {
    const { data } = await axios.put("/api/affiliates/create_rave_mob_affiliates", { csv });
    return data;
  } catch (error) {}
});

export const affiliateEarnings = createAsyncThunk(
  "affiliates/affiliateEarnings",
  async (
    {
      promo_code,
      start_date,
      end_date,
      sponsor,
      type
    }: { promo_code: string; start_date: string; end_date: string; sponsor: boolean; type: string },
    thunkApi: any
  ) => {
    try {
      const {
        users: {
          userPage: { current_user }
        }
      } = thunkApi.getState();
      const { data } = await axios.get(
        `/api/orders/code_usage/${promo_code}?start_date=${start_date}&end_date=${end_date}&sponsor=${sponsor}`
      );
      return { data, type };
    } catch (error) {}
  }
);
