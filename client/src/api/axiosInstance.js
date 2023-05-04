import axios from "axios";

import jwt_decode from "jwt-decode";
import store from "../store";
import { logout_user, set_current_user } from "../slices/userSlice";
import { API_Users } from "../utils";

export async function getFreshAccessToken(access_token, refresh_token) {
  const data = await API_Users.refresh_login(access_token, refresh_token);
  return data.access_token;
}

export function isTokenExpired(token) {
  const decoded = jwt_decode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
}

export const setAuthToken = access_token => {
  if (access_token) {
    // Apply authorization access_token to every request if logged in
    axios.defaults.headers.common["Authorization"] = access_token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const refreshAccessToken = async (accessToken, refreshTokenValue) => {
  try {
    const newAccessToken = await getFreshAccessToken(accessToken, refreshTokenValue);
    localStorage.setItem("accessToken", newAccessToken);
    setAuthToken(newAccessToken);
    const decoded = jwt_decode(newAccessToken);
    console.log({ decoded });
    store.dispatch(set_current_user(decoded));
    return newAccessToken;
  } catch (error) {
    store.dispatch(logout_user(refreshTokenValue));
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

  const refreshTokenValue = jwt_decode(accessToken).refresh_token;
  if (!refreshTokenValue) return;

  console.log({ isTokenExpired: isTokenExpired(accessToken), accessToken, refreshTokenValue });
  if (isTokenExpired(accessToken) || forceRefresh) {
    const newAccessToken = await refreshAccessToken(accessToken, refreshTokenValue);
    console.log({ newAccessToken });
    return newAccessToken || accessToken;
  } else {
    setCurrentUser(accessToken);
  }

  return accessToken; // Add this line
}

axios.interceptors.request.use(
  async config => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const refreshedAccessToken = await handleTokenRefresh(); // Get the refreshed access token
      config.headers["Authorization"] = refreshedAccessToken; // Use the refreshed access token
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;

// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import store from "../redux/store";
// import { set_current_user, logout_user } from "../redux/actions/authActions";
// import { API_Users } from "./apiEndpoints";
// import setAuthToken from "./setAuthToken";

// const delay = 1000; // Configure this based on your needs
// let lastExecution = Date.now() - delay;

// async function refreshToken(access_token, refresh_token) {
//   const data = await API_Users.refresh_login(access_token, refresh_token);
//   return data.access_token;
// }

// function isTokenExpired(token) {
//   const decoded = jwt_decode(token);
//   const currentTime = Date.now() / 1000;
//   return decoded.exp < currentTime;
// }

// axios.interceptors.request.use(
//   async config => {
//     const accessToken = localStorage.getItem("accessToken");

//     if (accessToken) {
//       const refreshTokenValue = jwt_decode(accessToken).refresh_token;
//       const forceRefresh = false; // Set this based on your needs

//       if (isTokenExpired(accessToken)) {
//         if (refreshTokenValue && lastExecution + delay < Date.now()) {
//           try {
//             const newAccessToken = await refreshToken(accessToken, refreshTokenValue);
//             localStorage.setItem("accessToken", newAccessToken);
//             setAuthToken(newAccessToken);
//             const decoded = jwt_decode(newAccessToken);
//             store.dispatch(set_current_user(decoded));
//             lastExecution = Date.now();
//           } catch (error) {
//             store.dispatch(logout_user(refreshTokenValue));
//             window.location.href = "/account/login?redirect=" + window.location.pathname;
//           }
//         }
//       } else if (forceRefresh) {
//         try {
//           const newAccessToken = await refreshToken(accessToken, refreshTokenValue);
//           localStorage.setItem("accessToken", newAccessToken);
//           setAuthToken(newAccessToken);
//           const decoded = jwt_decode(newAccessToken);
//           store.dispatch(set_current_user(decoded));
//         } catch (error) {
//           store.dispatch(logout_user(refreshTokenValue));
//           window.location.href = "/account/login?redirect=" + window.location.pathname;
//         }
//         lastExecution = Date.now();
//       }

//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// export default axios;
