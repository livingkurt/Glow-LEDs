import React from "react";
import { Card, CardContent, Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";
import { toCapitalize } from "../../../utils/helper_functions";

const TutorialCard = ({ tutorial, handleOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
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
      onClick={() => handleOpen(tutorial)}
    >
      <Box
        sx={{
          position: "relative",
          paddingTop: isMobile ? "50%" : "56.25%", // 16:9 aspect ratio
          overflow: "hidden",
          flexShrink: 0,
          width: isMobile ? "50%" : "100%",
          borderRadius: "1rem",
        }}
      >
        <GLLazyImage
          src={`http://img.youtube.com/vi/${tutorial.video}/hqdefault.jpg`}
          alt={tutorial.title}
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
        <Box>
          <Typography variant="h6" color="white" gutterBottom>
            {tutorial.title}
          </Typography>
          <Typography variant="body1" color="white">
            {"by "}
            {tutorial?.affiliate?.artist_name}
          </Typography>
        </Box>
        <Typography variant="body2" color="white">
          {"Level: "}
          {toCapitalize(tutorial.level)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TutorialCard;
