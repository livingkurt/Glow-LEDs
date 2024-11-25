/* eslint-disable jest/no-disabled-tests */
import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, render, waitFor } from '../../../../test_utils/renderRedux';
import GLTable from '../GLTable';
import { initialState } from '../__mocks__/mockState';
import glTableReducer from '../reducers/glTableReducer';
import { useDispatch } from 'react-redux';

import { closeSlider } from '../reducers/glTableActions';

const renderGLTable = state => {
  const reducers = {
    glTable: glTableReducer('glTable'),
  };
  const { glTable } = state;

  const { store } = render(<GLTable {...glTable} />, { ...state }, reducers);

  return { store, state };
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
})); // Import the closeSlider function

jest.mock('../reducers/glTableActions'); // Mock the closeSlider function

describe('<GLTable/>, slider functionality', () => {
  test('it closes the slider when the close button is clicked', async () => {
    const closeSliderMock = jest.fn();

    // Mock the useDispatch hook to return the mock function
    useDispatch.mockReturnValue(closeSliderMock);

    // Mock the closeSlider function to return the mock function
    closeSlider.mockImplementation(() => closeSliderMock);

    const newProps = {
      ...initialState,
      glTable: {
        ...initialState.glTable,
        enableDropdownRow: false,
        sliderParamName: { display: 'Name', value: 'name' },
        sliderContent: <div>{'Slider Content'}</div>,
        slider: { isOpen: true, row: {} },
      },
    };

    renderGLTable(newProps);

    await waitFor(() => {
      expect(screen.getByText('Slider Content')).toBeInTheDocument();
    });

    // Click the close button
    await userEvent.click(screen.getByTestId('close-slider-button'));

    // Check if the closeSlider action was dispatched
    expect(closeSlider).toHaveBeenCalledWith(newProps.glTable.namespace, newProps.glTable.sliderParamName);
  });
});
