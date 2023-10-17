/* eslint-disable max-lines-per-function */
import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { updatePageSize } from "../actions/actions";
import { getDisplayedRowsInfo } from "../glTableHelpers";
import CovalentTableNextPrevious from "./GLTableNextPrevious";
import { Divider } from "@mui/material";
import useContainerDimensions from "../../../Hooks/useContainerDimensions";

const GLTablePagination = ({ count, page, namespace, rowsPerPage, location, droppableId }) => {
  const dispatch = useDispatch();

  const { containerRef, dimensions } = useContainerDimensions();
  const { width } = dimensions;

  return (
    <Box ref={containerRef}>
      <Box
        sx={{ flexShrink: 0, ml: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}
        data-test={`pagination-component-${location}`}
      >
        <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
          <Typography variant="body2" className="mr-10px">
            Rows Per Page
          </Typography>
          <Autocomplete
            value={rowsPerPage}
            onChange={(e, value) => dispatch(updatePageSize(namespace, droppableId, value))}
            disableClearable
            className="mr-20px"
            getOptionLabel={option => option.toString()}
            options={[5, 10, 25, 50, 100]}
            renderInput={params => (
              <TextField
                {...params}
                variant="outlined"
                size="small"
                name={`rowsPerPage-${location}`}
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
                  "aria-label": `rows per page ${location}`,
                }}
              />
            )}
          />
        </Box>
        {width > 632 && (
          <CovalentTableNextPrevious
            page={page}
            rowsPerPage={rowsPerPage}
            count={count}
            location={location}
            namespace={namespace}
            droppableId={droppableId}
          />
        )}
        <Box
          sx={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginRight: "10px",
          }}
        >
          <Typography variant="body2" className="mr-10px">
            {getDisplayedRowsInfo(count, page, rowsPerPage)}
          </Typography>
        </Box>
      </Box>
      {width <= 632 && (
        <>
          <Divider />
          <Box display="flex" justifyContent="center">
            <CovalentTableNextPrevious
              page={page}
              rowsPerPage={rowsPerPage}
              count={count}
              location={location}
              namespace={namespace}
              droppableId={droppableId}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

GLTablePagination.defaultProps = {
  droppableId: null,
};
GLTablePagination.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  namespace: PropTypes.string.isRequired,
  droppableId: PropTypes.string,
};

export default GLTablePagination;
