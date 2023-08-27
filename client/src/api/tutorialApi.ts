/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Covy from "../shared/GlowLEDsComponents/GLCovy/GLCovy";
import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import { create_query } from "../utils/helper_functions";

export const getTutorials = async ({
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
    return await axios.get(`/api/tutorials`, {
      params: {
        limit: pageSize,
        page: page,
        search: search,
        sort: sorting,
        filters: JSON.stringify(filters),
      },
    });
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
  }
};
export const reorderTutorials = async ({ reorderedItems }: { reorderedItems: any }) => {
  try {
    return axios.put(`/api/tutorials/reorder`, { reorderedItems });
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
  }
};

export const listTutorials = createAsyncThunk("tutorials/listTutorials", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/tutorials?${create_query(query)}`);

    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveTutorial = createAsyncThunk("tutorials/saveTutorial", async (tutorial: any, thunkApi: any) => {
  try {
    if (!tutorial._id) {
      const { data } = await axios.post("/api/tutorials", tutorial);
      Covy().showSnackbar({
        message: `Tutorial Created`,
        severity: "success",
      });
      return data;
    } else {
      const { data } = await axios.put(`/api/tutorials/${tutorial._id}`, tutorial);
      Covy().showSnackbar({
        message: `Tutorials Updated`,
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

export const detailsTutorial = createAsyncThunk(
  "tutorials/detailsTutorial",
  async ({ pathname, id }: any, thunkApi: any) => {
    try {
      let response: any = {};
      if (id) {
        response = await axios.get(`/api/tutorials/${id}`);
      } else if (pathname) {
        response = await axios.get(`/api/tutorials/${pathname}/pathname`);
      }
      Covy().showSnackbar({
        message: `Tutorial Found`,
        severity: "success",
      });
      return response.data;
    } catch (error) {
      Covy().showSnackbar({
        message: errorMessage(error),
        severity: "error",
      });
    }
  }
);

export const deleteTutorial = createAsyncThunk("tutorials/deleteTutorial", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.delete(`/api/tutorials/${id}`);
    Covy().showSnackbar({
      message: `Tutorial Deleted`,
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
