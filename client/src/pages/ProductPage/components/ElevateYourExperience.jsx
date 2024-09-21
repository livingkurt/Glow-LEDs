import React from "react";
import PropTypes from "prop-types";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ProductCard from "../../ProductsGridPage/components/ProductCard";

const ElevateYourExperience = ({ elevateYourExperience, text_color, header_text_color }) => {
  const { title, description, products, hidden } = elevateYourExperience;

  if (hidden && title) {
    return null;
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom color={header_text_color ? header_text_color : "white"}>
        {title}
      </Typography>
      <Typography variant="body1" paragraph color={text_color ? text_color : "white"}>
        {description}
      </Typography>
      <Box
        sx={{
          pb: 6,
          px: 2,
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
            <ProductCard product={product} />
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
