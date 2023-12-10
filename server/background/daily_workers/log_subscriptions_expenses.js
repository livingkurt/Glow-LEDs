import axios from "axios";
import { domain } from "../worker_helpers";

export const log_subscription_expenses = async () => {
  try {
    const domainUrl = domain();
    await axios.put(`${domainUrl}/api/expenses/subscriptions`);
  } catch (err) {
    console.error(err);
  }
};
