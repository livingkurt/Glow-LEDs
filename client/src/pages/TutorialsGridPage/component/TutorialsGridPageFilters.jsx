import React, { useState } from "react";

import { toTitleCase } from "../../../utils/helper_functions";
import { autocompleteStyle, toggleButtonStyle, selectStyle } from "../../ProductsGridPage/productGridPageHelpers";
import { isSafari } from "react-device-detect";
import Autocomplete from "@mui/material/Autocomplete";
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
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

const sortOptions = [
  { label: "Newest", value: "-createdAt" },
  { label: "Oldest", value: "createdAt" },
  { label: "Most Viewed", value: "-views" },
  { label: "Least Viewed", value: "views" },
];

const TutorialsGridPageFilters = ({
  selectedLevel,
  sort,
  allTags = [],
  selectedTags = [],
  handleLevelChange,
  handleSortChange,
  handleTagChange,
  clearAllFilters,
  selectedGlover,
  handleGloverChange,
  allGlovers = [],
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isExpanded, setIsExpanded] = useState(false);

  const activeFiltersCount =
    (selectedLevel ? 1 : 0) + (sort ? 1 : 0) + (selectedTags ? selectedTags.length : 0) + (selectedGlover ? 1 : 0);

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
            {"Clear Filters"}
          </Button>
        )}
      </Box>
      <Collapse in={isExpanded}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ToggleButtonGroup
              value={selectedLevel}
              exclusive
              onChange={handleLevelChange}
              aria-label="level selection"
              orientation={isMobile ? "vertical" : "horizontal"}
              sx={{ width: "100%", height: "100%", mb: 2 }}
            >
              {["beginner", "intermediate", "advanced", "experimental"].map(level => (
                <ToggleButton
                  key={level}
                  value={level}
                  aria-label={level}
                  sx={{
                    ...toggleButtonStyle,
                    flex: 1,
                    padding: "6px 8px",
                  }}
                >
                  {level.toUpperCase()}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
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
              options={allGlovers}
              getOptionLabel={option => option.artist_name}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Filter By Glover"
                  fullWidth
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                />
              )}
              value={selectedGlover}
              onChange={(event, newValue) => handleGloverChange(event, newValue)}
              isOptionEqualToValue={(option, value) => option.pathname === value?.pathname}
              sx={autocompleteStyle}
            />
          </Grid>
        </Grid>
      </Collapse>
    </Box>
  );
};

export default TutorialsGridPageFilters;
