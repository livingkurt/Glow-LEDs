/* eslint-disable max-lines-per-function */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { pageItems, selectedPage, totalPages } from '../glTableHelpers';
import { updatePage } from '../reducers/glTableActions';
import useTableState from '../useTableState';

const GLTableNextPrevious = ({ namespace, namespaceScope, location }) => {
  const dispatch = useDispatch();

  const individualTableState = useTableState(namespace, namespaceScope);

  const {
    page,
    pageSize,
    filteredRows,
    remote: { remoteCount },
  } = individualTableState;

  const rowCount = remoteCount || filteredRows.length;

  const handleFirstPageButtonClick = () => {
    dispatch(updatePage(namespace, 0));
  };

  const handleBackButtonClick = () => {
    dispatch(updatePage(namespace, page - 1));
  };

  const handleNextButtonClick = () => {
    dispatch(updatePage(namespace, page + 1));
  };

  const handleLastPageButtonClick = () => {
    dispatch(updatePage(namespace, Math.max(0, Math.ceil(rowCount / pageSize) - 1)));
  };

  const handleSelectedPageChange = (event, newValue) => {
    const selectedValue = selectedPage(newValue);
    dispatch(updatePage(namespace, parseInt(selectedValue, 10) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label={`first page ${location}`}>
        <FirstPageIcon style={{ fontSize: '25px' }} />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        data-test={`previous-button-${location}`}
      >
        <KeyboardArrowLeft style={{ fontSize: '25px' }} />
      </IconButton>
      <Autocomplete
        value={page + 1}
        onChange={handleSelectedPageChange}
        getOptionLabel={option => option.toString()}
        getOptionSelected={(option, value) => option === value}
        disableClearable
        options={pageItems(pageSize, rowCount)}
        freeSolo={false}
        style={{ width: 120 }}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            size="small"
            sx={{
              width: 80,
              '& .MuiInputBase-root': {
                fontSize: '0.8rem', // Adjust the font size here
                alignItems: 'center', // Align the elements vertically in the center
              },
              '& .MuiInputAdornment-root': {
                alignItems: 'center', // Align the adornment elements vertically in the center
              },
            }}
            inputProps={{
              ...params.inputProps,
              'aria-label': `select page ${location}`,
            }}
          />
        )}
      />
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= totalPages(pageSize, rowCount) - 1}
        aria-label="next page"
        data-test={`next-button-${location}`}
      >
        <KeyboardArrowRight style={{ fontSize: '25px' }} />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= totalPages(pageSize, rowCount) - 1}
        aria-label={`last page ${location}`}
      >
        <LastPageIcon style={{ fontSize: '25px' }} />
      </IconButton>
    </Box>
  );
};

GLTableNextPrevious.defaultProps = {
  namespaceScope: null,
};
GLTableNextPrevious.propTypes = {
  namespace: PropTypes.string.isRequired,
  namespaceScope: PropTypes.string,
  location: PropTypes.string.isRequired,
};

export default GLTableNextPrevious;
