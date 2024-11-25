import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDispatch } from 'react-redux';
import { toggleFilter } from '../reducers/glTableActions';
import GLTableFilterDropdown from './GLTableFilterDropdown';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../reducers/glTableActions', () => ({
  toggleFilter: jest.fn(),
}));

describe('GLTableFilterDropdown', () => {
  const mockDispatch = jest.fn();

  const defaultProps = {
    namespace: 'test-namespace',
    menuSelection: 'isActive',
    availableFilters: {
      isActive: ['true', 'false'],
    },
    filters: {
      isActive: [1],
    },
    booleanFilters: {
      isActive: {
        label: 'Active',
      },
    },
    menuOpen: true,
  };

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    toggleFilter.mockReturnValue({ type: 'TOGGLE_FILTER' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch toggleFilter action when Switch is clicked', async () => {
    render(<GLTableFilterDropdown {...defaultProps} />);

    const switchElement = screen.getByRole('checkbox', { name: '' });
    await userEvent.click(switchElement);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(toggleFilter).toHaveBeenCalledWith('test-namespace', {
      row: 'isActive',
      item: 1,
    });
  });

  it('should render boolean filter with correct label', () => {
    render(<GLTableFilterDropdown {...defaultProps} />);

    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('should set switch to checked when filter value is 1', () => {
    render(<GLTableFilterDropdown {...defaultProps} />);

    const switchElement = screen.getByRole('checkbox', { name: '' });
    expect(switchElement).toBeChecked();
  });

  it('should set switch to unchecked when filter value is not 1', () => {
    const props = {
      ...defaultProps,
      filters: {
        isActive: [0],
      },
    };

    render(<GLTableFilterDropdown {...props} />);

    const switchElement = screen.getByRole('checkbox', { name: '' });
    expect(switchElement).not.toBeChecked();
  });

  it('should not render switch when menuSelection is not in booleanFilters', () => {
    const props = {
      ...defaultProps,
      menuSelection: 'status',
      availableFilters: {
        status: ['Active', 'Inactive'],
      },
      booleanFilters: {},
    };

    render(<GLTableFilterDropdown {...props} />);

    const switchContainer = screen.queryByTestId('switch-container');
    expect(switchContainer).not.toBeInTheDocument();
  });
});
