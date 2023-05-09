/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { create_query } from "../utils/helper_functions";

export const getPromos = async ({
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
    return axios.get(`/api/promos/table`, {
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

export const getPromoFilters = async () => {
  const { data } = await axios.get(`/api/promos/filters`);
  return data;
};

export const listPromos = createAsyncThunk("promos/listPromos", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/promos?${create_query(query)}`);
    return data;
  } catch (error) {}
});

export const listSponsorCodes = createAsyncThunk("promos/listSponsorCodes", async (affiliateId: string, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/promos/${affiliateId}/sponsor_codes`);
    return data;
  } catch (error) {}
});

export const savePromo = createAsyncThunk("promos/savePromo", async (promo: any, thunkApi: any) => {
  try {
    if (!promo._id) {
      const { data } = await axios.post("/api/promos", promo);
      return data;
    } else {
      const { data } = await axios.put(`/api/promos/${promo._id}`, promo);
      return data;
    }
  } catch (error) {}
});

export const detailsPromo = createAsyncThunk("promos/detailsPromo", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/promos/${id}`);
    return data;
  } catch (error) {}
});

export const deletePromo = createAsyncThunk("promos/deletePromo", async (pathname, thunkApi: any) => {
  try {
    const { data } = await axios.delete("/api/promos/" + pathname);
    return data;
  } catch (error) {}
});

export const deleteMultiplePromos = createAsyncThunk("promo/deleteMultiplePromos", async (ids: string, thunkApi: any) => {
  try {
    const { data } = await axios.put(`/api/promos/delete_multiple`, { ids });
    return data;
  } catch (error) {}
});

export const refreshSponsorCodes = createAsyncThunk("promo/refreshSponsorCodes", async (_data, thunkApi: any) => {
  try {
    const { data } = await axios.post(`/api/promos/refresh_sponsor_codes`, {});
    return data;
  } catch (error) {}
});
