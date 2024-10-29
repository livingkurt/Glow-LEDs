import React from "react";
import { Container, Box, Grid, Card, CardContent, Skeleton, Divider } from "@mui/material";

const SponsorPageSkeleton = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box display="flex" justifyContent="space-between">
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={150}
            height={36}
            sx={{ bgcolor: "#4e5061", borderRadius: "4px" }}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={150}
            height={36}
            sx={{ bgcolor: "#4e5061", borderRadius: "4px" }}
          />
        </Box>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={300}
          height={60}
          sx={{ bgcolor: "#4e5061", borderRadius: "4px", margin: "20px auto" }}
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
              sx={{ bgcolor: "#4e5061", borderRadius: "20px" }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ color: "#fff", bgcolor: "#4e5061", borderRadius: "20px" }}>
            <CardContent>
              {[...Array(6)].map((_, index) => (
                <React.Fragment key={index}>
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width="40%"
                    height={28}
                    sx={{ bgcolor: "#5c6281", mb: 1 }}
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width="80%"
                    height={20}
                    sx={{ bgcolor: "#5c6281", mb: 2 }}
                  />
                </React.Fragment>
              ))}
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={200}
                height={36}
                sx={{ bgcolor: "#4e5061", borderRadius: "4px", mb: 2 }}
              />
              <Skeleton animation="wave" variant="text" width="40%" height={28} sx={{ bgcolor: "#5c6281", mb: 1 }} />
              <Box sx={{ display: "flex", gap: 2 }}>
                {[...Array(5)].map((_, index) => (
                  <Skeleton
                    key={index}
                    animation="wave"
                    variant="circular"
                    width={40}
                    height={40}
                    sx={{ bgcolor: "#5c6281" }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, borderColor: "#fff" }} />

      <Skeleton
        animation="wave"
        variant="rectangular"
        width={300}
        height={40}
        sx={{ bgcolor: "#4e5061", borderRadius: "4px", margin: "0 auto 20px" }}
      />
      <Grid container spacing={3}>
        {[...Array(4)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ height: "100%", bgcolor: "#4e5061", borderRadius: "1rem" }} elevation={0}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                height={200}
                sx={{ bgcolor: "#4e5061", borderRadius: "1rem" }}
              />
              <CardContent>
                <Skeleton animation="wave" variant="text" width="80%" sx={{ mb: 1 }} />
                <Skeleton animation="wave" variant="text" width="60%" sx={{ mb: 1 }} />
                <Skeleton animation="wave" variant="text" width="40%" />
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
        sx={{ bgcolor: "#4e5061", borderRadius: "4px", margin: "0 auto 20px" }}
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={400}
        sx={{ bgcolor: "#4e5061", borderRadius: "20px" }}
      />
    </Container>
  );
};

export default SponsorPageSkeleton;
