import { Typography, Grid, Container, Paper, useTheme } from "@mui/material";
import React from "react";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";

const CategoryBanner = ({ banner }) => {
  const theme = useTheme();
  if (!banner) return null;

  return (
    <Paper
      sx={{
        backgroundColor: banner.background_color || theme.palette.primary.main,
        color: "white",
        py: "2rem",
      }}
      elevation={5}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={9}>
            <Typography variant="h4">{banner.title}</Typography>
            <Typography variant="subtitle1">{banner.subtitle}</Typography>
            <Typography variant="body1">{banner.short_description}</Typography>
            <Typography variant="body2">{banner.fact}</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <GLLazyImage
              src={banner?.image?.link}
              alt={banner.title}
              style={{ width: "100%", height: "auto", aspectRatio: "16/9", objectFit: "cover", borderRadius: "1rem" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default CategoryBanner;
