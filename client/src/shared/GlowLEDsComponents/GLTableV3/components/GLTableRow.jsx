/* eslint-disable max-lines-per-function */
import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { isItemSelected, rowCheckboxClicked, rowIdentifier } from '../glTableHelpers';
import { toggleSlider, selectRow } from '../reducers/glTableActions';
import Tooltip from '@mui/material/Tooltip';
import useTableState from '../useTableState';
import DragIndicator from '@mui/icons-material/DragIndicator';
import { Box, IconButton } from '@mui/material';

const GLTableRow = ({
  row,
  namespace,
  namespaceScope,
  snapshot,
  index,
  enableRowSelect,
  tableName,
  uniqueKey,
  enableRowClick,
  onRowClick,
  rowProps,
  cellProps,
  provided,
  enableDnd,
  determineRowColor,
  determineRowFontColor,
  disableDrag,
  determineDisableRow,
  determineSelectedRow,
  sliderContent,
  sliderParamName,
}) => {
  const dispatch = useDispatch();

  const individualTableState = useTableState(namespace, namespaceScope);

  const { selectedRows, columnDefs } = individualTableState;

  const rowIdentifierKey = rowIdentifier(row, uniqueKey);

  const labelId = `${tableName && tableName.toLowerCase()}-${index}`;

  const itemSelected = enableRowSelect && isItemSelected(rowIdentifierKey, selectedRows);

  const onCellClick = e => {
    if (enableRowClick) {
      if (enableRowSelect && rowCheckboxClicked(e.target)) {
        dispatch(selectRow(namespace, rowIdentifierKey, uniqueKey));
        return;
      }
      onRowClick(e, row);
    } else {
      if (e.target.href) {
        return;
      }
      dispatch(selectRow(namespace, rowIdentifierKey, uniqueKey));
    }
    if (sliderContent) {
      dispatch(toggleSlider(namespace, { row, sliderParamName }));
    }
  };

  const visibleColumns = columnDefs.filter(column => !column.hidden);

  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={determineSelectedRow(row) || itemSelected}
      aria-disabled={!!determineDisableRow(row)}
      disabled={!!determineDisableRow(row)}
      tabIndex={-1}
      selected={itemSelected}
      id={`${namespace}-row-${rowIdentifierKey}`}
      data-test={`${namespace}-row-${rowIdentifierKey}`.replace(/ +/g, '_')}
      data-test-multi={`${namespace}-row`}
      ref={provided.innerRef}
      style={{ backgroundColor: itemSelected ? '#f5f5f5' : determineRowColor(row) }}
      {...provided.draggableProps}
      {...rowProps(row)}
    >
      {enableRowSelect && (
        <TableCell
          padding="checkbox"
          key={rowIdentifierKey}
          style={{
            backgroundColor: determineRowColor(row) || 'white',
          }}
        >
          <Checkbox
            color="primary"
            checked={determineSelectedRow(row) || itemSelected}
            disabled={enableRowSelect ? determineDisableRow(row) : null}
            inputProps={{
              'aria-labelledby': labelId,
              'aria-label': labelId,
              'data-test-multi': `${namespace}-checkbox`,
              'data-test': `${namespace}-checkbox-${rowIdentifierKey}`,
            }}
            onClick={() => {
              if (!determineDisableRow(row)) {
                dispatch(selectRow(namespace, rowIdentifierKey, uniqueKey));
              }
            }}
          />
        </TableCell>
      )}

      {columnDefs.map((column, idx) => {
        const value =
          typeof column.display === 'function' ? column.display(row, index, individualTableState) : row[column.display];
        return (
          <TableCell
            {...cellProps(row)}
            key={`${column.title}-${rowIdentifierKey}`}
            align={column.align}
            colSpan={enableDnd && idx === visibleColumns.length - 1 ? 2 : column.colSpan}
            style={{
              minWidth: column.minWidth,
              maxWidth: column.maxWidth,
              width: snapshot.isDragging ? '300px' : column.width,
              backgroundColor: determineRowColor(row) || 'white',
              wordWrap: column.wordWrap,
              color: determineDisableRow(row) ? 'gray' : determineRowFontColor(row),
              display: column.hidden ? 'none' : 'table-cell',
            }}
            data-test={`${namespace}-cell`}
            onClick={e => {
              if (!determineDisableRow(row) && !column.nonSelectable) {
                onCellClick(e);
              }
            }}
          >
            {idx === visibleColumns.length - 1 && enableDnd ? (
              <Box
                display="flex"
                alignItems="center"
                justifyContent={column.align === 'right' ? 'space-between' : 'flex-start'}
                width="100%"
              >
                <span>{value}</span>
                <Tooltip
                  title={
                    disableDrag
                      ? 'Reordering is disabled due to search, filter or sort'
                      : 'Click and drag anywhere on the row to reorder'
                  }
                >
                  <Box style={{ opacity: disableDrag ? 0.5 : 1, marginLeft: 'auto' }}>
                    <IconButton
                      aria-label="drag"
                      disabled={disableDrag}
                      data-test={`${namespace}-drag-handle-${rowIdentifierKey}`}
                      {...provided.dragHandleProps}
                    >
                      <DragIndicator />
                    </IconButton>
                  </Box>
                </Tooltip>
              </Box>
            ) : (
              value
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

GLTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  namespace: PropTypes.string.isRequired,
  namespaceScope: PropTypes.string,
  snapshot: PropTypes.object,
  children: PropTypes.node,
  index: PropTypes.number,
  determineRowColor: PropTypes.func,
  enableRowSelect: PropTypes.bool,
  tableName: PropTypes.string,
  uniqueKey: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  enableRowClick: PropTypes.bool,
  onRowClick: PropTypes.func,
  rowProps: PropTypes.func,
  cellProps: PropTypes.func,
  provided: PropTypes.object,
  enableDnd: PropTypes.bool,
  determineRowFontColor: PropTypes.func,
  disableDrag: PropTypes.bool,
  determineDisableRow: PropTypes.func,
  determineSelectedRow: PropTypes.func,
  sliderContent: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.node]),
  sliderParamName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

GLTableRow.defaultProps = {
  namespaceScope: '',
  snapshot: {},
  children: null,
  index: 0,
  determineRowColor: () => {},
  enableRowSelect: false,
  tableName: '',
  uniqueKey: '',
  enableRowClick: false,
  onRowClick: () => {},
  rowProps: () => ({}),
  cellProps: () => ({}),
  provided: {},
  enableDnd: false,
  determineRowFontColor: () => {},
  disableDrag: false,
  determineDisableRow: () => {},
  determineSelectedRow: () => {},
  sliderContent: false,
  sliderParamName: null,
};

export default GLTableRow;
