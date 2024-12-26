import axios from "axios";
import { domain } from "../worker_helpers.js";

export const payout_affiliates = async () => {
  try {
    const domainUrl = domain();
    const { data } = await axios.post(`${domainUrl}/api/affiliates/payout`);
    console.log("Affiliate payout results:", data);
    return data;
  } catch (error) {
    console.error("Error in payout_affiliates worker:", error);
  }
};
