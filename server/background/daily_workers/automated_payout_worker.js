import axios from "axios";
import { domain } from "../worker_helpers.js";

export const automated_payout_worker = async () => {
  try {
    // Default values: $2000 minimum balance trigger, $1250 reserve amount
    const domainUrl = domain();
    await axios.post(`${domainUrl}/api/payments/automated_payout`);
  } catch (error) {
    console.error("Error in automated payout worker:", error);
  }
};
