const { check_stock } = require("./weekly_workers/check_stock");
const { payout_employees } = require("./weekly_workers/payout_employees");

const getWeekNumber = d => {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  // Return array of year and week number
  return weekNo;
};

const weekly_worker = () => {
  // payout_employees();
  // Get the current date
  const today = new Date();
  console.log({ getDay: today.getDay() });
  // Check if today is Friday (the 5th day of the week)
  if (today.getDay() === 5) {
    // Check if it's an even week
    if (getWeekNumber(today) % 2 === 0) {
      // Run the code that you only want to run once every two weeks
      payout_employees();
      check_stock();
    } else {
      console.log("Not the right week");
    }
  } else {
    console.log("Not Friday");
  }
};

weekly_worker();
