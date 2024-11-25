import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';
import PropTypes from 'prop-types';
import times from 'lodash/times';
import React from 'react';
import useTableState from '../useTableState';

const GLTableLoading = ({
  namespace,
  namespaceScope,
  loading,
  noContentMessage,
  enableDropdownRow,
  children,
}) => {
  const tableState = useTableState(namespace, namespaceScope);

  const {
    pageSize,
    columnDefs,
    visibleRows,
    remote: { isRemoteLoading },
  } = tableState;

  if (loading || isRemoteLoading) {
    if (enableDropdownRow) {
      return times(pageSize, index => (
        <Box key={`${index}-skeleton-row`} data-test="loading-row" p={2}>
          <Skeleton animation="wave" variant="rect" height={40} style={{ borderRadius: '10px' }} />
        </Box>
      ));
    }
    return times(pageSize, index => (
      <TableRow key={`${index}-skeleton-row`} data-test="loading-row">
        <TableCell key="skeleton-cell" colSpan={columnDefs.length + 1}>
          <Skeleton animation="wave" variant="rect" height={40} style={{ borderRadius: '10px' }} />
        </TableCell>
      </TableRow>
    ));
  } else if (!loading && visibleRows.length === 0) {
    if (enableDropdownRow) {
      return (
        <Box className="ta-c pb-20px" p={2}>
          {noContentMessage}
        </Box>
      );
    }
    return (
      <TableRow>
        <TableCell className="ta-c pb-20px" colSpan={columnDefs.length + 1}>
          {noContentMessage}
        </TableCell>
      </TableRow>
    );
  } else {
    return children;
  }
};

GLTableLoading.defaultProps = {
  loading: false,
  children: [],
  namespaceScope: '',
  noContentMessage: 'No content found',
  enableDropdownRow: false,
};

GLTableLoading.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.array,
  namespace: PropTypes.string.isRequired,
  namespaceScope: PropTypes.string,
  noContentMessage: PropTypes.string,
  enableDropdownRow: PropTypes.bool,
};

export default GLTableLoading;
