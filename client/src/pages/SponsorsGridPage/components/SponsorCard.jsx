import React from "react";
import { Card, CardContent, Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";

const SponsorCard = ({ affiliate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Link to={`/sponsors/${affiliate.pathname}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          bgcolor: "transparent",
          height: "100%",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: `0 12px 24px 0 hsl(${Math.random() * 360}deg 50% 50%)`,
          },
          cursor: "pointer",
          borderRadius: "1rem",
          display: isMobile ? "flex" : "block",
          flexDirection: isMobile ? "row" : "column",
        }}
        elevation={0}
      >
        <Box
          sx={{
            position: "relative",
            paddingTop: isMobile ? "40%" : "100%", // Adjust this value for mobile
            overflow: "hidden",
            flexShrink: 0,
            width: isMobile ? "40%" : "100%", // Adjust this value for mobile
            borderRadius: "1rem",
          }}
        >
          <GLLazyImage
            src={affiliate.picture}
            alt={affiliate.artist_name}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Typography variant={isMobile ? "body1" : "h6"} color="white" gutterBottom>
            {affiliate.artist_name}
          </Typography>

          <Box display="flex" justifyContent="space-between">
            {!isMobile && (
              <Typography variant={isMobile ? "body2" : "body1"} color="white">
                {affiliate?.user.first_name} {affiliate?.user.last_name}
              </Typography>
            )}
            <Typography variant="body2" color="white">
              {affiliate.location}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SponsorCard;
