/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { create_query } from "../utils/helper_functions";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser } from "../actions/userActions";

export const listWholesalers = createAsyncThunk("wholesalers/listWholesalers", async (query: any, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.get("/api/wholesalers?" + create_query(query), {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const updateWholesaler = createAsyncThunk("wholesalers/updateWholesaler", async (wholesaler: any, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.put("/api/wholesalers/" + wholesaler.pathname, wholesaler, {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const createWholesaler = createAsyncThunk("wholesalers/createWholesaler", async (wholesaler: any, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.post("/api/wholesalers", wholesaler, {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    const { data: user } = await axios.put(
      "/api/users/update/" + userInfo._id,
      {
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        email: userInfo.email,
        password: userInfo.password,
        is_wholesalerd: true,
        email_subscription: userInfo.email_subscription,
        wholesaler: data._id,
        shipping: userInfo.shipping,
        isVerified: userInfo.isVerified,
        isAdmin: userInfo.isAdmin,
        access_token: userInfo.access_token,
        refresh_token: userInfo.refresh_token
      },
      {
        headers: {
          Authorization: "Bearer " + userInfo.access_token
        }
      }
    );
    const { access_token, refresh_token } = user;
    setAuthToken(access_token);
    const decoded = jwt_decode(access_token);

    // Set current user
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("refreshToken", refresh_token);
    thunkApi.dispatch(setCurrentUser(decoded));

    return data;
  } catch (error) {}
});

export const detailsWholesaler = createAsyncThunk("wholesalers/detailsWholesaler", async ({ pathname, id }: any, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    let response: any = {};
    if (id) {
      response = await axios.get(`/api/wholesalers/${id}`);
    } else if (pathname) {
      response = await axios.get(`/api/wholesalers/${pathname}/pathname`);
    }
    return response.data;
  } catch (error) {}
});

export const deleteWholesaler = createAsyncThunk("wholesalers/deleteWholesaler", async (pathname, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/wholesalers/" + pathname, {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const create_rave_mob_wholesalers = createAsyncThunk("wholesalers/create_rave_mob_wholesalers", async (csv, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.put(
      "/api/wholesalers/create_rave_mob_wholesalers",
      { csv },
      {
        headers: {
          Authorization: "Bearer " + userInfo.access_token
        }
      }
    );
    return data;
  } catch (error) {}
});
