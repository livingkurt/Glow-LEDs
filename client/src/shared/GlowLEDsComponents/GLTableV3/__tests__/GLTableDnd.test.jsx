import React from 'react';
import { render, waitFor } from '@testing-library/react';
import GLTable from '../GLTable';
import { onDragEnd } from '../glTableDndHelpers';
import { useDispatch } from 'react-redux';
import useTableState from '../useTableState';

let mockOnDragEnd;

jest.mock('@hello-pangea/dnd', () => ({
  // eslint-disable-next-line react/prop-types, no-shadow
  DragDropContext: ({ children, onDragEnd }) => {
    mockOnDragEnd = onDragEnd;
    return <div>{children}</div>;
  },
  Droppable: ({ children }) =>
    children({
      draggableProps: { style: {} },
      innerRef: jest.fn(),
    }),
  Draggable: ({ children, draggableId }) =>
    children({
      draggableProps: { style: {}, 'data-rbd-draggable-id': draggableId },
      dragHandleProps: { 'data-rbd-drag-handle-draggable-id': draggableId },
      innerRef: jest.fn(),
    }),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../glTableDndHelpers', () => ({
  onDragEnd: jest.fn(),
}));

jest.mock('../useTableState', () => jest.fn());

describe('GLTable', () => {
  it('should handle onDragEnd correctly', async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const tableState = {
      search: '',
      filters: {},
      page: 1,
      pageSize: 10,
      sorting: {},
      remote: { latestRemoteVersionTimestamp: 0 },
      columnDefs: [{ title: 'Name', display: 'name' }],
      rows: [
        { id: 1, name: 'Draggable Item 1' },
        { id: 2, name: 'Draggable Item 2' },
      ],
      filteredRows: [
        { id: 1, name: 'Draggable Item 1' },
        { id: 2, name: 'Draggable Item 2' },
      ],
      visibleRows: [
        { id: 1, name: 'Draggable Item 1' },
        { id: 2, name: 'Draggable Item 2' },
      ],
      selectedRows: [],
      menuOpen: false,
      menuSelection: null,
      availableFilters: [],
      filterSearch: '',
      startDate: null,
      endDate: null,
    };
    useTableState.mockReturnValue(tableState);

    const namespace = 'testNamespace';
    const remoteReorderApi = jest.fn();
    const orderAttribute = 'order';
    const tableName = 'Test Table';

    render(
      <GLTable
        tableName={tableName}
        namespace={namespace}
        remoteReorderApi={remoteReorderApi}
        orderAttribute={orderAttribute}
        enableDnd
        rows={tableState.rows}
        columnDefs={tableState.columnDefs}
      />
    );

    // Simulate drag and drop
    mockOnDragEnd({
      source: { index: 0 },
      destination: { index: 1 },
    });

    await waitFor(() => {
      expect(onDragEnd).toHaveBeenCalled();
    });

    expect(onDragEnd).toHaveBeenCalledWith(
      expect.objectContaining({
        result: expect.objectContaining({
          source: { index: 0 },
          destination: { index: 1 },
        }),
        dispatch,
        tableState,
        namespace,
        remoteReorderApi,
        orderAttribute,
      })
    );
  });
});
