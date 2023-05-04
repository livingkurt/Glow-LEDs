import axios from "axios";

import jwt_decode from "jwt-decode";
import store from "../store";
import { set_current_user } from "../slices/userSlice";
import * as API from "../api";

export async function getFreshAccessToken(refresh_token) {
  try {
    const { data } = await API.refreshLogin(refresh_token);
    return data.access_token;
  } catch (error) {
    throw error;
  }
}

export function isTokenExpired(token) {
  const decoded = jwt_decode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
}

export const setAuthToken = accessToken => {
  if (accessToken) {
    // Apply authorization accessToken to every request if logged in
    axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const refreshAccessToken = async refreshTokenValue => {
  try {
    const newAccessToken = await getFreshAccessToken(refreshTokenValue);
    localStorage.setItem("accessToken", newAccessToken);
    setAuthToken(newAccessToken);
    const decoded = jwt_decode(newAccessToken);
    store.dispatch(set_current_user(decoded));
    return newAccessToken;
  } catch (error) {
    store.dispatch(API.logoutUser(refreshTokenValue));
    window.location.href = "/account/login?redirect=" + window.location.pathname;
  }
};

export function setCurrentUser(accessToken) {
  setAuthToken(accessToken);
  // Decode access_token and get user info and exp
  const decoded_access_token = jwt_decode(accessToken);
  store.dispatch(set_current_user(decoded_access_token));
}
export async function handleTokenRefresh(forceRefresh = false) {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return;

  const refreshTokenValue = localStorage.getItem("refreshToken"); // Get the refresh token from localStorage
  if (!refreshTokenValue) return;
  if (isTokenExpired(accessToken) || forceRefresh) {
    const newAccessToken = await refreshAccessToken(refreshTokenValue);
    return newAccessToken || accessToken;
  }

  return accessToken;
}

axios.interceptors.request.use(
  async config => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const isRefreshRequest = config.url.includes("/api/users/refresh_login"); // Check if the request is for token refresh

      if (!isRefreshRequest) {
        const refreshedAccessToken = await handleTokenRefresh(); // Get the refreshed access token
        config.headers["Authorization"] = refreshedAccessToken; // Use the refreshed access token
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
