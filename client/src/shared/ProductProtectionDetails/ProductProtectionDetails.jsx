import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import * as API from "../../api";

const ProductProtectionDetails = ({ transparent }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: currentContent } = API.useCurrentContentQuery();
  const product_protection_details = currentContent?.home_page?.product_protection_details;

  return (
    product_protection_details?.length > 0 && (
      <Box
        sx={{
          color: "white",
          backgroundColor: transparent ? "transparent" : "#4d5061",
          overflow: "hidden", // This ensures the inner content doesn't overflow the rounded corners
        }}
      >
        <Box
          sx={{
            padding: { xs: 2, sm: 4 },
            overflowX: isMobile ? "visible" : "auto",
            overflowY: "hidden",
            "&::-webkit-scrollbar": {
              height: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              borderRadius: "4px",
            },
          }}
        >
          <Box
            sx={{
              display: isMobile ? "block" : "flex",
              minWidth: "100%",
              justifyContent: "space-around",
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
      </Box>
    )
  );
};

export default ProductProtectionDetails;
