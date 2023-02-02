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
    const start_date = startDate.toISOString().split("T")[0];
    const end_date = endDate.toISOString().split("T")[0];
    return { start_date, end_date };
  },
  determine_promoter_code_tier: code_usage => {
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
  },
  determine_sponsor_code_tier: code_usage => {
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
  // determine_promoter_code_tier_2: code_usage => {
  //   const tiers = [10, 20, 25, 30, 35, 40, 50];
  //   return tiers[Math.floor(code_usage / 6)] || 10;
  // },
  // determine_sponsor_code_tier_2: code_usage => {
  //   const tiers = [30, 35, 40, 50, 60, 75];
  //   return tiers[Math.floor(code_usage / 5) - 1] || 30;
  // }
};
