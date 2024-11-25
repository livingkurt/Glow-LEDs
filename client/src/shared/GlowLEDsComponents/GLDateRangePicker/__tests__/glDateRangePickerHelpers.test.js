import {
  getThisMonthRange,
  getThisWeekRange,
  getTodayRange,
  determineDataDateRange,
  isDateRangeValid,
} from '../glDateRangePickerHelpers';
import dayjs from 'dayjs';

describe('getThisMonthRange', () => {
  it('should return an array', () => {
    const result = getThisMonthRange();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return an array of length 2', () => {
    const result = getThisMonthRange();
    expect(result.length).toBe(2);
  });

  it('should return the correct start and end dates of the current month', () => {
    const result = getThisMonthRange();
    const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
    const endOfMonth = dayjs().endOf('month').format('YYYY-MM-DD');
    expect(result).toEqual([startOfMonth, endOfMonth]);
  });
});

describe('getThisWeekRange', () => {
  it('should return an array', () => {
    const result = getThisWeekRange();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return an array of length 2', () => {
    const result = getThisWeekRange();
    expect(result.length).toBe(2);
  });

  it('should return the correct start and end dates of the current week', () => {
    const result = getThisWeekRange();
    const startOfWeek = dayjs().startOf('isoWeek').format('YYYY-MM-DD');
    const endOfWeek = dayjs().endOf('isoWeek').format('YYYY-MM-DD');
    expect(result).toEqual([startOfWeek, endOfWeek]);
  });
});

describe('getTodayRange', () => {
  it('should return an array', () => {
    const result = getTodayRange();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return an array of length 2', () => {
    const result = getTodayRange();
    expect(result.length).toBe(2);
  });

  it('should return the correct start and end dates of the current day', () => {
    const result = getTodayRange();
    const today = dayjs().format('YYYY-MM-DD');
    expect(result).toEqual([today, today]);
  });
});

describe('determineDataDateRange', () => {
  it('should return [null, null] for an empty array', () => {
    const result = determineDataDateRange([]);
    expect(result).toEqual([null, null]);
  });

  it('should return the correct date range for a non-empty array', () => {
    const result = determineDataDateRange(['2022-01-01', '2022-01-02', '2022-01-03']);
    expect(result).toEqual(['2022-01-01', '2022-01-03']);
  });
});

describe('isDateRangeValid', () => {
  it('should return false if no date in the data falls within the specified range', () => {
    const data = ['2022-01-01', '2022-01-02', '2022-01-03'];
    const start = '2022-01-04';
    const end = '2022-01-05';
    const result = isDateRangeValid(data, start, end);
    expect(result).toBe(false);
  });

  it('should return true if any date in the data falls within the specified range', () => {
    const data = ['2022-01-01', '2022-01-02', '2022-01-03'];
    const start = '2022-01-02';
    const end = '2022-01-04';
    const result = isDateRangeValid(data, start, end);
    expect(result).toBe(true);
  });

  it('should return true if any date in the data is the same as the start date', () => {
    const data = ['2022-01-01', '2022-01-02', '2022-01-03'];
    const start = '2022-01-02';
    const end = '2022-01-02';
    const result = isDateRangeValid(data, start, end);
    expect(result).toBe(true);
  });

  it('should return true if any date in the data is the same as the end date', () => {
    const data = ['2022-01-01', '2022-01-02', '2022-01-03'];
    const start = '2022-01-03';
    const end = '2022-01-03';
    const result = isDateRangeValid(data, start, end);
    expect(result).toBe(true);
  });

  it('should handle UTC dates correctly', () => {
    const data = ['2022-01-01T00:00:00.000Z', '2022-01-02T00:00:00.000Z', '2022-01-03T00:00:00.000Z'];
    const start = '2022-01-02';
    const end = '2022-01-02';
    const result = isDateRangeValid(data, start, end);
    expect(result).toBe(true);
  });
});
