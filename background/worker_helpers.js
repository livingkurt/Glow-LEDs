const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  domain: () => {
    if (process.env.NODE_ENV === "development") {
      return "http://localhost:3000";
    } else {
      return "https://www.glow-leds.com";
    }
  },
  get_date_range: () => {
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

    // const start_date = startDate.toISOString().split("T")[0] + "T00:00:00";
    // const end_date = endDate.toISOString().split("T")[0] + "T23:59:59";
    // return { start_date, end_date };
    // Format the start and end dates as strings
    const start_date = startDate.toISOString().split("T")[0];
    const end_date = endDate.toISOString().split("T")[0];
    return { start_date, end_date };
  }
};
