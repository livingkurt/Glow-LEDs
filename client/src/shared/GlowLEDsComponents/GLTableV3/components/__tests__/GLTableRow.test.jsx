import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import GLTableRow from '../GLTableRow';
import * as JestHelpers from 'test_utils/jestHelpers';

jest.mock('../../reducers/glTableActions', () => ({
  toggleSlider: jest.fn().mockReturnValue({ type: 'TOGGLE_SLIDER' }),
  selectRow: jest.fn().mockReturnValue({ type: 'SELECT_ROW' }),
}));

describe('GLTableRow', () => {
  const initialState = {
    testNamespace: {
      selectedRows: [],
      columnDefs: [{ title: 'Name', display: 'name' }],
    },
  };
  const props = {
    row: { id: 1, name: 'Test Row' },
    namespace: 'testNamespace',
    uniqueKey: 'id',
    sliderContent: <div>{'Slider Content'}</div>,
    sliderParamName: 'testParam',
    columnDefs: [{ title: 'Name', display: 'name' }],
    rowProps: () => ({}),
    cellProps: () => ({}),
    provided: { innerRef: jest.fn(), draggableProps: {}, dragHandleProps: {} },
  };

  it('dispatches toggleSlider when sliderContent is provided and a cell is clicked', () => {
    const { store } = JestHelpers.renderMockRedux(<GLTableRow {...props} />, initialState);

    fireEvent.click(screen.getByText('Test Row'));

    const actions = store.getActions();
    expect(actions).toContainEqual({ type: 'TOGGLE_SLIDER' });
  });
});
