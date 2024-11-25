/* eslint-disable max-lines-per-function */
import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useDispatch } from 'react-redux';
import { selectAllRows, toggleSort } from '../reducers/glTableActions';
import useTableState from '../useTableState';

const GLTableHeader = ({
  namespace,
  namespaceScope,
  enableRowSelect,
  rowCount,
  uniqueKey,
  enableDnd,
  determineDisableRow,
}) => {
  const dispatch = useDispatch();

  const individualTableState = useTableState(namespace, namespaceScope);

  const { columnDefs, sorting, selectedRows } = individualTableState;

  const orderBy = sorting[0];
  const order = sorting[1];

  const onSort = index => {
    if (index === orderBy) {
      dispatch(toggleSort(namespace, index, order === 'asc' ? 'desc' : 'asc'));
    } else {
      dispatch(toggleSort(namespace, index, 'asc'));
    }
  };

  const determineTitle = title => {
    return typeof title === 'function' ? title() : title;
  };

  const visibleColumns = columnDefs.filter(column => !column.hidden);

  return (
    <TableHead
      data-test="table-head"
      style={{
        boxShadow:
          '0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.2)',
      }}
    >
      <TableRow>
        {enableRowSelect && (
          <TableCell
            style={{ height: '56px', backgroundColor: '#ebebeb' }}
            padding={enableRowSelect ? 'checkbox' : 'default'}
            data-test={`${namespace}-checkbox-all`}
          >
            <Checkbox
              id="tableSelectAll"
              data-test="tableSelectAll"
              indeterminate={selectedRows.length > 0 && selectedRows.length < rowCount}
              checked={rowCount > 0 && selectedRows.length === rowCount}
              onClick={() => dispatch(selectAllRows(namespace, uniqueKey, determineDisableRow))}
              inputProps={{ 'aria-label': 'select all' }}
            />
          </TableCell>
        )}
        {columnDefs.map((column, idx) => {
          const isLastColumn = idx === visibleColumns.length - 1;
          return column.nonSortable ? (
            <TableCell
              variant="head"
              key={column.title}
              align={column.align}
              style={{
                height: '56px',
                display: column.hidden ? 'none' : 'table-cell',
                backgroundColor: '#ebebeb',
                minWidth: column.minWidth,
                maxWidth: column.maxWidth,
                width: column.width,
              }}
              padding={column.disablePadding ? 'none' : 'normal'}
              colSpan={enableDnd && isLastColumn ? 2 : column.colSpan}
            >
              {column?.headerColumnAction ? column?.headerColumnAction() : determineTitle(column.title)}
            </TableCell>
          ) : (
            <TableCell
              variant="head"
              key={column.title}
              align={column.align}
              style={{
                display: column.hidden ? 'none' : 'table-cell',
                height: '56px',
                backgroundColor: '#ebebeb',
                minWidth: column.minWidth,
                maxWidth: column.maxWidth,
                width: column.width,
              }}
              padding={column.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === idx ? order : false}
              colSpan={enableDnd && isLastColumn ? 2 : column.colSpan}
            >
              <TableSortLabel
                id={`tableHeaderColumn-${idx + 1}`}
                data-test={`tableHeaderColumn-${idx + 1}`}
                active={orderBy === idx}
                direction={orderBy === idx ? order : 'desc'}
                onClick={() => onSort(idx)}
              >
                <div style={{ paddingLeft: column.align === 'center' ? '15px' : '0px' }}>
                  {column?.headerColumnAction ? column?.headerColumnAction() : determineTitle(column.title)}
                </div>
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

GLTableHeader.defaultProps = {
  namespaceScope: null,
  enableRowSelect: false,
  rowCount: 0,
  uniqueKey: '',
  enableDnd: false,
  determineDisableRow: () => false,
};

GLTableHeader.propTypes = {
  namespace: PropTypes.string.isRequired,
  namespaceScope: PropTypes.string,
  enableRowSelect: PropTypes.bool,
  rowCount: PropTypes.number,
  uniqueKey: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  enableDnd: PropTypes.bool,
  determineDisableRow: PropTypes.func,
};

export default GLTableHeader;
