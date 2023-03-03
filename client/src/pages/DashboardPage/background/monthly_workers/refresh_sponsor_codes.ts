import axios from "axios";
import { domain } from "../worker_helpers";

export const refresh_sponsor_codes = async (): Promise<void> => {
  try {
    const domainUrl = domain();
    await axios.put(`${domainUrl}/api/promos/refresh_sponsor_codes`);
  } catch (error) {
    console.log("error", error);
  }
};
