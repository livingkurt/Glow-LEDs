import axios from "axios";
import jwt_decode from "jwt-decode";
import store from "../store";
import { set_current_user } from "../slices/userSlice";
import * as API from "../api";

export async function getFreshAccessToken(refresh_token) {
  try {
    console.log({ function: "getFreshAccessToken", refresh_token });
    const { data } = await API.refreshLogin(refresh_token);
    console.log({ function: "getFreshAccessToken", data });
    return data.access_token;
  } catch (error) {
    console.log({ function: "getFreshAccessToken", error });
    throw error;
  }
}

export function isTokenExpired(token) {
  console.log({ function: "isTokenExpired", token });
  const decoded = jwt_decode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
}

export const setAuthToken = accessToken => {
  console.log({ function: "setAuthToken", accessToken });
  if (accessToken) {
    // Apply authorization accessToken to every request if logged in
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const refreshAccessToken = async refreshTokenValue => {
  try {
    console.log({ function: "refreshAccessToken", refreshTokenValue });
    const newAccessToken = await getFreshAccessToken(refreshTokenValue);
    localStorage.setItem("accessToken", newAccessToken);
    setAuthToken(newAccessToken);
    const decoded = jwt_decode(newAccessToken);
    store.dispatch(set_current_user(decoded));
    console.log({ function: "refreshAccessToken", newAccessToken });
    return newAccessToken;
  } catch (error) {
    console.log({ function: "refreshAccessToken", error });
    // store.dispatch(API.logoutUser(refreshTokenValue));
    // window.location.href = "/account/login?redirect=" + window.location.pathname;
  }
};

export function setCurrentUser(accessToken) {
  console.log({ function: "setCurrentUser", accessToken });
  setAuthToken(accessToken);
  // Decode access_token and get user info and exp
  const decoded_access_token = jwt_decode(accessToken);
  store.dispatch(set_current_user(decoded_access_token));
}

export async function handleTokenRefresh(forceRefresh = false) {
  console.log({ function: "handleTokenRefresh", forceRefresh });
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return;

  const refreshTokenValue = localStorage.getItem("refreshToken"); // Get the refresh token from localStorage
  if (!refreshTokenValue) return;

  if (isTokenExpired(accessToken) || forceRefresh) {
    const newAccessToken = await refreshAccessToken(refreshTokenValue);
    console.log({ function: "handleTokenRefresh", newAccessToken });
    return newAccessToken || accessToken;
  }

  console.log({ function: "handleTokenRefresh", accessToken });
  return accessToken;
}

axios.interceptors.request.use(
  async config => {
    const accessToken = localStorage.getItem("accessToken");
    console.log({ function: "axios.interceptors.request", config_url: config.url });

    if (accessToken) {
      const isRefreshRequest = config.url.includes("/api/users/refresh_login"); // Check if the request is for token refresh

      if (!isRefreshRequest) {
        console.log({ function: "axios.interceptors.request", refreshing_token: true });
        const refreshedAccessToken = await handleTokenRefresh(); // Get the refreshed access token
        config.headers["Authorization"] = `Bearer ${refreshedAccessToken}`; // Use the refreshed access token
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
