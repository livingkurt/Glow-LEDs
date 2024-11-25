import dayjs from 'dayjs';

import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';

dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(isBetween);
dayjs.extend(utc);

export const getTodayRange = () => {
  const today = dayjs().format('YYYY-MM-DD');
  return [today, today];
};

export const getThisWeekRange = () => {
  const startOfWeek = dayjs().startOf('isoWeek').format('YYYY-MM-DD');
  const endOfWeek = dayjs().endOf('isoWeek').format('YYYY-MM-DD');
  return [startOfWeek, endOfWeek];
};

export const getThisMonthRange = () => {
  const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
  const endOfMonth = dayjs().endOf('month').format('YYYY-MM-DD');
  return [startOfMonth, endOfMonth];
};

export const determineDataDateRange = items => {
  if (items.length === 0) {
    return [null, null];
  }

  const dates = items.map(item => new Date(item));
  const oldestDate = new Date(Math.min(...dates));
  const newestDate = new Date(Math.max(...dates));

  return [oldestDate.toISOString().split('T')[0], newestDate.toISOString().split('T')[0]];
};

export const isDateRangeValid = (data, start, end) => {
  // Convert start and end dates to UTC dayjs objects
  const startDate = dayjs.utc(start);
  const endDate = dayjs.utc(end);

  // Check if any date in the data falls within the specified range
  return data.some(date => {
    const utcDate = dayjs.utc(date);
    return (
      utcDate.isSame(startDate, 'day') ||
      utcDate.isSame(endDate, 'day') ||
      utcDate.isBetween(startDate, endDate, 'day', '[]')
    );
  });
};
