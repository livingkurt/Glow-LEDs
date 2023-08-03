/* eslint-disable max-lines-per-function */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const GLTablePagination = ({ count, page, rowsPerPage, onPageChange, onRowsPerPageChange }) => {
  const theme = useTheme();
  const totalPages = Math.ceil(count / rowsPerPage);
  const [selectedPage, setSelectedPage] = useState((page + 1).toString());

  useEffect(() => {
    setSelectedPage((page + 1).toString());
  }, [page]);

  const handleSelectedPageChange = (event, newValue) => {
    const selectedValue = newValue === null ? "1" : newValue.toString();
    onPageChange(null, parseInt(selectedValue, 10) - 1);
    setSelectedPage(selectedValue);
  };

  const handleFirstPageButtonClick = event => {
    onPageChange(event, 0);
    setSelectedPage(1);
  };

  const handleBackButtonClick = event => {
    onPageChange(event, page - 1);
    setSelectedPage(page - 1);
  };

  const handleNextButtonClick = event => {
    onPageChange(event, page + 1);
    setSelectedPage(page + 1);
  };

  const handleLastPageButtonClick = event => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    setSelectedPage(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  const pageItems = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getDisplayedRowsInfo = () => {
    const firstRowIndex = page * rowsPerPage + 1;
    const lastRowIndex = Math.min((page + 1) * rowsPerPage, count);
    return `${firstRowIndex}-${lastRowIndex} of ${count}`;
  };

  return (
    <Box
      sx={{
        flexShrink: 0,
        ml: 5,
        mr: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        m: 1,
      }}
      data-test="pagination-component"
    >
      <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center" }} data-test="pagination-component">
        <Typography variant="body2" className="mr-10px">
          {"Rows per page:"}
        </Typography>
        <Autocomplete
          value={rowsPerPage}
          onChange={onRowsPerPageChange}
          className="mr-20px"
          getOptionLabel={option => option.toString()}
          options={[5, 10, 25, 50, 100]}
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              size="small"
              sx={{
                width: 80,
                "& .MuiInputBase-root": {
                  fontSize: "0.8rem", // Adjust the font size here
                  alignItems: "center", // Align the elements vertically in the center
                },
                "& .MuiInputAdornment-root": {
                  alignItems: "center", // Align the adornment elements vertically in the center
                },
              }}
              inputProps={{
                ...params.inputProps,
                "aria-label": "select page",
              }}
            />
          )}
        />
      </Box>
      <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center" }} data-test="pagination-component">
        <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
          {theme.direction === "rtl" ? (
            <LastPageIcon style={{ fontSize: "25px" }} />
          ) : (
            <FirstPageIcon style={{ fontSize: "25px" }} />
          )}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
          data-test="previous-button"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight style={{ fontSize: "25px" }} />
          ) : (
            <KeyboardArrowLeft style={{ fontSize: "25px" }} />
          )}
        </IconButton>
        <Autocomplete
          value={selectedPage}
          onChange={handleSelectedPageChange}
          getOptionLabel={option => option.toString()}
          options={pageItems}
          style={{ width: 120 }}
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              size="small"
              sx={{
                width: 120,
                "& .MuiInputBase-root": {
                  fontSize: "0.8rem", // Adjust the font size here
                  alignItems: "center", // Align the elements vertically in the center
                },
                "& .MuiInputAdornment-root": {
                  alignItems: "center", // Align the adornment elements vertically in the center
                },
              }}
              inputProps={{
                ...params.inputProps,
                "aria-label": "select page",
              }}
            />
          )}
        />
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= totalPages - 1}
          aria-label="next page"
          data-test="next-button"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft style={{ fontSize: "25px" }} />
          ) : (
            <KeyboardArrowRight style={{ fontSize: "25px" }} />
          )}
        </IconButton>
        <IconButton onClick={handleLastPageButtonClick} disabled={page >= totalPages - 1} aria-label="last page">
          {theme.direction === "rtl" ? (
            <FirstPageIcon style={{ fontSize: "25px" }} />
          ) : (
            <LastPageIcon style={{ fontSize: "25px" }} />
          )}
        </IconButton>
      </Box>
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          width: "238px",
          justifyContent: "flex-end",
          marginRight: "10px",
        }}
        data-test="pagination-component"
      >
        <Typography variant="body2" className="mr-10px">
          {getDisplayedRowsInfo()}
        </Typography>
      </Box>
    </Box>
  );
};

GLTablePagination.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default GLTablePagination;
