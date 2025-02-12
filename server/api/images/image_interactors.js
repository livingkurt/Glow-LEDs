import axios from "axios";
import config from "../../config.js";

export const exchangeCodeForToken = async code => {
  try {
    const response = await axios.post("https://api.imgur.com/oauth2/token", {
      client_id: config.IMGUR_ClIENT_ID,
      client_secret: config.IMGUR_ClIENT_SECRET,
      grant_type: "authorization_code",
      code: code,
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const refreshAccessToken = async refreshToken => {
  try {
    const response = await axios.post("https://api.imgur.com/oauth2/token", {
      refresh_token: refreshToken,
      client_id: config.IMGUR_ClIENT_ID,
      client_secret: config.IMGUR_ClIENT_SECRET,
      grant_type: "refresh_token",
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
