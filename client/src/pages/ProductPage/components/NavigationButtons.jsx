import React from "react";

import { scrollToElement } from "../productHelpers";
import Box from "@mui/material/Box";
import { darken } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
const NavigationButtons = ({ primary_color }) => {
  const theme = useTheme();

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
    cursor: "pointer",
    transition: "background-color 0.3s, border-color 0.3s",
    borderBottom: "2px solid transparent",
    "&:hover": {
      backgroundColor: primary_color ? darken(primary_color, 0.1) : theme.palette.primary.dark,
      borderBottomColor: primary_color ? theme.palette.getContrastText(primary_color) : theme.palette.common.white,
    },
  };

  const buttonTextStyle = {
    fontWeight: "bold",
    fontSize: "14px",
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: primary_color || theme.palette.primary.main,
        color: primary_color ? theme.palette.getContrastText(primary_color) : theme.palette.common.white,
      }}
    >
      <Box sx={buttonStyle} onClick={() => scrollToElement("features")}>
        <Typography variant="h6" sx={buttonTextStyle}>
          {"Features"}
        </Typography>
      </Box>
      <Box sx={buttonStyle} onClick={() => scrollToElement("tech-specs")}>
        <Typography variant="h6" sx={buttonTextStyle}>
          {"Tech Specs"}
        </Typography>
      </Box>
      <Box sx={buttonStyle} onClick={() => scrollToElement("manual")}>
        <Typography variant="h6" sx={buttonTextStyle}>
          {"Manual"}
        </Typography>
      </Box>
    </Box>
  );
};

export default NavigationButtons;
