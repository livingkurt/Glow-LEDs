import React from "react";
import { Box, Container, Grid, Skeleton, useMediaQuery, useTheme } from "@mui/material";

const ProductPageLoading = ({ loading, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!loading) {
    return children;
  }

  return (
    <Container maxWidth="xl">
      <Box mt={2} mb={2}>
        <Skeleton
          sx={{ bgcolor: "#4e5061", borderRadius: "20px" }}
          animation="wave"
          variant="text"
          width={300}
          height={30}
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Skeleton
            sx={{ bgcolor: "#4e5061", borderRadius: "20px" }}
            animation="wave"
            variant="rectangular"
            width="100%"
            height={isMobile ? 500 : 700}
          />
          <Box mt={2} display="flex" justifyContent="center">
            {[...Array(6)].map((_, index) => (
              <Skeleton
                sx={{ bgcolor: "#4e5061", borderRadius: "5px" }}
                animation="wave"
                key={index}
                variant="rectangular"
                width={50}
                height={50}
                style={{ margin: "0 5px" }}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Skeleton
            sx={{ bgcolor: "#4e5061", borderRadius: "10px" }}
            animation="wave"
            variant="text"
            width="80%"
            height={40}
          />
          <Skeleton
            sx={{ bgcolor: "#4e5061", borderRadius: "10px" }}
            animation="wave"
            variant="text"
            width="60%"
            height={30}
          />
          <Box mt={2} mb={2}>
            <Skeleton
              sx={{ bgcolor: "#4e5061", borderRadius: "10px" }}
              animation="wave"
              variant="text"
              width="40%"
              height={30}
            />
          </Box>
          <Skeleton
            sx={{ bgcolor: "#4e5061", borderRadius: "10px" }}
            animation="wave"
            variant="text"
            width="30%"
            height={30}
          />

          {/* Color options */}
          <Box mt={2} mb={2}>
            <Skeleton
              sx={{ bgcolor: "#4e5061", borderRadius: "10px" }}
              animation="wave"
              variant="text"
              width="40%"
              height={24}
            />
            <Box display="flex" mt={1}>
              {[...Array(8)].map((_, index) => (
                <Skeleton
                  sx={{ bgcolor: "#4e5061", borderRadius: "10px" }}
                  animation="wave"
                  key={index}
                  variant="circular"
                  width={50}
                  height={40}
                  style={{ margin: "0 5px" }}
                />
              ))}
            </Box>
          </Box>

          {/* Sled Color options */}
          <Box mt={2} mb={2}>
            <Skeleton
              sx={{ bgcolor: "#4e5061", borderRadius: "10px" }}
              animation="wave"
              variant="text"
              width="40%"
              height={24}
            />
            <Box display="flex" mt={1}>
              {[...Array(8)].map((_, index) => (
                <Skeleton
                  sx={{ bgcolor: "#4e5061", borderRadius: "10px" }}
                  animation="wave"
                  key={index}
                  variant="circular"
                  width={50}
                  height={40}
                  style={{ margin: "0 5px" }}
                />
              ))}
            </Box>
          </Box>

          {/* Set of */}
          <Box mt={2} mb={2}>
            <Skeleton
              sx={{ bgcolor: "#4e5061", borderRadius: "5px" }}
              animation="wave"
              variant="text"
              width="20%"
              height={24}
            />
            <Skeleton
              sx={{ bgcolor: "#4e5061", borderRadius: "5px" }}
              animation="wave"
              variant="rectangular"
              width="100%"
              height={40}
            />
          </Box>

          {/* Included Product */}
          <Box mt={2} mb={2}>
            <Skeleton
              sx={{ bgcolor: "#4e5061", borderRadius: "5px" }}
              animation="wave"
              variant="text"
              width="40%"
              height={24}
            />
            <Skeleton
              sx={{ bgcolor: "#4e5061", borderRadius: "5px" }}
              animation="wave"
              variant="rectangular"
              width="100%"
              height={40}
            />
          </Box>

          {/* Quantity */}
          <Box mt={2} mb={2}>
            <Skeleton
              sx={{ bgcolor: "#4e5061", borderRadius: "5px" }}
              animation="wave"
              variant="text"
              width="30%"
              height={24}
            />
            <Skeleton
              sx={{ bgcolor: "#4e5061", borderRadius: "5px" }}
              animation="wave"
              variant="rectangular"
              width="100%"
              height={40}
            />
          </Box>

          {/* Add to Cart button */}
          <Box mt={2}>
            <Skeleton
              sx={{ bgcolor: "#4e5061", borderRadius: "5px" }}
              animation="wave"
              variant="rectangular"
              width="100%"
              height={50}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Features, Tech Specs, Support sections */}
      <Box mt={4}>
        <Grid container spacing={2}>
          {["Features", "Tech Specs", "Support"].map((section, index) => (
            <Grid item xs={12} key={index}>
              <Skeleton
                sx={{ bgcolor: "#4e5061", borderRadius: "5px" }}
                animation="wave"
                variant="text"
                width="30%"
                height={30}
              />
              <Skeleton
                sx={{ bgcolor: "#4e5061", borderRadius: "5px" }}
                animation="wave"
                variant="rectangular"
                width="100%"
                height={100}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductPageLoading;
