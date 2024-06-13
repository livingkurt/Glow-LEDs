import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const SupportBanner = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" py={4}>
      <Grid container justifyContent="center" mb={2}>
        <Grid item xs={12} sm={6}>
          <img
            alt="Kurt"
            title="Founder Picture"
            style={{
              borderRadius: "20px 0px 0px 20px",
              width: "100%",
              height: "auto",
            }}
            src="https://thumbs2.imgbox.com/74/18/uf9lTIoK_t.jpeg"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box p={5} sx={{ backgroundColor: "#68697e", borderRadius: "0px 20px 20px 0px", height: "100%" }}>
            <Typography variant="h4" align="left" gutterBottom>
              Need support? We're here to assist you every step of the way
            </Typography>
            <Typography variant="body2" align="left" mb={2}>
              Access product support and frequently asked questions in our Support Center
            </Typography>
            <Link to="/pages/contact">
              <Button variant="contained" color="primary">
                Support Center
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SupportBanner;
