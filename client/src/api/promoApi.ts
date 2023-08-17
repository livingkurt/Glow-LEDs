/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Covy from "../shared/GlowLEDsComponents/GLCovy/GLCovy";
import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";

export const getPromos = async ({
  search,
  sorting,
  filters,
  page,
  pageSize,
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
        filters,
      },
    });
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
  }
};

export const getPromoFilters = async () => {
  const { data } = await axios.get(`/api/promos/filters`);
  return data;
};

export const listPromos = createAsyncThunk("promos/listPromos", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/promos?${create_query(query)}`);

    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const listSponsorCodes = createAsyncThunk(
  "promos/listSponsorCodes",
  async (affiliateId: string, thunkApi: any) => {
    try {
      const { data } = await axios.get(`/api/promos/${affiliateId}/sponsor_codes`);
      Covy().showSnackbar({
        message: `Sponsor Promos Found`,
        severity: "success",
      });
      return data;
    } catch (error) {
      Covy().showSnackbar({
        message: errorMessage(error),
        severity: "error",
      });
    }
  }
);

export const savePromo = createAsyncThunk("promos/savePromo", async (promo: any, thunkApi: any) => {
  try {
    if (!promo._id) {
      const { data } = await axios.post("/api/promos", promo);
      Covy().showSnackbar({
        message: `Promo Created`,
        severity: "success",
      });
      return data;
    } else {
      const { data } = await axios.put(`/api/promos/${promo._id}`, promo);
      Covy().showSnackbar({
        message: `Promo Updated`,
        severity: "success",
      });
      return data;
    }
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsPromo = createAsyncThunk("promos/detailsPromo", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/promos/${id}`);
    Covy().showSnackbar({
      message: `Promo Found`,
      severity: "success",
    });
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deletePromo = createAsyncThunk("promos/deletePromo", async (pathname, thunkApi: any) => {
  try {
    const { data } = await axios.delete("/api/promos/" + pathname);
    Covy().showSnackbar({
      message: `Promo Deleted`,
      severity: "success",
    });
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteMultiplePromos = createAsyncThunk(
  "promo/deleteMultiplePromos",
  async (ids: string, thunkApi: any) => {
    try {
      const { data } = await axios.put(`/api/promos/delete_multiple`, { ids });
      Covy().showSnackbar({
        message: `Promos Deleted`,
        severity: "success",
      });
      return data;
    } catch (error) {
      Covy().showSnackbar({
        message: errorMessage(error),
        severity: "error",
      });
    }
  }
);

export const refreshSponsorCodes = createAsyncThunk("promo/refreshSponsorCodes", async (_data, thunkApi: any) => {
  try {
    const { data } = await axios.post(`/api/promos/refresh_sponsor_codes`, {});
    Covy().showSnackbar({
      message: `Sponsor Codes Refreshed`,
      severity: "success",
    });
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});
