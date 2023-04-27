/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { create_query } from "../utils/helper_functions";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { set_current_user } from "../slices/userSlice";
import { headers } from "../utils/helpers/user_helpers";

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
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/affiliates?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const saveAffiliate = createAsyncThunk("affiliates/saveAffiliate", async (affiliate: any, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    if (!affiliate._id) {
      const { data } = await axios.post("/api/affiliates", affiliate, headers(current_user));
      return data;
    } else {
      const { data } = await axios.put(`/api/affiliates/${affiliate.pathname}`, affiliate, headers(current_user));
      return data;
    }
  } catch (error) {}
});

export const detailsAffiliate = createAsyncThunk("affiliates/detailsAffiliate", async ({ promo_code, id }: any, thunkApi: any) => {
  try {
    let response: any = {};
    if (id) {
      response = await axios.get(`/api/affiliates/${id}`);
    } else if (promo_code) {
      response = await axios.get(`/api/affiliates/${promo_code}/promo_code`);
    }
    console.log({ response });
    return response.data;
  } catch (error) {}
});
export const deleteAffiliate = createAsyncThunk("affiliates/deleteAffiliate", async (pathname, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.delete(`/api/affiliates/${pathname}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const create_rave_mob_affiliates = createAsyncThunk("affiliates/create_rave_mob_affiliates", async (csv, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.put("/api/affiliates/create_rave_mob_affiliates", { csv }, headers(current_user));
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
        `/api/orders/code_usage/${promo_code}?start_date=${start_date}&end_date=${end_date}&sponsor=${sponsor}`,
        headers(current_user)
      );
      return { data, type };
    } catch (error) {}
  }
);
