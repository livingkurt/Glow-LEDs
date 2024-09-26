import React from "react";
import { Box, darken, Typography, useTheme } from "@mui/material";
import { scrollToElement } from "../productHelpers";

const NavigationButtons = ({ primary_color }) => {
  const theme = useTheme();

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: `${theme.spacing * 2}px ${theme.spacing * 4}px`,
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
          Features
        </Typography>
      </Box>
      <Box sx={buttonStyle} onClick={() => scrollToElement("tech-specs")}>
        <Typography variant="h6" sx={buttonTextStyle}>
          Tech Specs
        </Typography>
      </Box>
      <Box sx={buttonStyle} onClick={() => scrollToElement("manual")}>
        <Typography variant="h6" sx={buttonTextStyle}>
          Manual
        </Typography>
      </Box>
    </Box>
  );
};

export default NavigationButtons;

// import React from "react";
// import { Box, Typography } from "@mui/material";
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles(theme => ({
//   navigationButtons: {
//     display: "flex",
//     justifyContent: "center",
//     backgroundColor: theme.palette.primary.main,
//   },
//   button: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: `${theme.spacing(2)} ${theme.spacing(4)} ${theme.spacing(2)} ${theme.spacing(4)}`,
//     cursor: "pointer",
//     transition: "background-color 0.3s",
//     "&:hover": {
//       backgroundColor: theme.palette.primary.dark,
//       borderBottom: `2px solid ${theme.palette.custom.white}`,
//       paddingBottom: theme.spacing(2),
//       marginBottom: -2,
//     },
//   },
//   buttonText: {
//     color: theme.palette.common.white,
//     fontWeight: "bold",
//     fontSize: "14px",
//   },
// }));

// const NavigationButtons = ({ navigation }) => {
//   const classes = useStyles();

//   const handleClick = target => {
//     const element = document.getElementById(target);
//     if (element) {
//       const offset = 80; // Adjust this value based on your header height
//       const elementPosition = element.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.pageYOffset - offset;

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <div className={classes.navigationButtons}>
//       {navigation?.navigation_buttons?.map((button, index) => (
//         <Box key={index} className={classes.button} onClick={() => handleClick(button.target)}>
//           <Typography variant="h6" className={classes.buttonText}>
//             {button.label}
//           </Typography>
//         </Box>
//       ))}
//     </div>
//   );
// };

// export default NavigationButtons;
