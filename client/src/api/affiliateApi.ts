/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { create_query } from "../utils/helper_functions";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser } from "../actions/userActions";
import { DetailsAffiliate } from "../actions/affiliateActions";
// import { createApi } from "@reduxjs/toolkit/query/react";

// const axiosBaseQuery =
//   ({ baseUrl } = { baseUrl: "" }) =>
//   async ({ url, method, data, params }) => {
//     try {
//       const result = await axios({ url: baseUrl + url, method, data, params });
//       return { data: result.data };
//     } catch (axiosError) {
//       const err = axiosError;
//       return {
//         error: {
//           status: err.response?.status,
//           data: err.response?.data || err.message
//         }
//       };
//     }
//   };

export const listAffiliates = createAsyncThunk("affiliates/listAffiliates", async (query: any, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.get("/api/affiliates?" + create_query(query), {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const saveAffiliate = createAsyncThunk("affiliates/saveAffiliate", async (affiliate: any, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.put("/api/affiliates/" + affiliate.pathname, affiliate, {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const updateAffiliate = createAsyncThunk("affiliates/updateAffiliate", async (affiliate: any, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.post("/api/affiliates", affiliate, {
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
        is_affiliated: true,
        email_subscription: userInfo.email_subscription,
        affiliate: data._id,
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

export const detailsAffiliate = createAsyncThunk(
  "affiliates/detailsAffiliate",
  async ({ pathname, id }: DetailsAffiliate, thunkApi: any) => {
    try {
      const {
        userLogin: { userInfo }
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
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/affiliates/" + pathname, {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const create_rave_mob_affiliates = createAsyncThunk("affiliates/create_rave_mob_affiliates", async (csv, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.put(
      "/api/affiliates/create_rave_mob_affiliates",
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

// export const employeeInfoApi = createApi({
//   reducerPath: "affiliateApi",
//   baseQuery: axiosBaseQuery({ baseUrl: "/api/v1" }),
//   endpoints: builder => ({
//     getUsers: builder.query({
//       query: () => ({ url: "/titles", method: "get" }),
//       transformResponse: response => response.titles
//     })
//   })
// });

// export const { useGetTitlesQuery, useGetShiftsQuery, useGetRolesQuery, useGetTagsQuery } = employeeInfoApi;
