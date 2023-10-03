import { facebook_catalog_upload } from "./daily_workers/facebook_catalog_upload";

const daily_worker = () => {
  facebook_catalog_upload();
};

daily_worker();
