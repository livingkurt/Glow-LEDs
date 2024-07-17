import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const CompareModels = ({ notSure }) => {
  if (notSure?.hidden || !notSure) {
    return null;
  }

  return (
    <>
      {notSure.title && (
        <Box
          sx={{
            backgroundColor: "#00000021",
            padding: "40px",
            textAlign: "center",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            {notSure.title}
          </Typography>
          <Link to={notSure.link}>
            <Button variant="contained" color="primary">
              {notSure.button_text}
            </Button>
          </Link>
        </Box>
      )}
    </>
  );
};

export default CompareModels;
