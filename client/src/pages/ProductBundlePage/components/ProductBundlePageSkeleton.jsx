import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
const ProductBundlePageSkeleton = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Skeleton variant="rectangular" width={300} height={32} sx={{ bgcolor: "#4e5061", borderRadius: "4px" }} />
        <Skeleton variant="rectangular" width={120} height={32} sx={{ bgcolor: "#4e5061", borderRadius: "4px" }} />
      </Box>

      <Container maxWidth="xl" sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          {/* Left side - Product Images */}
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={400}
              sx={{ bgcolor: "#4e5061", borderRadius: "20px" }}
            />

            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              {[...Array(4)].map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width={80}
                  height={80}
                  sx={{ bgcolor: "#4e5061", borderRadius: "10px" }}
                />
              ))}
            </Box>
          </Grid>

          {/* Right side - Bundle Details */}
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <Skeleton
                variant="rectangular"
                width="80%"
                height={40}
                sx={{ bgcolor: "#4e5061", borderRadius: "4px", mb: 2 }}
              />

              <Skeleton
                variant="rectangular"
                width="60%"
                height={30}
                sx={{ bgcolor: "#4e5061", borderRadius: "4px", mb: 2 }}
              />

              <Skeleton
                variant="rectangular"
                width="40%"
                height={24}
                sx={{ bgcolor: "#4e5061", borderRadius: "4px", mb: 3 }}
              />

              <Skeleton
                variant="rectangular"
                width="100%"
                height={80}
                sx={{ bgcolor: "#4e5061", borderRadius: "4px", mb: 3 }}
              />

              <Skeleton
                variant="rectangular"
                width="30%"
                height={32}
                sx={{ bgcolor: "#4e5061", borderRadius: "4px", mb: 3 }}
              />

              {/* Add to Cart Button */}
              <Skeleton
                variant="rectangular"
                width="100%"
                height={56}
                sx={{ bgcolor: "#4e5061", borderRadius: "4px", mb: 3 }}
              />

              {/* Bundle Items List */}
              <Box sx={{ mt: 3 }}>
                <Skeleton
                  variant="rectangular"
                  width="40%"
                  height={32}
                  sx={{ bgcolor: "#4e5061", borderRadius: "4px", mb: 2 }}
                />

                {[...Array(3)].map((_, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={80}
                      sx={{ bgcolor: "#4e5061", borderRadius: "4px" }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Bundle Items Section */}
      <Box mt={4} sx={{ backgroundColor: "#333333", py: 4 }}>
        <Container maxWidth="xl">
          <Skeleton
            variant="rectangular"
            width={200}
            height={40}
            sx={{ bgcolor: "#4e5061", borderRadius: "4px", mb: 3 }}
          />

          {[...Array(3)].map((_, index) => (
            <Box key={index} sx={{ mb: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={300}
                    sx={{ bgcolor: "#4e5061", borderRadius: "8px" }}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Box sx={{ p: 3 }}>
                    <Skeleton
                      variant="rectangular"
                      width="60%"
                      height={32}
                      sx={{ bgcolor: "#4e5061", borderRadius: "4px", mb: 2 }}
                    />

                    <Skeleton
                      variant="rectangular"
                      width="40%"
                      height={24}
                      sx={{ bgcolor: "#4e5061", borderRadius: "4px", mb: 2 }}
                    />

                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={80}
                      sx={{ bgcolor: "#4e5061", borderRadius: "4px", mb: 2 }}
                    />

                    <Skeleton
                      variant="rectangular"
                      width={120}
                      height={36}
                      sx={{ bgcolor: "#4e5061", borderRadius: "4px" }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Container>
      </Box>
    </Box>
  );
};

export default ProductBundlePageSkeleton;
