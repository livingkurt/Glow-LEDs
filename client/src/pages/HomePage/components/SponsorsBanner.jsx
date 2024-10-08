import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SponsorsCard from "../../SponsorsGridPage/components/SponsorCard";

const SponsorsBanner = ({ sponsors }) => {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Learn More About Our Sponsors
      </Typography>
      <Button component={Link} to="/sponsors" variant="text" sx={{ mb: 2, color: "#fff" }}>
        View All Sponsors
      </Button>
      <Grid container spacing={3}>
        {sponsors?.map(sponsor => (
          <Grid item key={sponsor._id} xs={12} sm={6} md={4} lg={3}>
            <SponsorsCard affiliate={sponsor} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SponsorsBanner;
