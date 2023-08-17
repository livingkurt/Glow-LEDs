/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Covy from "../shared/GlowLEDsComponents/GLCovy/GLCovy";
import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import { create_query } from "../utils/helper_functions";

export const getWholesalers = async ({
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
    return axios.get(`/api/wholesalers`, {
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

export const listWholesalers = createAsyncThunk("wholesalers/listWholesalers", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/wholesalers?${create_query(query)}`);

    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveWholesaler = createAsyncThunk("wholesalers/saveWholesaler", async (wholesaler: any, thunkApi: any) => {
  try {
    if (!wholesaler._id) {
      const { data } = await axios.post("/api/wholesalers", wholesaler);
      Covy().showSnackbar({
        message: `Wholesaler Created`,
        severity: "success",
      });
      return data;
    } else {
      const { data } = await axios.put(`/api/wholesalers/${wholesaler._id}`, wholesaler);
      Covy().showSnackbar({
        message: `Wholesaler Updated`,
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

export const detailsWholesaler = createAsyncThunk(
  "wholesalers/detailsWholesaler",
  async ({ id }: any, thunkApi: any) => {
    try {
      const { data } = await axios.get(`/api/wholesalers/${id}`);
      Covy().showSnackbar({
        message: `Wholesaler Found`,
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

export const deleteWholesaler = createAsyncThunk("wholesalers/deleteWholesaler", async (id, thunkApi: any) => {
  try {
    const { data } = await axios.delete(`/api/wholesalers/${id}`);
    Covy().showSnackbar({
      message: `Wholesaler Deleted`,
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
