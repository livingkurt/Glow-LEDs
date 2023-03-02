export const getMonthStartEndDates = (month: string, year: number) => {
  if (month && year) {
    const monthNumber = new Date(Date.parse(`${month} 1, ${year}`)).getMonth();
    const start_date = new Date(year, monthNumber, 1);
    const end_date = new Date(year, monthNumber + 1, 0);
    return { start_date: start_date.toISOString().substring(0, 10), end_date: end_date.toISOString().substring(0, 10) };
  } else if (year) {
    const start_date = new Date(year, "0", "1");
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
