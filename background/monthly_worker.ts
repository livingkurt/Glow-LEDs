import { payout_affiliates } from "./monthly_workers/payout_affiliates";
import { payout_teams } from "./monthly_workers/payout_teams";
import { payout_tips } from "./monthly_workers/payout_tips";
import { refresh_sponsor_codes } from "./monthly_workers/refresh_sponsor_codes";

const monthly_worker = () => {
  // Get the current date
  const today = new Date();
  // Check if today is Froday (the 5th day of the week)
  if (today.getDate() === 1) {
    // Run the code that you only want to run once a week
    payout_affiliates();
    payout_teams();
    refresh_sponsor_codes();
    payout_tips();
  }
};

monthly_worker();
