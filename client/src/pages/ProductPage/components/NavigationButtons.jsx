import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  navigationButtons: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: `${theme.spacing(2)} ${theme.spacing(4)} ${theme.spacing(2)} ${theme.spacing(4)}`,
    cursor: "pointer",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      borderBottom: `2px solid ${theme.palette.custom.white}`,
      paddingBottom: theme.spacing(2),
      marginBottom: -2,
    },
  },
  buttonText: {
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: "14px",
  },
}));

const NavigationButtons = () => {
  const classes = useStyles();

  const handleClick = target => {
    const element = document.getElementById(target);
    if (element) {
      const offset = 80; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={classes.navigationButtons}>
      <Box className={classes.button} onClick={() => handleClick("features")}>
        <Typography variant="h6" className={classes.buttonText}>
          Features
        </Typography>
      </Box>
      <Box className={classes.button} onClick={() => handleClick("tech-specs")}>
        <Typography variant="h6" className={classes.buttonText}>
          Tech Specs
        </Typography>
      </Box>
      <Box className={classes.button} onClick={() => handleClick("support")}>
        <Typography variant="h6" className={classes.buttonText}>
          Support
        </Typography>
      </Box>
    </div>
  );
};

export default NavigationButtons;
