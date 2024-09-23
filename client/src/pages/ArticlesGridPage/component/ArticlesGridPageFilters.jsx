import React, { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Autocomplete, TextField, Chip } from "@mui/material";
import { FilterList, Clear } from "@mui/icons-material";
import { toTitleCase } from "../../../utils/helper_functions";
import { autocompleteStyle, selectStyle } from "../../ProductsGridPage/productGridPageHelpers";

const sortOptions = [
  { label: "Newest", value: "-createdAt" },
  { label: "Oldest", value: "createdAt" },
];

const ArticlesGridPageFilters = ({
  sort,
  allTags = [],
  selectedTags = [],
  handleSortChange,
  handleTagChange,
  clearAllFilters,
  selectedAuthor,
  handleAuthorChange,
  allAuthors = [],
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isExpanded, setIsExpanded] = useState(false);

  const activeFiltersCount = (sort ? 1 : 0) + (selectedTags ? selectedTags.length : 0) + (selectedAuthor ? 1 : 0);

  const handleSortChangeWithClear = event => {
    const value = event.target.value;
    if (value === "clear") {
      handleSortChange(event, null);
    } else {
      handleSortChange(
        event,
        sortOptions.find(option => option.value === value)
      );
    }
  };

  const tagOptions = allTags.map(tag => ({
    value: tag,
    label: toTitleCase(tag.replace(/_/g, " ")),
  }));

  return (
    <Box sx={{ my: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            width: isMobile ? "100%" : "auto",
            color: "white",
            borderColor: "white",
            "&:hover": {
              borderColor: "white",
            },
          }}
          startIcon={<FilterList />}
        >
          {isExpanded ? "Hide Filters" : "Show Filters"}
        </Button>
        {activeFiltersCount > 0 && (
          <Button
            variant="outlined"
            onClick={clearAllFilters}
            startIcon={<Clear />}
            sx={{
              ml: 2,
              color: "white",
              borderColor: "white",
              "&:hover": {
                borderColor: "white",
              },
            }}
          >
            Clear Filters
          </Button>
        )}
      </Box>
      <Collapse in={isExpanded}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth sx={autocompleteStyle}>
              <InputLabel
                id="sort-select-label"
                sx={{
                  color: "white",
                  "&.Mui-focused": {
                    color: "white",
                  },
                }}
              >
                Sort By
              </InputLabel>
              <Select
                labelId="sort-select-label"
                value={sort || ""}
                label="Sort By"
                onChange={handleSortChangeWithClear}
                sx={selectStyle}
              >
                <MenuItem value="clear">
                  <Box display="flex" justifyContent="flex-end" width={"100%"} alignItems={"center"}>
                    <Clear fontSize="large" />
                    <Typography ml={1}>Clear Sort</Typography>
                  </Box>
                </MenuItem>
                {sortOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              multiple
              options={tagOptions}
              getOptionLabel={option => option.label}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Filter By Tags"
                  fullWidth
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                />
              )}
              renderTags={(tagValues, getTagProps) =>
                tagValues.map((option, index) => (
                  <Chip
                    label={option.label}
                    {...getTagProps({ index })}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  />
                ))
              }
              value={selectedTags.map(tag => ({
                value: tag,
                label: toTitleCase(tag.replace(/_/g, " ")),
              }))}
              onChange={(event, newValue) =>
                handleTagChange(
                  event,
                  newValue.map(v => v.value)
                )
              }
              sx={autocompleteStyle}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={allAuthors}
              getOptionLabel={option => option.first_name + " " + option.last_name}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Filter By Author"
                  fullWidth
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                />
              )}
              value={selectedAuthor}
              onChange={(event, newValue) => handleAuthorChange(event, newValue)}
              isOptionEqualToValue={(option, value) => option._id === value?._id}
              sx={autocompleteStyle}
            />
          </Grid>
        </Grid>
      </Collapse>
    </Box>
  );
};

export default ArticlesGridPageFilters;
