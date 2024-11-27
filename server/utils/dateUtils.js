import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// Convert a date to UTC
export const toUTC = date => {
  return dayjs(date).utc();
};

// Format a UTC date to local timezone for display
export const formatToLocal = (date, format = "MM/DD/YYYY HH:mm:ss") => {
  return dayjs.utc(date).local().format(format);
};

// Get current UTC date
export const getCurrentUTC = () => {
  return dayjs().utc();
};

// Convert local date to UTC for storage
export const localToUTC = date => {
  return dayjs(date).utc().format();
};

// Format date for display in tables
export const formatTableDate = date => {
  return dayjs.utc(date).local().format("MM/DD/YYYY");
};

// Format date and time for detailed views
export const formatDateTime = date => {
  return dayjs.utc(date).local().format("MM/DD/YYYY HH:mm:ss");
};

// Start of day in UTC
export const startOfDayUTC = date => {
  return dayjs(date).utc().startOf("day");
};

// End of day in UTC
export const endOfDayUTC = date => {
  return dayjs(date).utc().endOf("day");
};

// Check if a date is between two other dates (inclusive)
export const isBetweenDates = (date, startDate, endDate) => {
  return dayjs(date).isBetween(startDate, endDate, "day", "[]");
};
