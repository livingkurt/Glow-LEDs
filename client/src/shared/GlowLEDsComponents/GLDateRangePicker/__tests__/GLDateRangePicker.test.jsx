import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CODateRangePicker from '../CODateRangePicker';
import * as JestHelpers from 'test_utils/jestHelpers';
import { getThisMonthRange, getThisWeekRange, getTodayRange } from '../coDateRangePickerHelpers';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

describe('CODateRangePicker', () => {
  let mockOnChange;

  beforeEach(() => {
    mockOnChange = jest.fn();
  });

  it('should call onChange with correct values when start date changes', () => {
    render(<CODateRangePicker onChange={mockOnChange} startDate="2022-01-01" endDate="2022-01-31" />);
    JestHelpers.inputTextFieldByTestId('start-date', '2022-01-02');

    expect(mockOnChange).toHaveBeenCalledWith({ date: ['2022-01-02', '2022-01-31'], range: null });
  });

  it('should call onChange with correct values when end date changes', () => {
    render(<CODateRangePicker onChange={mockOnChange} startDate="2022-01-01" endDate="2022-01-31" />);

    JestHelpers.inputTextFieldByTestId('end-date', '2022-01-30');

    expect(mockOnChange).toHaveBeenCalledWith({ date: ['2022-01-01', '2022-01-30'], range: null });
  });

  it('should call onChange with correct values when range changes to today', () => {
    const [start, end] = getTodayRange();
    const today = dayjs().format('YYYY-MM-DD');
    render(<CODateRangePicker onChange={mockOnChange} startDate="2022-01-01" endDate="2022-01-31" data={[today]} />);

    fireEvent.click(screen.getByText('Today'));

    expect(mockOnChange).toHaveBeenCalledWith({ date: [start, end], range: 'today' });
  });

  it('should call onChange with correct values when range changes to this week', () => {
    const [start, end] = getThisWeekRange();
    const thisWeek = dayjs().format('YYYY-MM-DD');
    render(<CODateRangePicker onChange={mockOnChange} startDate="2022-01-01" endDate="2022-01-31" data={[thisWeek]} />);

    fireEvent.click(screen.getByText('This Week'));

    expect(mockOnChange).toHaveBeenCalledWith({ date: [start, end], range: 'thisWeek' });
  });

  it('should call onChange with correct values when range changes to this month', () => {
    const [start, end] = getThisMonthRange();
    const thisMonth = dayjs().format('YYYY-MM-DD');
    render(
      <CODateRangePicker onChange={mockOnChange} startDate="2022-01-01" endDate="2022-01-31" data={[thisMonth]} />
    );

    fireEvent.click(screen.getByText('This Month'));

    expect(mockOnChange).toHaveBeenCalledWith({ date: [start, end], range: 'thisMonth' });
  });

  it('should call onChange with empty values when range changes to null', () => {
    render(<CODateRangePicker onChange={mockOnChange} startDate="2022-01-01" endDate="2022-01-31" dateRange="today" />);

    fireEvent.click(screen.getByText('Today')); // First click to select
    fireEvent.click(screen.getByText('Today')); // Second click to deselect

    expect(mockOnChange).toHaveBeenCalledWith({ date: [], range: null });
  });
});
