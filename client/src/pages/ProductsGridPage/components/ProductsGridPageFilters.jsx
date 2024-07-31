import React, { useState } from "react";
import {
  Grid,
  Container,
  ToggleButtonGroup,
  ToggleButton,
  Autocomplete,
  TextField,
  Chip,
  Button,
  Collapse,
  Box,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import { toTitleCase } from "../../../utils/helper_functions";
import { FilterList } from "@mui/icons-material";
import { autocompleteStyle, toggleButtonStyle } from "../productGridPageHelpers";

const ProductsGridPageFilters = ({
  category,
  chips,
  selectedChip,
  sortOptions,
  sort,
  allTags,
  selectedTags,
  handleCategoryChange,
  handleChipChange,
  handleSortChange,
  handleTagChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box sx={{ my: 2 }}>
      <Button
        variant="contained"
        onClick={() => setIsExpanded(!isExpanded)}
        sx={{
          mb: 2,
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
              options={chips || []}
              getOptionLabel={option => option.name}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Filter By Chip"
                  fullWidth
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                />
              )}
              value={chips?.find(c => c.pathname === selectedChip) || null}
              onChange={handleChipChange}
              sx={autocompleteStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Autocomplete
              options={sortOptions}
              getOptionLabel={option => option.label}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Sort By"
                  fullWidth
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                />
              )}
              value={sortOptions.find(option => option.value === sort) || null}
              onChange={handleSortChange}
              sx={autocompleteStyle}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Autocomplete
              multiple
              options={allTags}
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
                    label={toTitleCase(option)}
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
              value={selectedTags.map(tag => tag.replace(/_/g, " "))}
              onChange={handleTagChange}
              sx={autocompleteStyle}
            />
          </Grid>
        </Grid>
      </Collapse>
    </Box>
  );
};

export default ProductsGridPageFilters;
