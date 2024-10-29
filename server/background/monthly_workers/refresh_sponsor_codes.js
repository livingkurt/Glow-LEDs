import axios from "axios";
import { domain } from "../worker_helpers.js";

export const refresh_sponsor_codes = async () => {
  try {
    const domainUrl = domain();
    await axios.post(`${domainUrl}/api/promos/refresh_sponsor_codes`);
  } catch (error) {
    console.log("error", error);
  }
};
