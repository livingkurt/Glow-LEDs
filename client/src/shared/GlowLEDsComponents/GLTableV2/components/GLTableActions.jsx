import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const GLTableActions = ({ count, page, rowsPerPage, onPageChange }) => {
  const theme = useTheme();
  const totalPages = Math.ceil(count / rowsPerPage);
  const [selectedPage, setSelectedPage] = useState(page + 1);

  const handleSelectedPageChange = (event, newValue) => {
    if (newValue === null) {
      onPageChange(null, 0);
      setSelectedPage(1);
    } else {
      onPageChange(null, newValue - 1);
      setSelectedPage(newValue);
    }
  };

  const handleFirstPageButtonClick = event => {
    onPageChange(event, 0);
    setSelectedPage(0);
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

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5, display: "flex", alignItems: "center" }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === "rtl" ? <LastPageIcon style={{ fontSize: "25px" }} /> : <FirstPageIcon style={{ fontSize: "25px" }} />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight style={{ fontSize: "25px" }} />
        ) : (
          <KeyboardArrowLeft style={{ fontSize: "25px" }} />
        )}
      </IconButton>
      <Autocomplete
        value={selectedPage}
        onChange={handleSelectedPageChange}
        options={Array.from({ length: totalPages }, (_, i) => i + 1)}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            size="small"
            sx={{
              width: 80,
              "& .MuiInputBase-root": {
                fontSize: "0.8rem", // Adjust the font size here
                alignItems: "center" // Align the elements vertically in the center
              },
              "& .MuiInputAdornment-root": {
                alignItems: "center" // Align the adornment elements vertically in the center
              }
            }}
            inputProps={{
              ...params.inputProps,
              "aria-label": "select page"
            }}
          />
        )}
      />
      <IconButton onClick={handleNextButtonClick} disabled={page >= totalPages - 1} aria-label="next page">
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft style={{ fontSize: "25px" }} />
        ) : (
          <KeyboardArrowRight style={{ fontSize: "25px" }} />
        )}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= totalPages - 1} aria-label="last page">
        {theme.direction === "rtl" ? <FirstPageIcon style={{ fontSize: "25px" }} /> : <LastPageIcon style={{ fontSize: "25px" }} />}
      </IconButton>
    </Box>
  );
};

GLTableActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

export default GLTableActions;
