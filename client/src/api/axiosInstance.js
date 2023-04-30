import axios from "axios";
import jwt_decode from "jwt-decode";
import store from "../redux/store";
import { set_current_user, logout_user } from "../redux/actions/authActions";
import { API_Users } from "./apiEndpoints";
import setAuthToken from "./setAuthToken";

const delay = 1000; // Configure this based on your needs
let lastExecution = Date.now() - delay;

async function refreshToken(access_token, refresh_token) {
  const data = await API_Users.refresh_login(access_token, refresh_token);
  return data.access_token;
}

function isTokenExpired(token) {
  const decoded = jwt_decode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
}

axios.interceptors.request.use(
  async config => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const refreshTokenValue = jwt_decode(accessToken).refresh_token;
      const forceRefresh = false; // Set this based on your needs

      if (isTokenExpired(accessToken)) {
        if (refreshTokenValue && lastExecution + delay < Date.now()) {
          try {
            const newAccessToken = await refreshToken(accessToken, refreshTokenValue);
            localStorage.setItem("accessToken", newAccessToken);
            setAuthToken(newAccessToken);
            const decoded = jwt_decode(newAccessToken);
            store.dispatch(set_current_user(decoded));
            lastExecution = Date.now();
          } catch (error) {
            store.dispatch(logout_user(refreshTokenValue));
            window.location.href = "/account/login?redirect=" + window.location.pathname;
          }
        }
      } else if (forceRefresh) {
        try {
          const newAccessToken = await refreshToken(accessToken, refreshTokenValue);
          localStorage.setItem("accessToken", newAccessToken);
          setAuthToken(newAccessToken);
          const decoded = jwt_decode(newAccessToken);
          store.dispatch(set_current_user(decoded));
        } catch (error) {
          store.dispatch(logout_user(refreshTokenValue));
          window.location.href = "/account/login?redirect=" + window.location.pathname;
        }
        lastExecution = Date.now();
      }

      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
