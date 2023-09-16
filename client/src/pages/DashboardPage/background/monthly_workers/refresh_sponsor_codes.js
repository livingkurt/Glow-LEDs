import axios from "axios";
import { domain } from "../../../../helpers/sharedHelpers";

export const refresh_sponsor_codes = async (): Promise<void> => {
  try {
    const domainUrl = domain();
    await axios.post(`${domainUrl}/api/promos/refresh_sponsor_codes`);
  } catch (error) {
    console.log("error", error);
  }
};
