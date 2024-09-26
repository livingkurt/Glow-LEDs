import React from "react";
import { Container, Grid, Typography, Card, CardContent, Box, Skeleton } from "@mui/material";

const TeamsGridPageSkeletons = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        <Skeleton
          animation="wave"
          sx={{ bgcolor: "#4e5061", borderRadius: "20px", margin: "auto" }}
          width={300}
          variant="rectangular"
          height={48}
        />
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        <Skeleton
          animation="wave"
          sx={{ bgcolor: "#4e5061", borderRadius: "20px", margin: "auto" }}
          width="80%"
          variant="rectangular"
          height={24}
        />
      </Typography>

      <Grid container spacing={2}>
        {[...Array(8)].map((_, index) => (
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
                  width="70%"
                />
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: "#4e5061", borderRadius: "20px" }}
                  variant="text"
                  width="50%"
                />
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: "#4e5061", borderRadius: "20px", mt: 1 }}
                  variant="rectangular"
                  height={32}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TeamsGridPageSkeletons;
