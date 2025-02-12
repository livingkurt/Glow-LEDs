import axios from "axios";
import { domain } from "../worker_helpers.js";

export const check_stock = async () => {
  try {
    const domainUrl = domain();
    await axios.post(`${domainUrl}/api/emails/current_stock`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
