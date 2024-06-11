import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const SupportBanner = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      px={2}
      py={4}
      // bgcolor="grey.100"
    >
      <Typography variant="h6" align="center" gutterBottom>
        Need support? We're here to assist you every step of the way
      </Typography>
      <Typography variant="body2" align="center" mb={2}>
        Access product support and frequently asked questions in our Support Center
      </Typography>
      <Link to="/pages/contact">
        <Button variant="contained" color="primary">
          Support Center
        </Button>
      </Link>
    </Box>
  );
};

export default SupportBanner;
