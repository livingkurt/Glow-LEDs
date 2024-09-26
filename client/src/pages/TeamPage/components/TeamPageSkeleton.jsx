import React from "react";
import { Container, Typography, Box, Grid, Card, CardContent, Skeleton, Divider } from "@mui/material";

const TeamPageSkeleton = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box display="flex" justifyContent="space-between">
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={120}
            height={36}
            sx={{ borderRadius: "4px", bgcolor: "#4e5061" }}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={120}
            height={36}
            sx={{ borderRadius: "4px", bgcolor: "#4e5061" }}
          />
        </Box>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={300}
          height={60}
          sx={{ borderRadius: "4px", bgcolor: "#4e5061", margin: "20px auto" }}
        />
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: "20px", bgcolor: "transparent" }} elevation={0}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              height={400}
              sx={{ borderRadius: "20px", bgcolor: "#4e5061" }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ color: "#fff", bgcolor: "#4e5061", borderRadius: "20px" }}>
            <CardContent>
              <Skeleton animation="wave" variant="text" width="60%" height={32} sx={{ mb: 2, bgcolor: "#4e5061" }} />
              <Skeleton animation="wave" variant="text" width="100%" height={20} sx={{ mb: 1, bgcolor: "#4e5061" }} />
              <Skeleton animation="wave" variant="text" width="100%" height={20} sx={{ mb: 1, bgcolor: "#4e5061" }} />
              <Skeleton animation="wave" variant="text" width="80%" height={20} sx={{ mb: 2, bgcolor: "#4e5061" }} />

              <Skeleton animation="wave" variant="text" width="40%" height={32} sx={{ mb: 2, bgcolor: "#4e5061" }} />
              <Skeleton animation="wave" variant="text" width="30%" height={20} sx={{ mb: 2, bgcolor: "#4e5061" }} />

              <Skeleton animation="wave" variant="text" width="50%" height={32} sx={{ mb: 2, bgcolor: "#4e5061" }} />
              <Skeleton animation="wave" variant="text" width="40%" height={20} sx={{ mb: 2, bgcolor: "#4e5061" }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, borderColor: "#fff" }} />

      <Skeleton
        animation="wave"
        variant="rectangular"
        width={250}
        height={40}
        sx={{ borderRadius: "4px", bgcolor: "#4e5061", margin: "0 auto 20px" }}
      />
      <Grid container spacing={3}>
        {[...Array(4)].map((_, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ bgcolor: "transparent", height: "100%", borderRadius: "1rem" }} elevation={0}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                height={200}
                sx={{ borderRadius: "1rem", bgcolor: "#4e5061" }}
              />
              <CardContent>
                <Skeleton animation="wave" variant="text" width="80%" sx={{ mb: 1, bgcolor: "#4e5061" }} />
                <Skeleton animation="wave" variant="text" width="60%" sx={{ mb: 1, bgcolor: "#4e5061" }} />
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="40%"
                  height={36}
                  sx={{ borderRadius: "4px", bgcolor: "#4e5061" }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4, borderColor: "#fff" }} />

      <Skeleton
        animation="wave"
        variant="rectangular"
        width={300}
        height={40}
        sx={{ borderRadius: "4px", bgcolor: "#4e5061", margin: "0 auto 20px" }}
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={400}
        sx={{ borderRadius: "20px", bgcolor: "#4e5061" }}
      />

      <Divider sx={{ my: 4, borderColor: "#fff" }} />

      <Skeleton
        animation="wave"
        variant="rectangular"
        width={250}
        height={40}
        sx={{ borderRadius: "4px", bgcolor: "#4e5061", margin: "0 auto 20px" }}
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={300}
        sx={{ borderRadius: "20px", mb: 4, bgcolor: "#4e5061" }}
      />

      <Skeleton
        animation="wave"
        variant="rectangular"
        width={300}
        height={40}
        sx={{ borderRadius: "4px", bgcolor: "#4e5061", margin: "0 auto 20px" }}
      />
      <Grid container spacing={2} justifyContent="center">
        {[...Array(3)].map((_, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              height={200}
              sx={{ borderRadius: "20px", bgcolor: "#4e5061" }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TeamPageSkeleton;
