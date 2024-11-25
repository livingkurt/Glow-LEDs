/* eslint-disable max-lines-per-function */
import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { isItemExpanded, isItemSelected, rowCheckboxClicked, rowIdentifier } from '../glTableHelpers';
import { toggleSlider, selectRow, toggleDropdownRow } from '../reducers/glTableActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import DragIndicator from '@mui/icons-material/DragIndicator';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import useTableState from '../useTableState';
import { Box } from '@mui/material';

const GLTableRowGroup = ({
  row,
  namespace,
  namespaceScope,
  snapshot,
  children,
  index,
  determineRowColor,
  enableRowSelect,
  enableDropdownRow,
  tableName,
  uniqueKey,
  enableRowClick,
  onRowClick,
  rowProps,
  cellProps,
  dropdownRowsUniqueKey,
  provided,
  enableDnd,
  determineRowFontColor,
  disableDrag,
  disableDropdownNoRecords,
  sliderParamName,
  sliderContent,
}) => {
  const dispatch = useDispatch();

  const individualTableState = useTableState(namespace, namespaceScope);

  const { selectedRows, expandedRows, columnDefs } = individualTableState;

  const rowIdentifierKey = rowIdentifier(row, uniqueKey);

  const labelId = `${tableName && tableName.toLowerCase()}-${index}`;

  const itemSelected = enableRowSelect && isItemSelected(rowIdentifierKey, selectedRows);
  const itemExpanded = enableDropdownRow && isItemExpanded(rowIdentifierKey, expandedRows);

  const onCellClick = e => {
    if (enableDropdownRow) {
      if (rowCheckboxClicked(e.target)) {
        dispatch(selectRow(namespace, rowIdentifierKey, uniqueKey));
        return;
      }
      if (!disableDropdownNoRecords || row[dropdownRowsUniqueKey].length > 0) {
        dispatch(toggleDropdownRow(namespace, rowIdentifierKey, uniqueKey));
      }
    } else if (enableRowClick) {
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
    <div
      role="checkbox"
      aria-checked={itemSelected}
      aria-expanded={itemExpanded}
      tabIndex={-1}
      id={`${namespace}-row-group-${rowIdentifierKey}`}
      data-test={`${namespace}-row-group-${rowIdentifierKey}`.replace(/ +/g, '_')}
      data-test-multi={`${namespace}-row-group`}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...rowProps(row)}
    >
      <Paper
        style={{
          margin: '10px',
          borderRadius: '15px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `${enableRowSelect ? '70px ' : ''}${enableDropdownRow ? '60px ' : ''}repeat(${visibleColumns.length}, 1fr) ${enableDnd ? '70px' : ''}`,
            width: '100%',
            backgroundColor: itemSelected ? '#f5f5f5' : determineRowColor(row),
          }}
        >
          {enableRowSelect && (
            <div style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
              <Checkbox
                color="primary"
                checked={itemSelected}
                inputProps={{
                  'aria-labelledby': labelId,
                  'aria-label': labelId,
                  'data-test-multi': `${namespace}-checkbox`,
                  'data-test': `${namespace}-checkbox-${rowIdentifierKey}`,
                }}
                onClick={() => {
                  dispatch(selectRow(namespace, rowIdentifierKey, uniqueKey));
                }}
              />
            </div>
          )}
          {enableDropdownRow && (
            <div style={{ padding: '23px 5px', display: 'flex', alignItems: 'center' }}>
              <IconButton
                aria-label="expand row"
                data-test={`${namespace}-expand-row-${rowIdentifierKey}`}
                size="small"
                disabled={disableDropdownNoRecords && row[dropdownRowsUniqueKey].length === 0}
                onClick={() => {
                  if (!disableDropdownNoRecords || row[dropdownRowsUniqueKey].length > 0) {
                    dispatch(toggleDropdownRow(namespace, rowIdentifierKey, uniqueKey));
                  }
                }}
              >
                {itemExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            </div>
          )}
          {columnDefs.map(column => {
            if (column.display) {
              const value =
                typeof column.display === 'function'
                  ? column.display(row, index, individualTableState)
                  : row[column.display];
              return (
                <div
                  {...cellProps(row)}
                  key={`${column.title}-${rowIdentifierKey}`}
                  style={{
                    flexGrow: 1,
                    padding: '16px',
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                    display: column.hidden ? 'none' : 'flex',
                    alignItems: 'center',
                    justifyContent: column.align === 'right' ? 'flex-end' : 'flex-start',
                    backgroundColor: snapshot.isDragging ? determineRowColor(row) : 'unset',
                    wordWrap: column.wordWrap,
                    textAlign: column.align,
                    color: determineRowFontColor(row),
                  }}
                  data-test={`${namespace}-cell`}
                  role="button"
                  tabIndex={0}
                  onClick={column.nonSelectable ? () => {} : onCellClick}
                  onKeyDown={column.nonSelectable ? () => {} : onCellClick}
                >
                  {value}
                </div>
              );
            }
            return null;
          })}
          {enableDnd && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
              }}
              {...provided.dragHandleProps}
            >
              <Tooltip
                title={
                  disableDrag ? 'Reordering is disabled due to search, filter or sort' : 'Click and drag to reorder'
                }
              >
                <Box style={{ opacity: disableDrag ? 0.5 : 1 }}>
                  <IconButton
                    aria-label="drag"
                    disabled={disableDrag}
                    data-test={`${namespace}-drag-handle-${rowIdentifierKey}`}
                  >
                    <DragIndicator />
                  </IconButton>
                </Box>
              </Tooltip>
            </div>
          )}
        </div>

        <Collapse in={itemExpanded} style={{ width: '100%' }}>
          <div
            style={{ padding: '0', margin: '0', borderBottom: '0', width: '100%' }}
            data-test={`${namespace}-subrow-${itemExpanded ? 'expanded' : 'collapsed'}-${rowIdentifierKey}`}
          >
            {children}
          </div>
        </Collapse>
      </Paper>
    </div>
  );
};

GLTableRowGroup.propTypes = {
  row: PropTypes.object.isRequired,
  namespace: PropTypes.string.isRequired,
  namespaceScope: PropTypes.string,
  snapshot: PropTypes.object,
  children: PropTypes.node,
  index: PropTypes.number,
  determineRowColor: PropTypes.func,
  enableRowSelect: PropTypes.bool,
  enableDropdownRow: PropTypes.bool,
  tableName: PropTypes.string,
  uniqueKey: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  enableRowClick: PropTypes.bool,
  onRowClick: PropTypes.func,
  rowProps: PropTypes.func,
  cellProps: PropTypes.func,
  dropdownRowsUniqueKey: PropTypes.string,
  provided: PropTypes.object,
  enableDnd: PropTypes.bool,
  determineRowFontColor: PropTypes.func,
  disableDrag: PropTypes.bool,
  disableDropdownNoRecords: PropTypes.bool,
  sliderContent: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.node]),
  sliderParamName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

GLTableRowGroup.defaultProps = {
  namespaceScope: '',
  snapshot: {},
  children: null,
  index: 0,
  determineRowColor: () => {},
  enableRowSelect: false,
  enableDropdownRow: false,
  tableName: '',
  uniqueKey: '',
  enableRowClick: false,
  onRowClick: () => {},
  rowProps: () => ({}),
  cellProps: () => ({}),
  dropdownRowsUniqueKey: '',
  provided: {},
  enableDnd: false,
  determineRowFontColor: () => {},
  disableDrag: false,
  disableDropdownNoRecords: true,
  sliderContent: null,
  sliderParamName: null,
};

export default GLTableRowGroup;
