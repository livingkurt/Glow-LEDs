import { payout_affiliates } from "./monthly_workers/payout_affiliates.js";
import { payout_teams } from "./monthly_workers/payout_teams.js";
import { payout_tips } from "./monthly_workers/payout_tips.js";
import { refresh_sponsor_codes } from "./monthly_workers/refresh_sponsor_codes.js";

const monthly_worker = () => {
  // Get the current date
  const today = new Date();
  // Check if today is the first of the month
  if (today.getDate() === 1) {
    // Run the code that you only want to run once a month
    payout_affiliates();
    payout_teams();
    payout_tips();
    refresh_sponsor_codes();
  } else {
    console.log("Not the first of the month");
  }
};

monthly_worker();
