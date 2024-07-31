import React from "react";
import { Container, Grid, Typography, Card, CardContent, Box, Skeleton } from "@mui/material";

const ProductsGridPageSkeletons = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" align="center" pt={2}>
        <Skeleton
          animation="wave"
          sx={{ bgcolor: "#4e5061", borderRadius: "20px", margin: "auto" }}
          width={400}
          variant="rectangular"
          height={56}
        />
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" pt={2} mb={2}>
        <Skeleton
          animation="wave"
          sx={{ bgcolor: "#4e5061", borderRadius: "20px", margin: "auto" }}
          width="70%"
          variant="rectangular"
          height={30}
        />
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <Skeleton
              animation="wave"
              sx={{ bgcolor: "#4e5061", borderRadius: "10px" }}
              variant="rectangular"
              width="100%"
              height={20}
            />
          </Container>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Skeleton
            animation="wave"
            sx={{ bgcolor: "#4e5061", borderRadius: "10px" }}
            variant="rectangular"
            width="100%"
            height={56}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Skeleton
            animation="wave"
            sx={{ bgcolor: "#4e5061", borderRadius: "10px" }}
            variant="rectangular"
            width="100%"
            height={56}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Skeleton
            animation="wave"
            sx={{ bgcolor: "#4e5061", borderRadius: "10px" }}
            variant="rectangular"
            width="100%"
            height={56}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {[...Array(24)].map((_, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ bgcolor: "transparent", height: "100%", borderRadius: "1rem" }} elevation={0}>
              <Box sx={{ position: "relative", paddingTop: "100%", overflow: "hidden" }}>
                <Skeleton
                  animation="wave"
                  sx={{
                    bgcolor: "#4e5061",
                    borderRadius: "1rem",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  variant="rectangular"
                />
              </Box>
              <CardContent>
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: "#4e5061", borderRadius: "20px" }}
                  variant="text"
                  width="80%"
                />
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: "#4e5061", borderRadius: "20px" }}
                  variant="text"
                  width="40%"
                />
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: "#4e5061", borderRadius: "20px" }}
                  variant="text"
                  width="60%"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsGridPageSkeletons;
