import React from "react";
import { Box, Typography, Grid, Paper, useTheme, useMediaQuery } from "@mui/material";

const ProductProtectionDetails = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const protectionDetails = [
    {
      title: "Free Shipping",
      description: "Free ground shipping on orders of $99 or more in the U.S.",
    },
    {
      title: "Free Returns",
      description: "We offer a 30-day return policy, allowing you to shop with confidence.",
    },
    {
      title: "Product Protection",
      description:
        "Rest easy with our manufacturer warranty, ensuring that your product is protected against any manufacturing defects or issues.",
    },
  ];

  return (
    <Box sx={{ color: "white", padding: 4, borderRadius: "20px" }}>
      <Box
        sx={{
          display: isMobile ? "block" : "flex",
          overflowX: isMobile ? "visible" : "auto",
          minWidth: "100%",
          justifyContent: "space-between",
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: "4px",
          },
        }}
      >
        {protectionDetails.map((detail, index) => (
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

export default ProductProtectionDetails;
