import React from "react";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
const RecentlyViewed = ({ currentProduct }) => {
  const recently_viewed_products = JSON.parse(sessionStorage.getItem("recently_viewed")) || [];

  // Filter out the current product from the recently viewed list
  const filteredProducts = recently_viewed_products.filter(product => product?.name !== currentProduct?.name);

  // If there are no products to display after filtering, don't render the component
  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom textAlign="center">
        {"Recently Viewed"}
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
        {filteredProducts.map(product => (
          <Box
            key={product.id}
            sx={{
              minWidth: "250px",
              maxWidth: "300px",
              width: "100%",
              marginRight: "20px",
              "&:last-child": {
                marginRight: 0,
              },
            }}
          >
            <Link to={`/products/${product.pathname}`}>
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
                <Box sx={{ width: "100%", paddingTop: "100%", position: "relative" }}>
                  <CardMedia
                    component="img"
                    image={product.image?.link}
                    alt={product.name}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      borderRadius: "20px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <CardContent sx={{ width: "100%", padding: "10px" }}>
                  <Typography variant="subtitle2" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2">
                    {"$"}
                    {product.price?.toFixed(2) || "N/A"}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

RecentlyViewed.propTypes = {
  currentProduct: PropTypes.object.isRequired,
};

export default RecentlyViewed;
