import React from "react";
import { Card, CardContent, Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { random } from "lodash";

const MenuItemCard = ({ item }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Helper function to get the image URL
  const getImageUrl = image => {
    if (typeof image === "string") return image;
    if (typeof image === "object" && image !== null) {
      return image.link || image.url || image.src || "";
    }
    return "";
  };

  const imageUrl = getImageUrl(item.image);

  return (
    <Link to={item.link} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          bgcolor: "transparent",
          height: "100%",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: `0 12px 24px 0 hsl(${random(0, 360)}deg 50% 50%)`,
          },
          borderRadius: "1rem",
          display: isMobile ? "flex" : "block",
          flexDirection: isMobile ? "row" : "column",
        }}
        elevation={0}
      >
        <Box
          sx={{
            position: "relative",
            paddingTop: isMobile ? "50%" : "100%",
            overflow: "hidden",
            flexShrink: 0,
            width: isMobile ? "50%" : "100%",
            borderRadius: "1rem",
            transition: "border-radius 0.3s ease-in-out",
            "&:hover": {
              borderRadius: isMobile ? 0 : "1rem 1rem 0 0",
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(0, 0, 0, 0.1)", // Fallback color if image fails to load
              "&::after": {
                content: "''",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              },
            }}
          />
        </Box>
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative", // Ensure text is above the overlay
            zIndex: 1, // Ensure text is above the overlay
          }}
        >
          <Box>
            <Typography variant={isMobile ? "body1" : "h6"} color="white" gutterBottom>
              {item.label}
            </Typography>
          </Box>
          {item.description && (
            <Typography variant={isMobile ? "body2" : "body1"} color="white">
              {item.description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenuItemCard;
