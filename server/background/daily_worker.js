import { facebook_catalog_upload } from "./daily_workers/facebook_catalog_upload.js";
import { log_subscription_expenses } from "./daily_workers/log_subscriptions_expenses.js";

const daily_worker = () => {
  facebook_catalog_upload();
  log_subscription_expenses();
};

daily_worker();
