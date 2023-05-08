import axios from "axios";
import { domain } from "../worker_helpers";
import dotenv from "dotenv";

dotenv.config();

export const check_stock = async (): Promise<void> => {
  try {
    const domainUrl = domain();
    await axios.post(`${domainUrl}/api/emails/current_stock`);
  } catch (error) {}
};
