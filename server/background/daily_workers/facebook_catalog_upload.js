import axios from "axios";
import { domain } from "../worker_helpers.js";

export const facebook_catalog_upload = async () => {
  try {
    const domainUrl = domain();
    await axios.get(`${domainUrl}/api/products/facebook_catelog`);
  } catch (err) {
    console.error(err);
  }
};
