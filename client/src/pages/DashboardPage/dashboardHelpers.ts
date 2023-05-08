import { facebook_catalog_upload } from "./background/daily_workers/facebook_catalog_upload";
import { google_catalog_upload } from "./background/daily_workers/google_catalog_upload";
import { payout_affiliates } from "./background/monthly_workers/payout_affiliates";
import { payout_teams } from "./background/monthly_workers/payout_teams";
import { payout_tips } from "./background/monthly_workers/payout_tips";
import { refresh_sponsor_codes } from "./background/monthly_workers/refresh_sponsor_codes";
import { payout_employees } from "./background/weekly_workers/payout_employees";
import { set_loading } from "./dashboardSlice";

export const getMonthStartEndDates = ({ month, year }: { month?: string; year?: number }) => {
  if (month && year) {
    const monthNumber = new Date(Date.parse(`${month} 1, ${year}`)).getMonth();
    const start_date = new Date(year, monthNumber, 1);
    const end_date = new Date(year, monthNumber + 1, 0);
    return { start_date: start_date.toISOString().substring(0, 10), end_date: end_date.toISOString().substring(0, 10) };
  } else if (year) {
    const start_date = new Date(year, 0, 1);
    const end_date = new Date(year, 11, 31);
    return { start_date: start_date.toISOString().substring(0, 10), end_date: end_date.toISOString().substring(0, 10) };
  }
};

export const colors = [
  "#b33434",
  "#b9742f",
  "#bfbf26",
  "#7ccd2a",
  "#2bc92b",
  "#29c779",
  "#27bfbf",
  "#2873bd",
  "#2a2ab5",
  "#742bbd",
  "#bd28bd",
  "#c12573"
];

export const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const run_daily_workers = (dispatch: any) => {
  const confirm = window.confirm("Are you sure you want to run the daily worker?");
  if (confirm) {
    dispatch(set_loading(true));
    facebook_catalog_upload();
    google_catalog_upload();
    dispatch(set_loading(false));
  }
};

export const run_weekly_workers = (dispatch: any) => {
  const confirm = window.confirm("Are you sure you want to run the weekly worker?");
  if (confirm) {
    dispatch(set_loading(true));
    payout_employees();
    dispatch(set_loading(false));
  }
};
export const run_monthly_workers = (dispatch: any) => {
  const confirm = window.confirm("Are you sure you want to run the monthly worker?");
  if (confirm) {
    dispatch(set_loading(true));
    payout_affiliates();
    payout_teams();
    payout_tips();
    refresh_sponsor_codes();
    dispatch(set_loading(false));
  }
};

export const isLoading = (data: any) => {
  return !data.isLoading && data.data[0];
};
