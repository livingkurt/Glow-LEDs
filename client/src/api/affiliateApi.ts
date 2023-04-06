/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { create_query } from "../utils/helper_functions";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { DetailsAffiliate } from "../actions/affiliateActions";
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
      userSlice: {
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
      userSlice: {
        userPage: { current_user }
      }
    } = thunkApi.getState();

    if (!affiliate._id) {
      const { data } = await axios.post("/api/affiliates", affiliate, headers(current_user));
      const { data: user } = await axios.put(
        "/api/users/update/" + current_user._id,
        {
          first_name: current_user.first_name,
          last_name: current_user.last_name,
          email: current_user.email,
          password: current_user.password,
          is_affiliated: true,
          email_subscription: current_user.email_subscription,
          affiliate: data._id,
          shipping: current_user.shipping,
          isVerified: current_user.isVerified,
          isAdmin: current_user.isAdmin,
          access_token: current_user.access_token,
          refresh_token: current_user.refresh_token
        },
        headers(current_user)
      );
      const { access_token, refresh_token } = user;
      setAuthToken(access_token);
      const decoded = jwt_decode(access_token);

      // Set current user
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      thunkApi.dispatch(set_current_user(decoded));

      return data;
    } else {
      const { data } = await axios.put(`/api/affiliates/${affiliate.pathname}`, affiliate, headers(current_user));
      return data;
    }
  } catch (error) {}
});

export const detailsAffiliate = createAsyncThunk(
  "affiliates/detailsAffiliate",
  async ({ pathname, id }: DetailsAffiliate, thunkApi: any) => {
    try {
      const {
        userSlice: { current_user }
      } = thunkApi.getState();
      let response: any = {};
      if (id) {
        response = await axios.get(`/api/affiliates/${id}`);
      } else if (pathname) {
        response = await axios.get(`/api/affiliates/${pathname}/pathname`);
      }
      return response.data;
    } catch (error) {}
  }
);

export const deleteAffiliate = createAsyncThunk("affiliates/deleteAffiliate", async (pathname, thunkApi: any) => {
  try {
    const {
      userSlice: {
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
      userSlice: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.put("/api/affiliates/create_rave_mob_affiliates", { csv }, headers(current_user));
    return data;
  } catch (error) {}
});
