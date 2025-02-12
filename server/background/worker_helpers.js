import axios from "axios";
import config from "../config.js";

import dayjs from "dayjs";

export const domain = () => {
  if (config.ENVIRONMENT === "production") {
    return "https://www.glow-leds.com";
  } else if (config.ENVIRONMENT === "staging") {
    return "https://glow-leds-dev.herokuapp.com";
  } else {
    return "http://localhost:5173";
  }
};

export const last_month_date_range = () => {
  const lastMonth = dayjs().subtract(1, "month");

  const start_date = lastMonth.startOf("month").format("YYYY-MM-DD HH:mm:ss");
  const end_date = lastMonth.endOf("month").format("YYYY-MM-DD HH:mm:ss");

  return { start_date, end_date };
};

export const last_year_date_range = () => {
  const currentYear = new Date().getFullYear();

  // Calculate the previous year
  const prevYear = currentYear - 1;

  // Set start and end dates for the previous year
  const start_date = `${prevYear}-01-01`;
  const end_date = `${prevYear}-12-31`;

  return { start_date, end_date };
};

export const this_month_date_range = () => {
  const today = new Date(); // get current date
  const year = today.getFullYear(); // get current year
  const month = today.getMonth() + 1; // get current month (0-indexed)
  const start_date = `${year}-${month.toString().padStart(2, "0")}-01`;
  const lastDayOfMonth = new Date(year, month, 0).getDate();
  const end_date = `${year}-${month.toString().padStart(2, "0")}-${lastDayOfMonth.toString().padStart(2, "0")}`;
  return { start_date, end_date };
};

export const this_year_date_range = () => {
  const today = new Date(); // get current date
  const year = today.getFullYear(); // get current year
  const start_date = `${year}-01-01`;
  const end_date = `${year}-12-31`;
  return { start_date, end_date };
};

// Get todays date in YYYY-MM-DD format
export const get_todays_date = () => {
  const date = new Date();
  const isoDate = date.toISOString();
  const todaysDate = isoDate.split("T")[0];
  return todaysDate;
};

export const save_paycheck_to_expenses = async data => {
  try {
    await axios.post(`/api/expenses`, data);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
