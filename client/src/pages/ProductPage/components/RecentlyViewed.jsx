import React from "react";
import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const RecentlyViewed = () => {
  const recently_viewed_products = JSON.parse(sessionStorage.getItem("recently_viewed")) || [];

  console.log({ recently_viewed_products });

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom textAlign={"center"}>
          Recently Viewed
        </Typography>
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            minWidth: "100%",
            "&::-webkit-scrollbar": {
              height: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              borderRadius: "4px",
            },
          }}
        >
          <Grid container spacing={2}>
            {recently_viewed_products.map(product => (
              <Grid
                item
                xs={3}
                key={product.pathname}
                sx={{
                  minWidth: "250px",
                  width: "100%",
                  marginRight: "20px",
                  "&:last-child": {
                    marginRight: 0,
                  },
                }}
              >
                <Link to={`/collections/all/products/${product.pathname}`}>
                  <Card
                    elevation={0}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      borderRadius: "20px",
                      color: "white",
                      backgroundColor: "transparent",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.image?.link}
                      alt={product.name}
                      sx={{ borderRadius: "20px" }}
                    />
                    <CardContent sx={{ width: "100%", padding: "10px" }}>
                      <Typography variant="subtitle2" component="div">
                        {product.name}
                      </Typography>
                      <Typography variant="body2">${product.price?.toFixed(2) || "N/A"}</Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RecentlyViewed;
