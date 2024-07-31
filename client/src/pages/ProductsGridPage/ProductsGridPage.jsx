import React, { useMemo } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Container, Grid, Typography, Card, CardContent, CardMedia, Rating, Chip, Box } from "@mui/material";
import { useChipsQuery, useProductsGridQuery } from "../../api/allRecordsApi";
import { useSelector } from "react-redux";
import { random } from "lodash";
import * as API from "../../api";
import { toTitleCase } from "../../utils/helper_functions";

const ProductGridPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const tags = searchParams.getAll("tags[]");
  const category = searchParams.get("category");
  const chip = searchParams.get("chip");

  const { current_user } = useSelector(state => state.users.userPage);

  const { data: currentContent } = API.useCurrentContentQuery();

  const {
    data: products,
    isLoading,
    isError,
  } = useProductsGridQuery({
    tags,
    category,
    chip,
  });

  const { data: chips } = useChipsQuery();

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

  const handleTagClick = tagName => {
    const formattedTagName = tagName.toLowerCase().replace(/\s+/g, "_");
    const newTags = tags.includes(formattedTagName)
      ? tags.filter(t => t !== formattedTagName)
      : [...tags, formattedTagName];

    const newSearchParams = new URLSearchParams();
    newTags.forEach(tag => newSearchParams.append("tags[]", tag));
    if (category) newSearchParams.append("category", category);

    navigate(`${location.pathname}?${newSearchParams.toString()}`);
  };

  const handleCategoryClick = categoryName => {
    const newSearchParams = new URLSearchParams();
    if (categoryName !== category) {
      newSearchParams.append("category", categoryName);
    }
    tags.forEach(tag => newSearchParams.append("tags[]", tag));

    navigate(`${location.pathname}?${newSearchParams.toString()}`);
  };

  const handleChipClick = chipPathname => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (chip === chipPathname) {
      newSearchParams.delete("chip");
    } else {
      newSearchParams.set("chip", chipPathname);
    }
    navigate(`${location.pathname}?${newSearchParams.toString()}`);
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading products</Typography>;

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" align="center" pt={2}>
        {(category && toTitleCase(category)) ||
          (tags && tags.length > 0 && toTitleCase(tags[0])) ||
          currentContent?.products_grid_page?.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" pt={2}>
        {currentContent?.products_grid_page?.subtitle}
      </Typography>
      <Box sx={{ mb: 2 }}>
        {chips &&
          chips.map(chipItem => (
            <Chip
              key={chipItem.pathname}
              label={chipItem.name}
              onClick={() => handleChipClick(chipItem.pathname)}
              sx={{
                m: 0.5,
                backgroundColor: chip === chipItem.pathname ? "white" : "transparent",
                color: chip === chipItem.pathname ? "black" : "white",
                border: "1px solid white",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            />
          ))}
      </Box>
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
              fontSize: "1rem",
              fontWeight: "500",
            }}
          />
        ))}
      </Box>

      <Box sx={{ mb: 2 }}>
        {allTags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => handleTagClick(tag)}
            sx={{
              m: 0.5,
              backgroundColor: tags.includes(tag.toLowerCase().replace(/\s+/g, "_")) ? "white" : "transparent",
              color: tags.includes(tag.toLowerCase().replace(/\s+/g, "_")) ? "black" : "white",
              border: "1px solid white",
              fontSize: "1rem",
              fontWeight: "500",
            }}
          />
        ))}
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
