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
  "#c12573",
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
  "December",
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

export const timeLabel = (month: string, year: string) => {
  return year && month ? `${year} ${month}` : year ? year : month ? month : "All Time";
};

export const determineTabName = (month: string, year: string) => {
  if (year && month) {
    return "Daily";
  } else if (year) {
    return "Monthly";
  } else {
    return "Yearly";
  }
};

export const combineYearlyRevenueAndExpenses = (revenueData: any, expensesData: any) => {
  let combinedData = [];

  for (let revenue of revenueData) {
    let expense = expensesData.find((exp: any) => exp.year === revenue.year);

    combinedData.push({
      year: revenue.year,
      revenue: revenue.totalPrice,
      revenueMonthlyAverage: revenue.monthlyAverage,
      expense: expense ? expense.amount : 0,
      expenseMonthlyAverage: expense ? expense.monthlyAverage : 0,
    });
  }

  for (let expense of expensesData) {
    if (!combinedData.find(data => data.year === expense.year)) {
      combinedData.push({
        year: expense.year,
        revenue: 0,
        revenueMonthlyAverage: 0,
        expense: expense.amount,
        expenseMonthlyAverage: expense.monthlyAverage,
      });
    }
  }

  combinedData.sort((a, b) => a.year - b.year);

  return combinedData;
};

export const combineMonthlyRevenueAndExpenses = (revenueData: any, expensesData: any) => {
  let combinedData = [];

  for (let revenue of revenueData) {
    let expense = expensesData.find((exp: any) => exp.month === revenue.month);

    combinedData.push({
      month: revenue.month,
      revenue: revenue.totalPrice,
      revenueDailyAverage: revenue.dailyAverage,
      expense: expense ? expense.amount : 0,
      expenseDailyAverage: expense ? expense.dailyAverage : 0,
    });
  }

  for (let expense of expensesData) {
    if (!combinedData.find(data => data.month === expense.month)) {
      combinedData.push({
        month: expense.month,
        revenue: 0,
        revenueDailyAverage: 0,
        expense: expense.amount,
        expenseDailyAverage: expense.dailyAverage,
      });
    }
  }

  combinedData.sort((a, b) => a.month - b.month);

  return combinedData;
};

export const combineDailyRevenueAndExpenses = (revenueData: any, expensesData: any) => {
  let combinedData = [];

  for (let revenue of revenueData) {
    let expense = expensesData.find(
      (exp: any) => new Date(exp.date).toDateString() === new Date(revenue.date).toDateString()
    );

    combinedData.push({
      date: revenue.date,
      revenue: revenue.totalPrice,
      revenueHourlyAverage: revenue.hourlyAverage,
      expense: expense ? expense.amount : 0,
      expenseHourlyAverage: expense ? expense.hourlyAverage : 0,
    });
  }

  for (let expense of expensesData) {
    if (!combinedData.find(data => new Date(data.date).toDateString() === new Date(expense.date).toDateString())) {
      combinedData.push({
        date: expense.date,
        revenue: 0,
        revenueHourlyAverage: 0,
        expense: expense.amount,
        expenseHourlyAverage: expense.hourlyAverage,
      });
    }
  }

  combinedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // This sorts by date

  return combinedData;
};

export const conditionalColor = (value1: number, value2: number): string => {
  return value1 - value2 < 0 ? "red" : value1 - value2 > 0 ? "green" : "black";
};
