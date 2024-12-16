import React, { useState, useMemo } from "react";

import { toTitleCase } from "../../../utils/helper_functions";

import { autocompleteStyle, selectStyle, toggleButtonStyle, toSnakeCase } from "../productGridPageHelpers";
import { isSafari } from "react-device-detect";
import Autocomplete from "@mui/material/Autocomplete";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Clear from "@mui/icons-material/Clear";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import FilterList from "@mui/icons-material/FilterList";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

const ProductsGridPageFilters = ({
  category,
  microlights,
  selectedMicrolight,
  sortOptions,
  sort,
  allTags,
  selectedTags,
  handleCategoryChange,
  handleMicrolightChange,
  handleSortChange,
  handleTagChange,
  clearAllFilters,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isExpanded, setIsExpanded] = useState(false);

  const activeFiltersCount = useMemo(() => {
    return (category ? 1 : 0) + (selectedMicrolight ? 1 : 0) + (sort ? 1 : 0) + selectedTags.length;
  }, [category, selectedMicrolight, sort, selectedTags]);

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

  const handleTagChangeAndUpdateURL = (event, newValue) => {
    handleTagChange(event, newValue);

    // Update URL
    const currentUrl = new URL(window.location.href);
    const pathname = currentUrl.pathname;
    const searchParams = currentUrl.searchParams;

    // Remove all existing tag parameters
    searchParams.delete("tags[]");

    // Construct the new query string manually
    let newQueryString = searchParams.toString();
    newValue.forEach(tag => {
      if (newQueryString) newQueryString += "&";
      newQueryString += `tags[]=${encodeURIComponent(tag.toLowerCase().replace(/ /g, "_"))}`;
    });

    // Construct the new URL
    const newUrl = `${pathname}${newQueryString ? "?" + newQueryString : ""}`;
    window.history.pushState({}, "", newUrl);
  };

  const tagOptions = allTags.map(tag => ({
    value: tag,
    label: toTitleCase(tag.replace(/_/g, " ")),
    disabled: selectedTags.includes(toSnakeCase(tag)),
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
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Container maxWidth="md">
              <ToggleButtonGroup
                value={category}
                exclusive
                onChange={handleCategoryChange}
                aria-label="category selection"
                orientation={isMobile ? "vertical" : "horizontal"}
                sx={{ width: "100%", height: "100%", mb: 2 }}
              >
                {["best_sellers", "our_picks", "discounted"].map(cat => (
                  <ToggleButton
                    key={cat}
                    value={cat}
                    aria-label={cat}
                    sx={{
                      ...toggleButtonStyle,
                      flex: 1,
                      padding: "6px 8px",
                    }}
                  >
                    {cat.replace("_", " ").toUpperCase()}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Container>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Autocomplete
              options={microlights || []}
              getOptionLabel={option => option.name}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Filter By Microlight"
                  fullWidth
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                />
              )}
              value={microlights?.find(c => c.pathname === selectedMicrolight) || null}
              onChange={handleMicrolightChange}
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
              renderOption={(props, option) => (
                <li {...props} style={{ opacity: option.disabled ? 0.5 : 1 }}>
                  {option.label}
                </li>
              )}
              getOptionDisabled={option => option.disabled}
              value={selectedTags.map(tag => ({
                value: tag,
                label: toTitleCase(tag.replace(/_/g, " ")),
              }))}
              onChange={(event, newValue) =>
                handleTagChangeAndUpdateURL(
                  event,
                  newValue.map(v => v.value)
                )
              }
              sx={autocompleteStyle}
            />
          </Grid>
        </Grid>
      </Collapse>
    </Box>
  );
};

export default ProductsGridPageFilters;
