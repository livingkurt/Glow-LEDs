import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";

const ProductProtectionDetails = ({ product_protection_details }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ color: "white", borderRadius: "20px" }} my={{ xs: 2, sm: 4 }}>
      <Box
        sx={{
          display: isMobile ? "block" : "flex",
          overflowX: isMobile ? "visible" : "auto",
          minWidth: "100%",
          justifyContent: "space-around",
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: "4px",
          },
        }}
      >
        {product_protection_details.map((detail, index) => (
          <Box
            key={index}
            sx={{
              minWidth: isMobile ? "100%" : "300px",
              marginRight: isMobile ? 0 : "20px",
              marginBottom: isMobile ? "20px" : 0,
              "&:last-child": {
                marginRight: 0,
                marginBottom: 0,
              },
            }}
          >
            <Box sx={{ textAlign: "center", width: "100%", maxWidth: "300px", margin: "0 auto" }}>
              <Typography variant="h6" gutterBottom>
                {detail.title}
              </Typography>
              <Typography variant="body2">{detail.description}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

ProductProtectionDetails.propTypes = {
  product_protection_details: PropTypes.array,
};

ProductProtectionDetails.defaultProps = {
  product_protection_details: [],
};

export default ProductProtectionDetails;
