import axios from "axios";
import config from "../config";
const baseId = "app1s1rBexc8nLb9s";
const tableIdOrName = "tblsCcVphzBosLDmU";

export const domain = () => {
  if (config.ENVIRONMENT === "production") {
    return "https://www.glow-leds.com";
  } else if (config.ENVIRONMENT === "staging") {
    return "https://glow-leds-dev.herokuapp.com";
  } else {
    return "http://localhost:3000";
  }
};

export const last_month_date_range = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  // Calculate the year and month of the previous month
  let prevYear = currentYear;
  let prevMonth = currentMonth - 1;
  if (prevMonth < 0) {
    prevYear -= 1;
    prevMonth = 11;
  }
  const prevNumDays = new Date(prevYear, prevMonth + 1, 0).getDate();

  const startDate = new Date(prevYear, prevMonth, 1);
  const endDate = new Date(prevYear, prevMonth, prevNumDays);
  const start_date = startDate.toISOString().split("T")[0];
  const end_date = endDate.toISOString().split("T")[0];
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

export const determine_code_tier = (affiliate, code_usage) => {
  if (affiliate.promoter) {
    if (code_usage === 0 || code_usage === 1) {
      return 10;
    } else if (code_usage >= 2 && code_usage <= 5) {
      return 20;
    } else if (code_usage >= 6 && code_usage <= 9) {
      return 25;
    } else if (code_usage >= 10 && code_usage <= 13) {
      return 30;
    } else if (code_usage >= 14 && code_usage <= 17) {
      return 35;
    } else if (code_usage >= 18 && code_usage <= 21) {
      return 40;
    } else if (code_usage >= 22) {
      return 50;
    }
  } else if (affiliate.sponsor) {
    if (code_usage === 0 || code_usage === 1) {
      return 30;
    } else if (code_usage >= 2 && code_usage <= 5) {
      return 35;
    } else if (code_usage >= 6 && code_usage <= 9) {
      return 40;
    } else if (code_usage >= 10 && code_usage <= 14) {
      return 50;
    } else if (code_usage >= 15) {
      return 60;
    } else if (code_usage >= 20) {
      return 75;
    }
  }
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
// export const save_paycheck_to_expenses = async (data) => {
//   try {
//     const response = await axios.post(
//       `https://api.airtable.com/v0/${baseId}/${tableIdOrName}`,
//       {
//         records: [
//           {
//             fields: data
//           }
//         ]
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${config.REACT_APP_AIRTABLE_ACCESS_TOKEN}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );
//    } catch (error) {
//   if (error instanceof Error) {
//     throw new Error(error.message);
//   }
// }
// };
