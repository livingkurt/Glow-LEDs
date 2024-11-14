import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";

const ProductProtectionDetails = ({ product_protection_details }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    product_protection_details?.length > 0 && (
      <Box
        sx={{
          backgroundColor: "transparent",
          color: theme.palette.common.white,
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

ProductProtectionDetails.propTypes = {
  product_protection_details: PropTypes.array.isRequired,
};

export default ProductProtectionDetails;
