/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { create_query } from "../utils/helper_functions";
import { headers } from "../utils/helpers/user_helpers";

export const getWholesalers = async ({
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
    return axios.get(`/api/wholesalers`, {
      params: {
        limit: pageSize,
        page: page,
        search: search,
        sort: sorting,
        filters
      }
    });
  } catch (error) {}
};

export const listWholesalers = createAsyncThunk("wholesalers/listWholesalers", async (query: any, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/wholesalers?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const saveWholesaler = createAsyncThunk("wholesalers/saveWholesaler", async (wholesaler: any, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();

    if (!wholesaler._id) {
      const { data } = await axios.post("/api/wholesalers", wholesaler, headers(current_user));
      return data;
    } else {
      const { data } = await axios.put(`/api/wholesalers/${wholesaler._id}`, wholesaler, headers(current_user));
      return data;
    }
  } catch (error) {}
});

export const detailsWholesaler = createAsyncThunk("wholesalers/detailsWholesaler", async ({ pathname, id }: any, thunkApi: any) => {
  try {
    const response = await axios.get(`/api/wholesalers/${id}`);
    return response.data;
  } catch (error) {}
});

export const deleteWholesaler = createAsyncThunk("wholesalers/deleteWholesaler", async (id, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.delete(`/api/wholesalers/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});
