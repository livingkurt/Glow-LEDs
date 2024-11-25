import React from 'react';
import * as JestHelpers from 'test_utils/jestHelpers';
import { fireEvent, screen } from '@testing-library/react';
import GLTableHeader from '../GLTableHeader';

describe('GLTableHeader', () => {
  const initialState = {
    testNamespace: {
      selectedRows: [],
      rows: [],
      sorting: [0, 'asc'],
      columnDefs: [{ title: 'ID', display: 'ID' }],
    },
  };
  const props = {
    namespace: 'testNamespace',
    enableRowSelect: true,
    rowCount: 10,
    uniqueKey: 'id',
    enableDnd: false,
    determineDisableRow: () => false,
  };

  it('dispatches SELECT_ALL_ROWS when Select All checkbox is clicked', () => {
    const { store } = JestHelpers.renderMockRedux(<GLTableHeader {...props} />, initialState);

    fireEvent.click(screen.getAllByTestId('tableSelectAll')[0]);
    const actions = store.getActions();
    expect(actions[0].type).toBe('testNamespace/SELECT_ALL_ROWS');
  });

  it('marks all rows as enabled when Select All is clicked when determineDisableRow is not passed', () => {
    const propsWithoutDisableRow = {
      namespace: 'testNamespace',
      enableRowSelect: true,
      rowCount: 10,
      uniqueKey: 'id',
      enableDnd: false,
    };
    const { store } = JestHelpers.renderMockRedux(<GLTableHeader {...propsWithoutDisableRow} />, initialState);

    fireEvent.click(screen.getAllByTestId('tableSelectAll')[0]);
    const actions = store.getActions();
    expect(actions[0].payload.determineDisableRow()).toBe(false);
  });
});
