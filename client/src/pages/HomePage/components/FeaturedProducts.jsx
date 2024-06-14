import { Box, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const FeaturedProducts = ({ featured_products }) => {
  return (
    featured_products.length > 0 && (
      <Box>
        <Typography variant="h4" component="h2" align="left" gutterBottom>
          Featured Products
        </Typography>
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            minWidth: "100%",
            "&::-webkit-scrollbar": {
              height: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              borderRadius: "4px",
            },
          }}
        >
          {featured_products?.map(product => (
            <Box
              key={product.id}
              sx={{
                minWidth: "250px", // Change minWidth to 250px
                width: "100%", // Add width: 100% to make the item fill the available space
                marginRight: "20px",
                "&:last-child": {
                  marginRight: 0,
                },
              }}
            >
              <Card
                elevation={0}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "20px",
                  color: "white",
                  backgroundColor: "transparent",
                }}
              >
                <CardMedia
                  component="img"
                  image={product?.images_object[0]?.link}
                  alt={product.name}
                  sx={{ borderRadius: "20px" }}
                />
                <CardContent sx={{ width: "100%", padding: "10px" }}>
                  <Typography variant="subtitle2" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2">${product?.price?.toFixed(2)}</Typography>
                  <Button variant="contained" sx={{ marginTop: "10px" }}>
                    Add To Cart
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    )
  );
};

FeaturedProducts.propTypes = {
  featured_products: PropTypes.array,
};

FeaturedProducts.defaultProps = {
  featured_products: [],
};

export default FeaturedProducts;
