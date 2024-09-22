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
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Autocomplete, TextField, Chip, Badge } from "@mui/material";
import { FilterList, Clear } from "@mui/icons-material";
import { toTitleCase } from "../../../utils/helper_functions";
import { autocompleteStyle, toggleButtonStyle, selectStyle } from "../../ProductsGridPage/productGridPageHelpers";

const sortOptions = [
  { label: "Newest", value: "-createdAt" },
  { label: "Oldest", value: "createdAt" },
  { label: "Most Viewed", value: "-views" },
  { label: "Least Viewed", value: "views" },
];

const TutorialsGridPageFilters = ({
  selectedLevel,
  sort,
  allCategorys = [],
  selectedCategorys = [],
  handleLevelChange,
  handleSortChange,
  handleCategoryChange,
  clearAllFilters,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isExpanded, setIsExpanded] = useState(false);

  const activeFiltersCount =
    (selectedLevel ? 1 : 0) + (sort ? 1 : 0) + (selectedCategorys ? selectedCategorys.length : 0);

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

  const categoryOptions = allCategorys.map(category => ({
    value: category,
    label: toTitleCase(category.replace(/_/g, " ")),
    disabled: selectedCategorys.includes(category),
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
            Clear Filters
          </Button>
        )}
      </Box>
      <Collapse in={isExpanded}>
        <Grid container spacing={1}>
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

          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <Autocomplete
              multiple
              options={categoryOptions}
              getOptionLabel={option => option.label}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Filter By Categorys"
                  fullWidth
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                />
              )}
              renderCategorys={(categoryValues, getCategoryProps) =>
                categoryValues.map((option, index) => (
                  <Chip
                    label={option.label}
                    {...getCategoryProps({ index })}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      fontWeight: "bold",
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
              value={selectedCategorys.map(category => ({
                value: category,
                label: toTitleCase(category.replace(/_/g, " ")),
              }))}
              onChange={(event, newValue) =>
                handleCategoryChange(
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

export default TutorialsGridPageFilters;
