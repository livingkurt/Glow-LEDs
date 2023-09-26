const { facebook_catalog_upload } = require("./daily_workers/facebook_catalog_upload");
const { google_catalog_upload } = require("./daily_workers/google_catalog_upload");

const daily_worker = () => {
  facebook_catalog_upload();
  google_catalog_upload();
};

daily_worker();
