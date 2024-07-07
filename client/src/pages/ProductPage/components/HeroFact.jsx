import React from "react";
import { Box, Typography } from "@mui/material";

const HeroFact = ({ heroFact }) => {
  if (!heroFact || heroFact.hidden) return null;

  const { title, description } = heroFact;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "4rem 2rem",
      }}
    >
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontSize: { xs: "2rem", md: "3rem" },
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h4"
        component="p"
        sx={{
          fontSize: { xs: "1.25rem", md: "1.5rem" },
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default HeroFact;
