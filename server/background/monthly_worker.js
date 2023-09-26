const { payout_affiliates } = require("./monthly_workers/payout_affiliates");
const { payout_teams } = require("./monthly_workers/payout_teams");
const { payout_tips } = require("./monthly_workers/payout_tips");
const { refresh_sponsor_codes } = require("./monthly_workers/refresh_sponsor_codes");

const monthly_worker = () => {
  // Get the current date
  const today = new Date();
  // Check if today is Froday (the 5th day of the week)
  if (today.getDate() === 1) {
    // Run the code that you only want to run once a week
    payout_affiliates();
    payout_teams();
    payout_tips();
    refresh_sponsor_codes();
  } else {
    console.log("Not the first of the month");
  }
};

monthly_worker();
