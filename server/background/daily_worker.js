import { facebook_catalog_upload } from "./daily_workers/facebook_catalog_upload";
import { log_subscription_expenses } from "./daily_workers/log_subscriptions_expenses";

const daily_worker = () => {
  facebook_catalog_upload();
  log_subscription_expenses();
};

daily_worker();
