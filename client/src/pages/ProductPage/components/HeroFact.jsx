import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const HeroFact = ({ heroFact, text_color, header_text_color }) => {
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
            padding: "14rem 2rem",
            borderRadius: "20px",
          }}
        >
          <Typography
            variant="h4"
            component="h4"
            sx={{
              fontSize: { xs: "4rem", md: "6rem" },
              color: header_text_color ? header_text_color : "white",
              marginBottom: "1rem",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "800px",
              color: text_color ? text_color : "white",
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
