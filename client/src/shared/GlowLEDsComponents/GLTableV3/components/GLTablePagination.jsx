/* eslint-disable max-lines-per-function */
import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { updatePageSize } from "../reducers/glTableActions";
import { getDisplayedRowsInfo, translateGLTable } from "../glTableHelpers";
import Divider from "@mui/material/Divider";
import GLTableNextPrevious from "./GLTableNextPrevious";
import useTableState from "../useTableState";
import useContainerDimensions from "../../../Hooks/useContainerDimensions";

const GLTablePagination = ({ namespace, namespaceScope, location, rowCount }) => {
  const dispatch = useDispatch();

  const individualTableState = useTableState(namespace, namespaceScope);

  const { pageSize, page } = individualTableState;

  const { containerRef, dimensions } = useContainerDimensions();
  const { width } = dimensions;

  return (
    <Box ref={containerRef}>
      <Divider />
      <Box
        sx={{ flexShrink: 0, ml: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}
        data-test={`pagination-component-${location}`}
      >
        <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
          <Typography variant="body2" className="mr-10px">
            {translateGLTable("rows_per_page_label")}
          </Typography>
          <Autocomplete
            value={pageSize}
            onChange={(e, value) => dispatch(updatePageSize(namespace, value))}
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
                    fontSize: "0.8rem",
                    alignItems: "center",
                  },
                  "& .MuiInputAdornment-root": {
                    alignItems: "center",
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
          <GLTableNextPrevious location={location} namespace={namespace} namespaceScope={namespaceScope} />
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
            {getDisplayedRowsInfo(rowCount, page, pageSize)}
          </Typography>
        </Box>
      </Box>
      {width <= 632 && (
        <>
          <Divider />
          <Box display="flex" justifyContent="center">
            <GLTableNextPrevious location={location} namespace={namespace} namespaceScope={namespaceScope} />
          </Box>
        </>
      )}
      <Divider />
    </Box>
  );
};

GLTablePagination.defaultProps = {
  namespaceScope: "",
  rowCount: 0,
};
GLTablePagination.propTypes = {
  location: PropTypes.string.isRequired,
  namespace: PropTypes.string.isRequired,
  namespaceScope: PropTypes.string,
  rowCount: PropTypes.number,
};

export default GLTablePagination;
