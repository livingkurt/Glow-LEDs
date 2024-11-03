import { automated_payout_worker } from "./daily_workers/automated_payout_worker.js";
import { check_stock } from "./weekly_workers/check_stock.js";
import { payout_employees } from "./weekly_workers/payout_employees.js";

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
  // Get the current date
  const today = new Date();

  automated_payout_worker();
  // Check if today is Friday (the 5th day of the week)
  // if (today.getDay() === 5) {
  //   // Weekly tasks - run every Friday

  //   // Bi-weekly tasks - run every other Friday
  //   if (getWeekNumber(today) % 2 === 0) {
  //     payout_employees();
  //     check_stock();
  //   } else {
  //     console.log("Not a payroll week");
  //   }
  // } else {
  //   console.log("Not Friday");
  // }
};

weekly_worker();
