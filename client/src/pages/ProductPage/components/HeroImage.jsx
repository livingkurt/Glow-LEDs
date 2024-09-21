import React from "react";
import { Box } from "@mui/material";

const HeroImage = ({ image }) => {
  if (!image) return null;

  return (
    <Box
      component="img"
      src={image?.link}
      alt={"Hero"}
      sx={{
        width: "100%",
        // aspectRatio: "16/9",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
};

export default HeroImage;
