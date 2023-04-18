/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { create_query } from "../utils/helper_functions";
import { headers } from "../utils/helpers/user_helpers";

export const getCategorys = async ({
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
    return axios.get(`/api/categorys`, {
      params: {
        limit: pageSize,
        page: page,
        search: search,
        sort: sorting,
        filters: filters
      }
    });
  } catch (error) {}
};
export const reorderCategorys = async ({ reorderedItems }: { reorderedItems: any }) => {
  try {
    return axios.put(`/api/categorys/reorder`, { reorderedItems });
  } catch (error) {}
};

export const listCategorys = createAsyncThunk("categorys/listCategorys", async (query: any, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/categorys?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const saveCategory = createAsyncThunk("categorys/saveCategory", async (category: any, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();

    if (!category._id) {
      const { data } = await axios.post("/api/categorys", category, headers(current_user));
      return data;
    } else {
      const { data } = await axios.put(`/api/categorys/${category._id}`, category, headers(current_user));
      return data;
    }
  } catch (error) {}
});

export const detailsCategory = createAsyncThunk("categorys/detailsCategory", async ({ pathname, id }: any, thunkApi: any) => {
  try {
    let response: any = {};
    if (id) {
      response = await axios.get(`/api/categorys/${id}`);
    } else if (pathname) {
      response = await axios.get(`/api/categorys/${pathname}/pathname`);
    }
    return response.data;
  } catch (error) {}
});

export const deleteCategory = createAsyncThunk("categorys/deleteCategory", async (id: string, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.delete(`/api/categorys/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});
