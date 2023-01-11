/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { create_query } from "../utils/helper_functions";

export const listEspenses = createAsyncThunk("expenses/listEspenses", async (query: any, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.get("/api/expenses?" + create_query(query), {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const updateEspense = createAsyncThunk("expenses/updateEspense", async (expense: any, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.put("/api/expenses/" + expense.pathname, expense, {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const createEspense = createAsyncThunk("expenses/createEspense", async (expense: any, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.post("/api/expenses", expense, {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const detailsEspense = createAsyncThunk("expenses/detailsEspense", async ({ id }: any, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/expenses/${id}`, {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const deleteEspense = createAsyncThunk("expenses/deleteEspense", async (pathname, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/expenses/" + pathname, {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    return data;
  } catch (error) {}
});
