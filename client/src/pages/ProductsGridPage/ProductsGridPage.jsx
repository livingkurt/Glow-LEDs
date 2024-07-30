import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Grid, Typography, Card, CardContent, CardMedia, Rating, Chip, Box } from "@mui/material";
import { useProductsGridQuery } from "../../api/allRecordsApi";
import { useSelector } from "react-redux";

const ProductGridPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const tags = searchParams.getAll("tags[]");

  const { current_user } = useSelector(state => state.users.userPage);

  const {
    data: products,
    isLoading,
    isError,
  } = useProductsGridQuery({
    tags,
    isWholesaler: current_user?.isWholesaler,
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

  const handleTagClick = tagName => {
    const newTags = tags.includes(tagName.toLowerCase())
      ? tags.filter(t => t.toLowerCase() !== tagName.toLowerCase())
      : [...tags, tagName.toLowerCase()];

    const newUrl = `${location.pathname}?${newTags.map(tag => `tags[]=${tag}`).join("&")}`;
    navigate(newUrl);
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading products</Typography>;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Our Products
      </Typography>

      <Box sx={{ mb: 2 }}>
        {allTags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => handleTagClick(tag)}
            sx={{
              m: 0.5,
              backgroundColor: tags.includes(tag.toLowerCase()) ? "white" : "transparent",
              color: tags.includes(tag.toLowerCase()) ? "black" : "white",
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
              <Card>
                <CardMedia component="img" height="200" image={product.images[0].link} alt={product.name} />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price.toFixed(2)}
                  </Typography>
                  {product.rating ? <Rating value={product.rating} readOnly /> : null}
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default ProductGridPage;
