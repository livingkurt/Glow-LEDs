import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { toTitleCase } from "../../../utils/helper_functions";

const CompareModels = ({ category }) => {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          backgroundColor: "#00000021",
          padding: "40px",
          textAlign: "center",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Not sure which {toTitleCase(category)} are right for you?
        </Typography>
        <Button variant="contained" color="primary">
          Compare All Products
        </Button>
      </Box>
    </Container>
  );
};

export default CompareModels;
