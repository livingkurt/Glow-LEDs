import React from 'react';
import PropTypes from 'prop-types';
import useTableState from '../useTableState';
import Typography from '@mui/material/Typography';
import glTable from '../glTable.module.scss';
import { translateGLTable } from '../glTableHelpers';

const GLTableTableName = ({
  namespace,
  namespaceScope,
  hiddenSelected,
  showRowCount,
  tableName,
  enableRowSelect,
}) => {
  const individualTableState = useTableState(namespace, namespaceScope);

  const { selectedRows } = individualTableState;

  return (
    <div>
      {enableRowSelect && selectedRows.length > 0 ? (
        <div data-test="tableToolbarTitle">
          <Typography variant="h6" color="textPrimary" component="div">
            {selectedRows.length === 1
              ? translateGLTable('selected_counter_singular', { count: selectedRows.length })
              : translateGLTable('selected_counter_plural', { count: selectedRows.length })}
          </Typography>
          {hiddenSelected > 0 && (
            <sup className={glTable.subtextWrapper}>
              {translateGLTable('not_shown_label', { hiddenSelected })}
            </sup>
          )}
        </div>
      ) : (
        <Typography variant="h6" data-test="tableToolbarTitle" id="tableTitle" component="div">
          {`${tableName + showRowCount}`}
        </Typography>
      )}
    </div>
  );
};

GLTableTableName.defaultProps = {
  namespaceScope: null,
  hiddenSelected: 0,
  showRowCount: '',
  enableRowSelect: false,
};

GLTableTableName.propTypes = {
  namespace: PropTypes.string.isRequired,
  namespaceScope: PropTypes.string,
  hiddenSelected: PropTypes.number,
  showRowCount: PropTypes.string,
  tableName: PropTypes.string.isRequired,
  enableRowSelect: PropTypes.bool,
};

export default GLTableTableName;
