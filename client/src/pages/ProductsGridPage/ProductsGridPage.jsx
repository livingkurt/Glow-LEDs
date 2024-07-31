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
} from "@mui/material";
import { useChipsQuery, useProductsGridQuery } from "../../api/allRecordsApi";
import { useSelector } from "react-redux";
import { random } from "lodash";
import * as API from "../../api";
import { toTitleCase } from "../../utils/helper_functions";

// Utility function to convert string to snake_case
const toSnakeCase = str => str.toLowerCase().replace(/\s+/g, "_");

const ProductGridPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const [selectedTags, setSelectedTags] = useState(searchParams.getAll("tags[]"));
  const [selectedChip, setSelectedChip] = useState(searchParams.get("chip") || null);
  const category = searchParams.get("category");

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

  const handleCategoryClick = categoryName => {
    const newCategory = categoryName !== category ? categoryName : null;
    updateUrl(selectedTags, selectedChip, newCategory);
  };

  const updateUrl = (tags, chip, cat) => {
    const newSearchParams = new URLSearchParams();
    tags.forEach(tag => newSearchParams.append("tags[]", tag));
    if (chip) newSearchParams.append("chip", chip);
    if (cat) newSearchParams.append("category", cat);
    navigate(`${location.pathname}?${newSearchParams.toString()}`);
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading products</Typography>;

  const autocompleteStyle = {
    width: 300,
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

      <Box sx={{ mb: 2 }} display={"flex"} gap={2} justifyContent={"space-between"} alignItems={"center"}>
        <Autocomplete
          options={chips || []}
          getOptionLabel={option => option.name}
          renderInput={params => (
            <TextField
              {...params}
              label="Filter By Chip"
              InputLabelProps={{
                style: { color: "white" },
              }}
            />
          )}
          value={chips?.find(c => c.pathname === selectedChip) || null}
          onChange={handleChipChange}
          sx={autocompleteStyle}
        />

        <Box sx={{ mb: 2 }}>
          {["best_sellers", "our_picks", "discounted"].map(cat => (
            <Chip
              key={cat}
              label={cat.replace("_", " ").toUpperCase()}
              onClick={() => handleCategoryClick(cat)}
              sx={{
                m: 0.5,
                backgroundColor: category === cat ? "white" : "transparent",
                color: category === cat ? "black" : "white",
                border: "1px solid white",
                fontSize: "1.5rem",
                fontWeight: "500",
              }}
            />
          ))}
        </Box>

        <Autocomplete
          multiple
          options={allTags}
          renderInput={params => (
            <TextField
              {...params}
              label="Filter By Tags"
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
      </Box>

      <Grid container spacing={4}>
        {products &&
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
          ))}
      </Grid>
    </Container>
  );
};

export default ProductGridPage;
