import React from "react";
import PropTypes from "prop-types";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ElevateYourExperience = ({ elevateYourExperience }) => {
  const { title, description, products, hidden } = elevateYourExperience;

  if (hidden && title) {
    return null;
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" paragraph>
        {description}
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
        {products?.map(product => (
          <Box
            sx={{
              minWidth: "250px", // Change minWidth to 250px
              width: "100%", // Add width: 100% to make the item fill the available space
              marginRight: "20px",
              "&:last-child": {
                marginRight: 0,
              },
            }}
          >
            <Link to={`/collections/all/products/${product.pathname}`} key={product.pathname}>
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
                  image={product?.images[0]?.link}
                  alt={product.name}
                  sx={{ borderRadius: "20px" }}
                />
                <CardContent sx={{ width: "100%", padding: "10px" }}>
                  <Typography variant="subtitle2" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2">${product?.price?.toFixed(2)}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

ElevateYourExperience.propTypes = {
  elevateYourExperience: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    products: PropTypes.array,
    hidden: PropTypes.bool,
  }),
};

ElevateYourExperience.defaultProps = {
  elevateYourExperience: {
    title: "Elevate Your Listening Experience",
    description: "Add any of the products below to your cart along with the MW75 and save 10% with code MW75BUNDLE",
    products: [],
    hidden: false,
  },
};

export default ElevateYourExperience;
