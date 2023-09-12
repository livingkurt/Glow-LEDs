import axios from "axios";
import { domain } from "../../../../helpers/sharedHelpers";

export const check_stock = async (): Promise<void> => {
  try {
    const domainUrl = domain();
    await axios.post(`${domainUrl}/api/emails/current_stock`);
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
