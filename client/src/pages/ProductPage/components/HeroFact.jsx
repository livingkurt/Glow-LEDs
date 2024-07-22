import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const HeroFact = ({ heroFact }) => {
  const theme = useTheme();
  if (!heroFact || heroFact.hidden) return null;

  const { title, description } = heroFact;

  return (
    <>
      {(title || description) && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "4rem 2rem",
            borderRadius: "20px",
            backgroundColor: theme.palette.primary.main,
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
      )}
    </>
  );
};

export default HeroFact;
