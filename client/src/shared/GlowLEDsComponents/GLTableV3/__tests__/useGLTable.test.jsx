/* eslint-disable max-lines-per-function */
import { renderHook, act } from '@testing-library/react-hooks';
import { useDispatch } from 'react-redux';
import useGLTable from '../useGLTable';
import useTableState from '../useTableState';
import { fetchTablePage, applyUrlParams, toggleSlider } from '../reducers/glTableActions';

// Mock the dependencies
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../useTableState', () => jest.fn());

jest.mock('../reducers/glTableActions', () => ({
  addRows: jest.fn(),
  fetchTablePage: jest.fn(),
  fetchTableFilters: jest.fn(),
  toggleSlider: jest.fn(),
  applyUrlParams: jest.fn(),
}));

describe('useGLTable', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    useDispatch.mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should dispatch fetchTablePage with debounce when search changes', () => {
    let searchValue = '';

    useTableState.mockImplementation(() => ({
      search: searchValue,
      filters: {},
      page: 1,
      pageSize: 10,
      urlParams: {},
      sorting: {},
      remote: { latestRemoteVersionTimestamp: 0 },
      rows: [],
    }));

    const { rerender } = renderHook(() =>
      useGLTable({
        remoteApi: 'https://api.example.com',
        namespace: 'test',
      })
    );

    const initialFetchTablePageCallCount = fetchTablePage.mock.calls.length + 1;

    searchValue = 'new search';
    rerender();

    expect(fetchTablePage.mock.calls.length).toBe(initialFetchTablePageCallCount);

    jest.advanceTimersByTime(500);
    expect(fetchTablePage.mock.calls.length).toBe(initialFetchTablePageCallCount);

    jest.advanceTimersByTime(501);

    expect(fetchTablePage.mock.calls.length).toBe(initialFetchTablePageCallCount + 1);

    const lastCallArgs = fetchTablePage.mock.calls[fetchTablePage.mock.calls.length - 1];

    expect(lastCallArgs[0]).toBe('test');
    expect(lastCallArgs[1]).toEqual({
      remoteApi: 'https://api.example.com',
      search: 'new search',
      filters: {},
      sorting: {},
      page: 1,
      pageSize: 10,
      urlParams: {},
    });
  });

  it('should handle URL params and open slider', async () => {
    jest.useFakeTimers();

    const sliderParamName = 'testId';
    const mockURLSearchParams = new URLSearchParams('?testId=123');
    Object.defineProperty(window, 'location', {
      value: { search: mockURLSearchParams.toString() },
      writable: true,
    });

    let tableState = {
      search: '',
      filters: {},
      page: 1,
      pageSize: 10,
      urlParams: {},
      sorting: {},
      remote: { latestRemoteVersionTimestamp: 0 },
      rows: [],
    };

    useTableState.mockImplementation(() => tableState);

    const { rerender } = renderHook(() =>
      useGLTable({
        namespace: 'test',
        sliderParamName,
      })
    );

    expect(applyUrlParams).toHaveBeenCalledWith('test', '123');

    // Update the tableState to include rows
    tableState = {
      ...tableState,
      rows: [{ testId: '123', name: 'Test Row' }],
    };

    // Rerender the hook with the updated tableState
    rerender();

    // Advance timers to trigger useEffect
    act(() => {
      jest.runAllTimers();
    });

    // Rerender again to trigger the effect that opens the slider
    rerender();

    // Advance timers again
    act(() => {
      jest.runAllTimers();
    });

    // Check if toggleSlider was called
    expect(toggleSlider).toHaveBeenCalledWith(
      'test',
      expect.objectContaining({
        row: { testId: '123', name: 'Test Row' },
        sliderParamName: 'testId',
        sliderId: '123',
      })
    );

    jest.useRealTimers();
  });

  it('should handle object sliderParamName', () => {
    const sliderParamName = { display: 'displayId', value: 'id' };
    const mockURLSearchParams = new URLSearchParams('?displayId=456');
    Object.defineProperty(window, 'location', {
      value: { search: mockURLSearchParams.toString() },
      writable: true,
    });

    useTableState.mockReturnValue({
      ...useTableState(),
      rows: [{ id: '456', name: 'Test Row' }],
    });

    renderHook(() =>
      useGLTable({
        namespace: 'test',
        sliderParamName,
      })
    );

    expect(applyUrlParams).toHaveBeenCalledWith('test', '456');
    expect(toggleSlider).toHaveBeenCalledWith(
      'test',
      expect.objectContaining({
        row: { id: '456', name: 'Test Row' },
        sliderParamName: { display: 'displayId', value: 'id' },
        sliderId: '456',
      })
    );
  });
  it('should set initialLoadDone to false when popstate event occurs', () => {
    const mockURLSearchParams = new URLSearchParams('?testId=123');
    Object.defineProperty(window, 'location', {
      value: { search: mockURLSearchParams.toString() },
      writable: true,
    });

    const { result } = renderHook(() =>
      useGLTable({
        namespace: 'test',
      })
    );

    // initialLoadDone should be true after initial render
    expect(result.current.initialLoadDone).toBe(false);

    // Simulate initial load being done
    act(() => {
      result.current.setInitialLoadDone(true);
    });

    expect(result.current.initialLoadDone).toBe(true);

    // Simulate popstate event
    act(() => {
      window.dispatchEvent(new Event('popstate'));
    });

    // initialLoadDone should be set back to false
    expect(result.current.initialLoadDone).toBe(false);
  });
});
