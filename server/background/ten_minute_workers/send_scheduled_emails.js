import axios from "axios";
import { domain } from "../worker_helpers.js";

export const send_scheduled_emails = async () => {
  try {
    const domainUrl = domain();
    await axios.post(`${domainUrl}/api/emails/send_scheduled`);
  } catch (error) {
    console.log("error", error);
  }
};
