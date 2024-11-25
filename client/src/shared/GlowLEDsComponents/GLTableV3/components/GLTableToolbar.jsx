import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import clsx from 'clsx';
import {
  determineHasFilters,
  determineHiddenSelected,
  determineRowCount,
  determineShowRowCount,
} from '../glTableHelpers';
import glTable from '../glTable.module.scss';
import useTableState from '../useTableState';
import Box from '@mui/material/Box';
import GLTableTableName from './GLTableTableName';

const GLTableToolbar = ({ namespace, namespaceScope, children, enableRowSelect, titleActions, tableName }) => {
  const individualTableState = useTableState(namespace, namespaceScope);

  const {
    filteredRows,
    visibleRows,
    selectedRows,
    availableFilters,
    remote: { remoteCount },
  } = individualTableState;

  const rowCount = determineRowCount(remoteCount, filteredRows);
  const showRowCount = determineShowRowCount(tableName, rowCount);
  const hiddenSelected = determineHiddenSelected(visibleRows, selectedRows);
  const hasFilters = determineHasFilters(availableFilters);
  return (
    <div>
      {tableName && (hasFilters || titleActions) && (
        <Toolbar
          className={clsx(
            glTable.titleContainer,
            enableRowSelect && selectedRows.length > 0 && glTable.rowSelectedTitleContainer
          )}
        >
          <GLTableTableName
            namespace={namespace}
            namespaceScope={namespaceScope}
            hiddenSelected={hiddenSelected}
            showRowCount={showRowCount}
            tableName={tableName}
            enableRowSelect={enableRowSelect}
          />
          {typeof titleActions === 'function' ? titleActions() : titleActions}
        </Toolbar>
      )}
      {(hasFilters || titleActions) && <Divider />}
      {children && (
        <Box display="flex" alignItems="center" justifyContent="space-between" pl={3} pr={3}>
          {children}
        </Box>
      )}
    </div>
  );
};

GLTableToolbar.defaultProps = {
  namespaceScope: null,
  children: null,
  enableRowSelect: false,
  titleActions: null,
  tableName: '',
};

GLTableToolbar.propTypes = {
  namespace: PropTypes.string.isRequired,
  namespaceScope: PropTypes.string,
  children: PropTypes.node,
  enableRowSelect: PropTypes.bool,
  titleActions: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  tableName: PropTypes.string,
};

export default GLTableToolbar;
