import React from "react";
import { Box, Typography, Grid, Skeleton } from "@mui/material";

const AcademyPageSkeleton = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h2" gutterBottom>
        <Skeleton animation="wave" sx={{ bgcolor: "#4e5061", borderRadius: "20px" }} width="60%" height={60} />
      </Typography>
      <Typography variant="h5" gutterBottom>
        <Skeleton animation="wave" sx={{ bgcolor: "#4e5061", borderRadius: "20px" }} width="80%" height={30} />
      </Typography>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          <Skeleton animation="wave" sx={{ bgcolor: "#4e5061", borderRadius: "20px" }} width="40%" height={40} />
        </Typography>
        <Grid container spacing={3}>
          {[...Array(3)].map((_, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Box>
                <Typography variant="h6">
                  <Skeleton
                    animation="wave"
                    sx={{ bgcolor: "#4e5061", borderRadius: "20px" }}
                    width="80%"
                    height={30}
                  />
                </Typography>
                <Typography variant="body2">
                  <Skeleton
                    animation="wave"
                    sx={{ bgcolor: "#4e5061", borderRadius: "20px" }}
                    width="100%"
                    height={60}
                  />
                </Typography>
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: "#4e5061", borderRadius: "20px", mt: 2 }}
                  width={120}
                  height={36}
                  variant="rectangular"
                />
              </Box>
            </Grid>
          ))}
        </Grid>
        <Skeleton
          animation="wave"
          sx={{ bgcolor: "#4e5061", borderRadius: "20px", mt: 2 }}
          width={150}
          height={36}
          variant="rectangular"
        />
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          <Skeleton animation="wave" sx={{ bgcolor: "#4e5061", borderRadius: "20px" }} width="40%" height={40} />
        </Typography>
        <Grid container spacing={3}>
          {[...Array(3)].map((_, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Box>
                <Typography variant="h6">
                  <Skeleton
                    animation="wave"
                    sx={{ bgcolor: "#4e5061", borderRadius: "20px" }}
                    width="80%"
                    height={30}
                  />
                </Typography>
                <Typography variant="body2">
                  <Skeleton
                    animation="wave"
                    sx={{ bgcolor: "#4e5061", borderRadius: "20px" }}
                    width="100%"
                    height={60}
                  />
                </Typography>
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: "#4e5061", borderRadius: "20px", mt: 2 }}
                  width={120}
                  height={36}
                  variant="rectangular"
                />
              </Box>
            </Grid>
          ))}
        </Grid>
        <Skeleton
          animation="wave"
          sx={{ bgcolor: "#4e5061", borderRadius: "20px", mt: 2 }}
          width={150}
          height={36}
          variant="rectangular"
        />
      </Box>
    </Box>
  );
};

export default AcademyPageSkeleton;
