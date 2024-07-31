import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Chip,
  Box,
  Autocomplete,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useChipsQuery, useProductsGridQuery } from "../../api/allRecordsApi";
import { useSelector } from "react-redux";
import { random } from "lodash";
import * as API from "../../api";
import { toTitleCase } from "../../utils/helper_functions";

// Utility function to convert string to snake_case
const toSnakeCase = str => str.toLowerCase().replace(/\s+/g, "_");

const sortOptions = [
  { label: "Highest Price", value: "-price" },
  { label: "Lowest Price", value: "price" },
  { label: "Newest", value: "-createdAt" },
  { label: "Oldest", value: "createdAt" },
];

const ProductGridPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const [selectedTags, setSelectedTags] = useState(searchParams.getAll("tags[]"));
  const [selectedChip, setSelectedChip] = useState(searchParams.get("chip") || null);
  const [category, setCategory] = useState(searchParams.get("category") || null);
  const [sort, setSort] = useState(searchParams.get("sort") || null);

  const { current_user } = useSelector(state => state.users.userPage);
  const { data: currentContent } = API.useCurrentContentQuery();
  const { data: chips } = useChipsQuery();

  const {
    data: products,
    isLoading,
    isError,
  } = useProductsGridQuery({
    tags: selectedTags,
    category,
    chip: selectedChip,
    sort,
  });

  const allTags = useMemo(() => {
    if (!products) return [];
    const tagSet = new Set();
    products.forEach(product => {
      product.tags.forEach(tag => {
        if (current_user?.isWholesaler || tag.name.toLowerCase() !== "wholesale") {
          tagSet.add(tag.name);
        }
      });
    });
    return Array.from(tagSet);
  }, [products, current_user?.isWholesaler]);

  const handleTagChange = (event, newValue) => {
    const snakeCaseTags = newValue.map(tag => toSnakeCase(tag));
    setSelectedTags(snakeCaseTags);
    updateUrl(snakeCaseTags, selectedChip, category);
  };

  const handleChipChange = (event, newValue) => {
    setSelectedChip(newValue ? newValue.pathname : null);
    updateUrl(selectedTags, newValue ? newValue.pathname : null, category);
  };
  const handleCategoryChange = (event, newCategory) => {
    setCategory(newCategory);
    updateUrl(selectedTags, selectedChip, newCategory);
  };
  const handleSortChange = (event, newValue) => {
    setSort(newValue ? newValue.value : null);
    updateUrl(selectedTags, selectedChip, category, newValue ? newValue.value : null);
  };

  const updateUrl = (tags, chip, cat, sortValue) => {
    const newSearchParams = new URLSearchParams();
    tags.forEach(tag => newSearchParams.append("tags[]", tag));
    if (chip) newSearchParams.append("chip", chip);
    if (cat) newSearchParams.append("category", cat);
    if (sortValue) newSearchParams.append("sort", sortValue);
    navigate(`${location.pathname}?${newSearchParams.toString()}`);
  };

  const ProductSkeleton = () => (
    <Card sx={{ bgcolor: "transparent", height: "100%", borderRadius: "1rem" }} elevation={0}>
      <Skeleton sx={{ bgcolor: "#4e5061", borderRadius: "20px" }} variant="rectangular" height={300} width={300} />
      <CardContent>
        <Skeleton sx={{ bgcolor: "#4e5061", borderRadius: "20px" }} variant="text" width="80%" />
        <Skeleton sx={{ bgcolor: "#4e5061", borderRadius: "20px" }} variant="text" width="40%" />
        <Skeleton sx={{ bgcolor: "#4e5061", borderRadius: "20px" }} variant="text" width="60%" />
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <Container maxWidth="xl">
        <Typography variant="h4" align="center" pt={2}>
          <Skeleton sx={{ bgcolor: "#4e5061", borderRadius: "20px", margin: "auto" }} width="50%" />
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center" pt={2}>
          <Skeleton sx={{ bgcolor: "#4e5061", borderRadius: "20px", margin: "auto" }} width="70%" />
        </Typography>
        <Box sx={{ mb: 2 }} display="flex" gap={2} justifyContent="space-between" alignItems="center">
          <Skeleton sx={{ bgcolor: "#4e5061", borderRadius: "20px" }} variant="rectangular" width={300} height={56} />
          <Skeleton sx={{ bgcolor: "#4e5061", borderRadius: "20px" }} variant="rectangular" width={300} height={56} />
          <Skeleton sx={{ bgcolor: "#4e5061", borderRadius: "20px" }} variant="rectangular" width={300} height={56} />
        </Box>
        <Grid container spacing={4}>
          {[...Array(12)].map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <ProductSkeleton />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
  if (isError) return <Typography>Error loading products</Typography>;

  const autocompleteStyle = {
    width: "100%",
    mb: 2,
    "& .MuiOutlinedInput-root": {
      color: "white",
      transition: "box-shadow 0.3s ease-in-out",
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&:hover": {
        borderColor: "white",
        boxShadow: `0 12px 24px 0 rgb(255 255 255 / 50%)`,
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
        boxShadow: `0 12px 24px 0 rgb(255 255 255 / 50%)`,
      },
    },
    "& .MuiInputLabel-root": {
      color: "white",
    },
    "& .MuiAutocomplete-popupIndicator": {
      color: "white",
    },
    "& .MuiAutocomplete-clearIndicator": {
      color: "white",
    },
    "& .MuiChip-root": {
      backgroundColor: "white",
      color: "black",
      fontWeight: "bold",
    },
    "& .MuiChip-deleteIcon": {
      color: "black",
    },
  };

  const toggleButtonStyle = {
    color: "white",
    borderColor: "white",
    "&.Mui-selected": {
      backgroundColor: "white",
      color: "black",
      "&:hover": {
        backgroundColor: "white",
      },
    },
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  };
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" align="center" pt={2}>
        {(category && toTitleCase(category)) ||
          (selectedTags.length > 0 && toTitleCase(selectedTags[0])) ||
          currentContent?.products_grid_page?.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" pt={2}>
        {currentContent?.products_grid_page?.subtitle}
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <ToggleButtonGroup
              value={category}
              exclusive
              onChange={handleCategoryChange}
              aria-label="category selection"
              orientation={isMobile ? "vertical" : "horizontal"}
              sx={{ width: "100%", height: "100%" }}
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

      <Grid container spacing={4}>
        {products.length > 0 ? (
          products.map(product => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Link to={`/collections/all/products/${product._id}`} style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    bgcolor: "transparent",
                    height: "100%",
                    transition: "box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: `0 12px 24px 0 hsl(${random(0, 360)}deg 50% 50%)`,
                    },
                    borderRadius: "1rem",
                  }}
                  elevation={0}
                >
                  <Box sx={{ position: "relative", paddingTop: "100%", overflow: "hidden" }}>
                    <CardMedia
                      component="img"
                      image={product.images[0].link}
                      alt={product.name}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "1rem",
                        transition: "border-radius 0.3s ease-in-out",
                        "&:hover": {
                          borderRadius: "1rem 1rem 0 0",
                        },
                      }}
                    />
                  </Box>
                  <CardContent>
                    <Typography variant="h6" color="white">
                      {product.name}
                    </Typography>
                    <Typography variant="body1" color="white">
                      ${product.price.toFixed(2)}
                    </Typography>
                    {product.rating ? <Rating value={product.rating} readOnly /> : null}
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <>
            <Typography variant="h5" textAlign={"center"} width={"100%"} mt={4} gutterBottom>
              No products found for matching criteria
            </Typography>
            <Typography variant="subtitle2" textAlign={"center"} width={"100%"}>
              Try removing some filters to find what you're looking for
            </Typography>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default ProductGridPage;
