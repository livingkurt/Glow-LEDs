const { payout_affiliates, payout_teams, refresh_sponsor_codes } = require("./payout_affiliates");

const monthly_worker = () => {
  // Get the current date
  const today = new Date();
  // Check if today is Froday (the 5th day of the week)
  if (today.getDate() === 1) {
    // Run the code that you only want to run once a week
    payout_affiliates();
    payout_teams();
    refresh_sponsor_codes();
  }
};

monthly_worker();
