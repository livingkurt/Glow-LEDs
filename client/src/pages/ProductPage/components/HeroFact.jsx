import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const HeroFact = ({ heroFact, text_color, secondary_color, header_text_color }) => {
  const theme = useTheme();
  if (!heroFact || heroFact.hidden) return null;

  const { title, description, subtitle } = heroFact;

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
              fontSize: { xs: "6rem", md: "8rem" },
              color: secondary_color ? secondary_color : "white",
              marginBottom: "1rem",
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="h4"
              component="h4"
              sx={{
                color: header_text_color ? header_text_color : "white",
                marginBottom: "1rem",
              }}
            >
              {subtitle}
            </Typography>
          )}
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
