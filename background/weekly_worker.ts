import { payout_employees } from "../client/src/pages/DashboardPage/background/weekly_workers/payout_employees";

const weekly_worker = () => {
  // Get the current date
  const today = new Date();
  // Check if today is Froday (the 5th day of the week)
  if (today.getDay() === 5) {
    // Run the code that you only want to run once a week
    payout_employees();
  } else {
    console.log("Not Friday");
  }
};

weekly_worker();
