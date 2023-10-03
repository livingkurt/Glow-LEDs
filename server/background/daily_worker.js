import { facebook_catalog_upload } from "./daily_workers/facebook_catalog_upload";
import { google_catalog_upload } from "./daily_workers/google_catalog_upload";

const daily_worker = () => {
  facebook_catalog_upload();
  // google_catalog_upload();
};

daily_worker();
