import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import jwt_decode from "jwt-decode";
import store from "../store";
import { set_current_user } from "../slices/userSlice";

export function isTokenExpired(token) {
  try {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (e) {
    return true;
  }
}

export const setAuthToken = accessToken => {
  if (accessToken) {
    // Apply authorization accessToken to every request if logged in
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const refreshAccessToken = async refreshToken => {
  try {
    const { data } = await axios.put("/api/users/refresh_login", { refresh_token: refreshToken });
    const newAccessToken = data.access_token;
    localStorage.setItem("accessToken", newAccessToken);
    setAuthToken(newAccessToken);
    const decoded = jwt_decode(newAccessToken);
    store.dispatch(set_current_user(decoded));
    return newAccessToken;
  } catch (error) {}
};

export function setCurrentUser(accessToken) {
  try {
    setAuthToken(accessToken);
    const decoded_access_token = jwt_decode(accessToken);
    store.dispatch(set_current_user(decoded_access_token));
    return decoded_access_token;
  } catch (e) {
    return null;
  }
}

export async function handleTokenRefresh(forceRefresh = false) {
  const oldAccessToken = localStorage.getItem("accessToken");
  if (!oldAccessToken) {
    return null; // <-- Redirect will occur in your route components
  }

  const refreshToken = localStorage.getItem("refreshToken"); // Get the refresh token from localStorage
  if (!refreshToken) return;

  if (isTokenExpired(oldAccessToken) || forceRefresh) {
    const newAccessToken = await refreshAccessToken(refreshToken);
    return newAccessToken;
  } else {
    const current_user = setCurrentUser(oldAccessToken);
    return oldAccessToken;
  }
}

axios.interceptors.request.use(
  async config => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const isRefreshRequest = config.url.includes("/api/users/refresh_login"); // Check if the request is for token refresh

      if (!isRefreshRequest) {
        const refreshedAccessToken = await handleTokenRefresh(); // Get the refreshed access token
        config.headers["Authorization"] = `Bearer ${refreshedAccessToken}`; // Use the refreshed access token
        axios.defaults.headers.common["Refresh-Token"] = refreshedAccessToken;
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
