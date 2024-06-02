const typography = {
  htmlFontSize: 16,
  fontFamily: '"title_font", "Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    fontFamily: '"title_font", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 300,
    fontSize: "96px",
    lineHeight: 1,
    letterSpacing: "-0.66px",
  },
  h2: {
    fontFamily: '"title_font", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 300,
    fontSize: "60px",
    lineHeight: 1,
    letterSpacing: "-0.5px",
  },
  h3: {
    fontFamily: '"title_font", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: "48px",
    lineHeight: 1.02,
    letterSpacing: "0px",
  },
  h4: {
    fontFamily: '"title_font", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: "34px",
    lineHeight: 1.15,
    letterSpacing: "0.07px",
  },
  h5: {
    fontFamily: '"title_font", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: "24px",
    lineHeight: 1.33,
    letterSpacing: "0px",
  },
  h6: {
    fontFamily: '"title_font", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: 1.6,
    letterSpacing: "0.07px",
  },
  subtitle1: {
    fontFamily: '"phrase_font", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: 1.75,
    letterSpacing: "0.09px",
  },
  subtitle2: {
    fontFamily: '"phrase_font", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: 1.57,
    letterSpacing: "0.07px",
  },
  body1: {
    fontFamily: '"paragraph_font", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: 1.5,
    letterSpacing: "0.09px",
  },
  body2: {
    fontFamily: '"paragraph_font", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: 1.43,
    letterSpacing: "0.1px",
  },
  button: {
    fontFamily: '"title_font", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    lineHeight: 1.69,
    letterSpacing: "0.3px",
    textTransform: "uppercase",
  },
  caption: {
    fontFamily: '"paragraph_font", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: 1.58,
    letterSpacing: "0.3px",
  },
  overline: {
    fontFamily: '"paragraph_font", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: 2.58,
    letterSpacing: "0.83px",
    textTransform: "uppercase",
  },
};

const palette = {
  common: { black: "#000", white: "#fff" },
  type: "light",
  primary: {
    light: "#4c6ebf",
    main: "#4d5061",
    dark: "#363947",
    contrastText: "#fff",
  },
  secondary: {
    light: "#63a4ff",
    main: "#6a6c80",
    dark: "#464754",
    contrastText: "#fff",
  },
  error: {
    light: "#BF334C",
    main: "#b00020",
    dark: "#7B0016",
    contrastText: "#fff",
  },
  warning: {
    light: "#ffc947",
    main: "#ff9800",
    dark: "#c66900",
    contrastText: "#fff",
  },
  info: {
    light: "#63a4ff",
    main: "#FFFFFF",
    dark: "#004ba0",
    contrastText: "#fff",
  },
  success: {
    light: "#5fab5e",
    main: "#2e7b32",
    dark: "#004e06",
    contrastText: "#fff",
  },
  disabled: {
    light: "#bdbdbd",
    main: "#bdbdbd",
    dark: "#212121",
    contrastText: "#303030",
  },
  custom: {
    white: "#ffffff",
  },
  grey: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
    A100: "#d5d5d5",
    A200: "#aaaaaa",
    A400: "#303030",
    A700: "#616161",
  },
  contrastThreshold: 3,
  tonalOffset: 0.2,

  text: {
    primary: "#212121",
    secondary: "#757575",
    disabled: "rgba(0, 0, 0, 0.38)",
    hint: "rgba(0, 0, 0, 0.38)",
  },
  divider: "rgba(0, 0, 0, 0.12)",
  background: {
    paper: "#fff",
    default: "#fff",
    level2: "#f5f5f5",
    level1: "#eeeeee",
  },
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
};

const shadows = [
  "none",
  "0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.2)",
  "0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.2)",
  "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)",
  "0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.12), 0 1px 8px 0 rgba(0, 0, 0, 0.2)",
  "0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
  "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
  "0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.2)",
  "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
  "0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)",
  "0 9px 12px 1px rgba(0, 0, 0, 0.14), 0 3px 16px 2px rgba(0, 0, 0, 0.12), 0 5px 6px -3px rgba(0, 0, 0, 0.2)",
  "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
  "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
  "0 12px 17px 2px rgba(0, 0, 0, 0.14), 0 5px 22px 4px rgba(0, 0, 0, 0.12), 0 7px 8px -4px rgba(0, 0, 0, 0.2)",
  "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
  "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
  "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
  "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
  "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
  "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
  "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
  "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
  "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
  "0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2)",
];

// const table = {
//   palette: {
//     background: {
//       default: "#4e5061"
//     },
//     text: {
//       primary: "#ffffff"
//     }
//   },
//   components: {
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           backgroundColor: "#4e5061"
//         }
//       }
//     },
//     MuiTableRow: {
//       styleOverrides: {
//         root: {
//           backgroundColor: "#343540"
//         }
//       },
//       head: {
//         backgroundColor: "#343540 !important"
//       }
//     },
//     MuiCheckbox: {
//       styleOverrides: {
//         root: {
//           color: "#fff"
//         }
//       }
//     },
//     MuiTableCell: {
//       styleOverrides: {
//         root: {
//           color: "#ffffff"
//         }
//       },
//       head: {
//         color: "white !important"
//       }
//     },
//     MuiTypography: {
//       styleOverrides: {
//         root: {
//           color: "#ffffff"
//         }
//       }
//     },
//     MuiTablePagination: {
//       styleOverrides: {
//         caption: {
//           color: "#ffffff"
//         },
//         select: {
//           color: "#ffffff"
//         }
//       }
//     }
//   }
// };

const theme = {
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 },
  },
  direction: "ltr",
  mixins: {},
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
      },
    },
    MuiTextField: {
      root: {
        "& MuiOutlinedInput": {
          color: "white",
          border: "1px solid white",
        },
      },
    },
    MuiButton: {
      label: {
        fontFamily: '"Comic Sans", sans-serif',
      },
      borderRadius: "20px",
      "&:hover": {
        borderRadius: "30px",
      },
      "&:active": {
        borderRadius: "30px",
      },
      styleOverrides: {
        sizeLarge: {
          fontSize: "1.2rem",
          padding: "12px 24px",
        },
        sizeMedium: {
          fontSize: "1rem",
          padding: "10px 20px",
        },
        sizeSmall: {
          fontSize: "0.8rem",
          padding: "8px 16px",
        },
      },
    },
  },
  palette,
  props: {},
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          transitionDuration: "3s",
          transitionTimingFunction: "ease-in-out", // Add your easing function here
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "20px", // Set the default icon size here
          "&.MuiSvgIcon-colorWhite": {
            color: palette.custom.white,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#393e55", // Lighter background color on hover
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          "&.Mui-error": {
            color: "white",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1.2rem", // Set the font size you desire here
          lineHeight: "1.5",
        },
      },
    },
  },
  shadows,
  typography,
  // ...table,
  shape: { borderRadius: 4 },
  // spacing: [0,4,8,16,32,64],
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  nprogress: { color: "#000" },
  themeName: "Glow LEDs",
};

export default theme;
