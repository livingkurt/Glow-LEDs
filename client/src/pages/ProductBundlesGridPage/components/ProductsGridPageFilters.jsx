import React, { useState, useMemo } from "react";

import PropTypes from "prop-types";

import { toTitleCase } from "../../../utils/helper_functions";

import { autocompleteStyle, selectStyle } from "../../ProductsGridPage/productGridPageHelpers";
import { isSafari } from "react-device-detect";
import Autocomplete from "@mui/material/Autocomplete";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Clear from "@mui/icons-material/Clear";
import Collapse from "@mui/material/Collapse";
import FilterList from "@mui/icons-material/FilterList";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

const ProductBundlesGridPageFilters = ({
  selectedAffiliate,
  sortOptions,
  sort,
  allTags,
  selectedTags,
  handleAffiliateChange,
  handleSortChange,
  handleTagChange,
  clearAllFilters,
  affiliates,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isExpanded, setIsExpanded] = useState(false);

  const activeFiltersCount = useMemo(() => {
    return (selectedAffiliate ? 1 : 0) + (sort ? 1 : 0) + selectedTags.length;
  }, [selectedAffiliate, sort, selectedTags]);

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
        <Badge badgeContent={activeFiltersCount} color="primary" sx={{ mr: 2 }}>
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
        </Badge>
        {activeFiltersCount > 0 && (
          <Button
            variant="outlined"
            onClick={clearAllFilters}
            startIcon={<Clear />}
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                borderColor: "white",
              },
            }}
          >
            {"Clear Filters"}
          </Button>
        )}
      </Box>
      <Collapse in={isExpanded}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Autocomplete
              options={affiliates || []}
              getOptionLabel={option => option.artist_name || ""}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Filter By Affiliate"
                  fullWidth
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                />
              )}
              value={affiliates?.find(a => a.pathname === selectedAffiliate) || null}
              onChange={handleAffiliateChange}
              sx={autocompleteStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
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
                {"Sort By"}
              </InputLabel>
              <Select
                labelId="sort-select-label"
                value={sort || ""}
                label="Sort By"
                onChange={handleSortChangeWithClear}
                sx={selectStyle}
              >
                <MenuItem value="clear">
                  <Box display="flex" justifyContent="flex-end" width="100%" alignItems="center">
                    <Clear fontSize="large" />
                    <Typography ml={1}>{"Clear Sort"}</Typography>
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
          <Grid item xs={12} md={4}>
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
                    key={index}
                    label={option.label}
                    {...getTagProps({ index })}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      fontWeight: isSafari ? 699 : 700,
                      fontSize: "1rem",
                    }}
                  />
                ))
              }
              value={selectedTags.map(tag => ({
                value: tag,
                label: toTitleCase(tag.replace(/_/g, " ")),
              }))}
              onChange={handleTagChange}
              sx={autocompleteStyle}
            />
          </Grid>
        </Grid>
      </Collapse>
    </Box>
  );
};

ProductBundlesGridPageFilters.propTypes = {
  selectedAffiliate: PropTypes.string,
  sort: PropTypes.string,
  allTags: PropTypes.array,
  selectedTags: PropTypes.array,
  handleAffiliateChange: PropTypes.func,
  handleSortChange: PropTypes.func,
  handleTagChange: PropTypes.func,
  clearAllFilters: PropTypes.func,
  affiliates: PropTypes.array,
  sortOptions: PropTypes.array,
};

ProductBundlesGridPageFilters.defaultProps = {
  selectedAffiliate: null,
  sort: null,
  allTags: [],
  selectedTags: [],
  handleAffiliateChange: () => {},
  handleSortChange: () => {},
  handleTagChange: () => {},
  clearAllFilters: () => {},
  affiliates: [],
  sortOptions: [],
};

export default ProductBundlesGridPageFilters;
