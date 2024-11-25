/* eslint-disable jest/no-disabled-tests */
import React from 'react';
import userEvent from '@testing-library/user-event';
import { tagKeyMatchFull } from 'helpers/validationHelpers';
import { screen, within, render, waitFor } from '../../../../test_utils/renderRedux';
import GLTable from '../GLTable';
import { initialState } from '../__mocks__/mockState';
import glTableReducer from '../reducers/glTableReducer';
import * as JestHelpers from 'test_utils/jestHelpers';

const renderGLTable = state => {
  const reducers = {
    glTable: glTableReducer('glTable'),
  };
  const { glTable } = state;

  const { store } = render(<GLTable {...glTable} />, { ...state }, reducers);

  return { store, state };
};

// eslint-disable-next-line max-lines-per-function
describe('<GLTable/>', () => {
  // eslint-disable-next-line max-lines-per-function
  describe('<GLTable/>, basic table functionality', () => {
    test('it render table', () => {
      renderGLTable(initialState);
      expect(screen.getByTestId(/table-head/i)).toBeInTheDocument();
    });
    test('it shows 10 rows upon landing', () => {
      renderGLTable(initialState);
      expect(screen.queryAllByTestId(/glTable-row-group/i).length).toEqual(10);
    });
    test('it shows tag values when tag key is clicked', async () => {
      renderGLTable(initialState);

      await userEvent.click(screen.getByText('archive56401'));
      expect(screen.getByText('archive56401-1')).toBeInTheDocument();
      expect(screen.getByText('archive56401-2')).toBeInTheDocument();
    });
    test('it shows tag values when expand click is clicked', async () => {
      renderGLTable(initialState);

      await userEvent.click(screen.getByTestId('glTable-expand-row-alesley'));
      await waitFor(() => {
        expect(screen.getByText('alesleyvalue')).toBeInTheDocument();
      });
    });

    test('it shows that filter menus can open', () => {
      const newProps = {
        ...initialState,
        glTable: { ...initialState.glTable, menuOpen: true, menuSelection: 'locations' },
      };
      renderGLTable(newProps);
      expect(screen.getByTestId(/matrix-sub-menu-input/i)).toBeInTheDocument();
    });
    test('it shows that filtering works', async () => {
      const newProps = {
        ...initialState,
        glTable: { ...initialState.glTable, menuOpen: true, menuSelection: 'locations' },
      };
      renderGLTable(newProps);

      await userEvent.click(screen.getByText('Rome'));
      expect(screen.queryAllByTestId(/glTable-row-group/i).length).toEqual(3);
    });
    test('it shows displays chip when filter is selected and shows filter dropdown when chip is clicked', async () => {
      renderGLTable(initialState);
      JestHelpers.clickButtonByTestId('filter-button');
      // Click on the Locations filter group
      await userEvent.click(screen.getByText('Locations (18)'));

      // Click on the ACSC filter
      await userEvent.click(screen.getByText('ACSC'));
      await waitFor(() => {
        expect(within(screen.getByTestId('filter-chips')).getByText('ACSC')).toBeInTheDocument();
      });
      // Click on the chip
      await userEvent.click(within(screen.getByTestId('filter-chips')).getByText('ACSC'));
      // Check if the filter dropdown is open
      await waitFor(() => {
        expect(within(screen.getByTestId('matrix-main-menu')).getByText('Locations (18)')).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(within(screen.getByTestId('matrix-sub-menu')).getByText('ACSC')).toBeInTheDocument();
      });
    });
    test('it toggles filter on and off', async () => {
      renderGLTable(initialState);
      JestHelpers.clickButtonByTestId('filter-button');
      // Click on the Locations filter group
      await userEvent.click(screen.getByText('Locations (18)'));

      // Click on the ACSC filter to activate
      await userEvent.click(screen.getByText('ACSC'));
      await waitFor(() => {
        expect(within(screen.getByTestId('filter-chips')).getByText('ACSC')).toBeInTheDocument();
      });
      // Click on ACSC filter to deactivate
      await userEvent.click(within(screen.getByTestId('matrix-sub-menu')).getByText('ACSC'));

      await waitFor(() => {
        expect(screen.queryByTestId('filter-chips')).not.toBeInTheDocument();
      });
    });
    test('it deletes chip when clicking on close icon', async () => {
      renderGLTable(initialState);
      JestHelpers.clickButtonByTestId('filter-button');

      await userEvent.click(screen.getByText('Locations (18)'));

      await userEvent.click(screen.getByText('ACSC'));
      await userEvent.click(screen.getByTestId('delete-chip-locations'));
      await waitFor(() => {
        expect(screen.queryByTestId('filter-chips')).not.toBeInTheDocument();
      });
    });
    test('it shows that filtering search works', async () => {
      const newProps = {
        ...initialState,
        glTable: { ...initialState.glTable, menuOpen: true, menuSelection: 'locations' },
      };
      renderGLTable(newProps);

      await userEvent.type(
        within(screen.queryByTestId('gl-table-sub-menu-search-input')).queryByTestId('mui-text-field-container'),
        'Rome'
      );

      expect(within(screen.queryByTestId('matrix-sub-menu')).queryAllByTestId('menu-item').length).toEqual(1);
    });
    test('it shows that search works', async () => {
      renderGLTable(initialState);

      // Simulate typing 'zztop' into the search field
      const allSearchFields = screen.getAllByTestId('mui-text-field-container');
      const searchField = allSearchFields.find(field => field.tagName === 'INPUT');

      await userEvent.type(searchField, 'zztop');
      expect(screen.queryAllByTestId(/glTable-row-group/i).length).toEqual(1);
    });
    test('it shows that search restricts spaces and special characters', async () => {
      const newProps = {
        ...initialState,
        glTable: {
          ...initialState.glTable,
          searchPlaceholder: 'Search by Tag Name',
          restrictSearchChars: e => {
            if (!tagKeyMatchFull(e.key)) {
              e.preventDefault();
              return false;
            }
            return e;
          },
        },
      };
      renderGLTable(newProps);
      const inputEl = screen.queryByPlaceholderText('Search by Tag Name');
      await userEvent.type(inputEl, ' ');
      await userEvent.type(inputEl, 'x');
      await userEvent.type(inputEl, '$');
      expect(inputEl.value).toEqual('x');
    });
    test('it toggles sort on first column on group header', async () => {
      renderGLTable(initialState);

      await userEvent.click(screen.queryByTestId(/tableHeaderColumn-1/i));
      expect(within(screen.getAllByTestId(/glTable-row-group/i)[0]).getByText('zztop')).toBeInTheDocument();
      await userEvent.click(screen.queryByTestId(/tableHeaderColumn-1/i));
      expect(within(screen.getAllByTestId(/glTable-row-group/i)[0]).getByText('alesley')).toBeInTheDocument();
    });
    test('it toggles sort on first column on header', async () => {
      renderGLTable({
        ...initialState,
        glTable: { ...initialState.glTable, enableDropdownRow: false },
      });
      await userEvent.click(screen.queryByTestId(/tableHeaderColumn-1/i));
      expect(within(screen.getAllByTestId(/glTable-row/i)[0]).getByText('zztop')).toBeInTheDocument();
      await userEvent.click(screen.queryByTestId(/tableHeaderColumn-1/i));
      expect(within(screen.getAllByTestId(/glTable-row/i)[0]).getByText('alesley')).toBeInTheDocument();
    });

    test('it selects and deselects all group rows', async () => {
      const { store } = renderGLTable({
        ...initialState,
        glTable: {
          ...initialState.glTable,
          enableDropdownRow: true,
          enableRowSelect: true,
        },
      });

      // Click the select all checkbox
      await userEvent.click(screen.queryByTestId('tableSelectAll'));

      // Check if all rows are selected
      const selectedRows = store.getState().glTable.selectedRows;
      const rowElements = screen.getAllByTestId(/glTable-row/i);
      expect(selectedRows.length).toBe(rowElements.length);

      // Click the select all checkbox again
      await userEvent.click(screen.queryByTestId('tableSelectAll'));

      // Check if all rows are deselected
      const selectedRowsAfterDeselect = store.getState().glTable.selectedRows;
      expect(selectedRowsAfterDeselect.length).toBe(0);
    });

    // NOTE: This test is meant to ensure determineDisableRow and the selection fix for GLTableHeader
    // are not causing any changes to how GLTableHeaderGroup and GLTableRowGroup work.
    // The issue still persists and should be fixed once the scope is well defined
    // This test can be removed when fix for selection of disabled row is added to the group row as well.
    //
    test('it does not select and deselect only enabled group rows', async () => {
      const selectedRowTagKeys = initialState.glTable.rows.slice(0, 2).map(row => row.tag_key);
      const determineDisableRow = jest.fn((row, existingTagKeys = selectedRowTagKeys) =>
        existingTagKeys.includes(row.tag_key)
      );

      const { store } = renderGLTable({
        ...initialState,
        glTable: {
          ...initialState.glTable,
          enableDropdownRow: true,
          enableRowSelect: true,
          determineDisableRow,
        },
      });

      // Click the select all checkbox
      await userEvent.click(screen.queryByTestId('tableSelectAll'));

      // Check if only enabled rows are selected
      const selectedRows = store.getState().glTable.selectedRows;
      const rowElements = screen.getAllByTestId(/glTable-row-group/i);
      const enabledRows = store.getState().glTable.visibleRows.filter(row => !determineDisableRow(row));

      expect(selectedRows.length).toBe(rowElements.length);
      expect(selectedRows.length).not.toBe(enabledRows.length);

      // Click the select all checkbox again
      await userEvent.click(screen.queryByTestId('tableSelectAll'));

      // Check if all rows are deselected
      const selectedRowsAfterDeselect = store.getState().glTable.selectedRows;
      expect(selectedRowsAfterDeselect.length).toBe(0);
    });

    test('it selects and deselects all rows', async () => {
      const { store } = renderGLTable({
        ...initialState,
        glTable: { ...initialState.glTable, enableDropdownRow: false, enableRowSelect: true },
      });

      // Click the select all checkbox
      await userEvent.click(screen.queryByTestId('tableSelectAll'));

      // Check if all rows are selected
      const selectedRows = store.getState().glTable.selectedRows;
      const rowElements = screen.getAllByTestId(/glTable-row/i);
      expect(selectedRows.length).toBe(rowElements.length);

      // Click the select all checkbox again
      await userEvent.click(screen.queryByTestId('tableSelectAll'));

      // Check if all rows are deselected
      const selectedRowsAfterDeselect = store.getState().glTable.selectedRows;
      expect(selectedRowsAfterDeselect.length).toBe(0);
    });

    test('it selects and deselects only enabled rows', async () => {
      // Get tag_key values from first two rows to be set as disabled
      const selectedRowTagKeys = initialState.glTable.rows.slice(0, 2).map(row => row.tag_key);
      const determineDisableRow = jest.fn((row, existingTagKeys = selectedRowTagKeys) =>
        existingTagKeys.includes(row.tag_key)
      );

      const { store } = renderGLTable({
        ...initialState,
        glTable: {
          ...initialState.glTable,
          enableDropdownRow: false,
          enableRowSelect: true,
          determineDisableRow,
        },
      });

      // Click the select all checkbox
      await userEvent.click(screen.queryByTestId('tableSelectAll'));

      // Check if only enabled rows are selected
      const selectedRows = store.getState().glTable.selectedRows;
      const rowElements = screen.getAllByTestId(/glTable-row/i);

      // Filter out disabled rows using the 'disabled' attribute
      const enabledRowElements = rowElements.filter(
        row => !row.hasAttribute('disabled') && row.getAttribute('aria-disabled') !== 'true'
      );

      expect(selectedRows.length).toBe(enabledRowElements.length);

      // Click the select all checkbox again
      await userEvent.click(screen.queryByTestId('tableSelectAll'));

      // Check if all rows are deselected
      const selectedRowsAfterDeselect = store.getState().glTable.selectedRows;
      expect(selectedRowsAfterDeselect.length).toBe(0);
    });

    test('it expands and collapses all rows', async () => {
      const { store } = renderGLTable(initialState);

      // Click the expand all button
      await userEvent.click(screen.queryByTestId('expandAllButton'));

      // Check if all rows are expanded
      const expandedRows = store.getState().glTable.expandedRows;
      const rowElements = screen.getAllByTestId(/glTable-row/i);
      expect(expandedRows.length).toBe(rowElements.length);

      // Click the expand all button again
      await userEvent.click(screen.queryByTestId('expandAllButton'));

      // Check if all rows are collapsed
      const expandedRowsAfterCollapse = store.getState().glTable.expandedRows;
      expect(expandedRowsAfterCollapse.length).toBe(0);
    });
  });

  // eslint-disable-next-line max-lines-per-function
  describe('<GLTable/>, pagination functionality', () => {
    test('pagination component renders', () => {
      renderGLTable(initialState);
      expect(screen.getByTestId(/pagination-component-top/i)).toBeInTheDocument();
      expect(screen.getByTestId(/pagination-component-bottom/i)).toBeInTheDocument();
    });

    test('previous and next button updates the page number', async () => {
      renderGLTable(initialState);

      const nextButton = screen.getByTestId(/next-button-top/i);
      await userEvent.click(nextButton);

      let pageInputs = screen.getAllByRole('textbox', { name: /select page/i });
      pageInputs.forEach(input => expect(input.value).toBe('2'));

      const prevButton = screen.getByTestId(/previous-button-top/i);
      await userEvent.click(prevButton);

      pageInputs = screen.getAllByRole('textbox', { name: /select page/i });
      pageInputs.forEach(input => expect(input.value).toBe('1'));
    });

    test('first and last page buttons work', async () => {
      renderGLTable(initialState);

      const lastPageButton = screen.getByLabelText(/last page top/i);
      await userEvent.click(lastPageButton);

      let pageInputs = screen.getAllByRole('textbox', { name: /select page/i });
      pageInputs.forEach(input => expect(input.value).toBe('6')); // Assuming 10 is the last page
      const firstPageButton = screen.getByLabelText(/first page top/i);
      await userEvent.click(firstPageButton);

      pageInputs = screen.getAllByRole('textbox', { name: /select page/i });
      pageInputs.forEach(input => expect(input.value).toBe('1'));
    });

    test('rows per page dropdown works', async () => {
      renderGLTable(initialState);

      // Click the dropdown to open it
      const rowsPerPageDropdown = screen.getByLabelText(/rows per page top/i);
      await userEvent.click(rowsPerPageDropdown);

      // Select the option
      const option = screen.getByText('25');
      await userEvent.click(option);

      // Verify the value has been selected
      expect(rowsPerPageDropdown.value).toBe('25');
    });

    test('Does not render "Previous" button when on first page', () => {
      // initial page is 0, which means we are on the first page
      renderGLTable(initialState);

      // previous button should be disabled
      const prevButtons = screen.getAllByLabelText(/previous page/i);

      prevButtons.forEach(prevButton => {
        expect(prevButton).toBeDisabled();
      });
    });

    test('Does not render "Next" button when on last page', async () => {
      // here we're assuming the last page is page 2
      // update initialState accordingly
      renderGLTable(initialState);
      const lastPageButton = screen.getByLabelText(/last page top/i);
      await userEvent.click(lastPageButton);

      // next button should be disabled
      const nextButtons = screen.getAllByLabelText(/next page/i);
      nextButtons.forEach(nextButton => {
        expect(nextButton).toBeDisabled();
      });
    });

    test('displays rows info and updates correctly when changing pages or changing number of rows per page', async () => {
      renderGLTable(initialState);

      const rowsInfoElements = await screen.findAllByText(content => /\d+-\d+ of \d+/.test(content));

      // Since there are multiple matches, let's assume you want the first one
      const rowsInfo = rowsInfoElements[0];

      expect(rowsInfo).toHaveTextContent('1-10 of 57');

      const pageInput = screen.getByLabelText(/select page top/i);
      await userEvent.clear(pageInput);
      const nextPageButton = screen.queryByTestId(/next-button-top/i);
      await userEvent.click(nextPageButton);
      expect(rowsInfo).toHaveTextContent('11-20 of 57');

      const rowsPerPageDropdown = screen.getByLabelText(/rows per page top/i);
      await userEvent.click(rowsPerPageDropdown);
      const option = screen.getByText('25');
      await userEvent.click(option);
      expect(rowsInfo).toHaveTextContent('1-25 of 57');
    });

    test('it disables the row when determineDisableRow returns true', () => {
      const determineDisableRow = jest.fn(row => row.id === 1);
      const rowProps = { id: 1 };

      renderGLTable({
        ...initialState,
        glTable: {
          ...initialState.glTable,
          enableDropdownRow: false,
          rows: [rowProps],
          columnDefs: [{ display: 'id', title: 'ID' }],
          determineDisableRow,
        },
      });

      const row = screen.getByTestId('glTable-row-1');
      const cell = within(row).getByTestId('glTable-cell');
      expect(cell).toHaveStyle({ color: 'gray' });

      expect(determineDisableRow).toHaveBeenCalledWith(rowProps);
    });

    test('it selects the row when determineSelectedRow returns true', () => {
      const determineSelectedRow = jest.fn(row => row.id === 1);
      const rowProps = { id: 1 };

      renderGLTable({
        ...initialState,
        glTable: {
          ...initialState.glTable,
          enableDropdownRow: false,
          rows: [rowProps],
          columnDefs: [{ display: 'id', title: 'ID' }],
          determineSelectedRow,
        },
      });

      const row = screen.getByTestId('glTable-row-1');
      expect(row).toBeChecked();
      expect(determineSelectedRow).toHaveBeenCalledWith(rowProps);
    });
  });
});
