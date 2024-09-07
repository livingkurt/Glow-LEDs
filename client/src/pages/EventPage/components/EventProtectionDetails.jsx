import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const EventProtectionDetails = () => {
  return (
    <Paper sx={{ color: "white", backgroundColor: "#00000021", padding: 4, borderRadius: "10px" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Box sx={{ textAlign: "center", width: "100%", maxWidth: "300px", margin: "0 auto" }}>
            <Typography variant="h6" gutterBottom>
              Free Shipping
            </Typography>
            <Typography variant="body2">Free ground shipping on orders of $99 or more in the U.S.</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ textAlign: "center", width: "100%", maxWidth: "300px", margin: "0 auto" }}>
            <Typography variant="h6" gutterBottom>
              Free Returns
            </Typography>
            <Typography variant="body2">
              We offer a 30-day return policy, allowing you to shop with confidence.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ textAlign: "center", width: "100%", maxWidth: "300px", margin: "0 auto" }}>
            <Typography variant="h6" gutterBottom>
              Event Protection
            </Typography>
            <Typography variant="body2">
              Rest easy with our manufacturer warranty, ensuring that your product is protected against any
              manufacturing defects or issues.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EventProtectionDetails;
