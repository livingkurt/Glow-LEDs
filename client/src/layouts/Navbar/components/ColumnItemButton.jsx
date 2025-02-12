import { Link } from "react-router-dom";

import { HashLink } from "react-router-hash-link";
import { isSafari } from "react-device-detect";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

const ColumnItemButton = ({ to, align, ariaLabel, children, onClick, sx, hasColumnRows, ...otherProps }) => {
  const theme = useTheme();
  return to?.includes("#") ? (
    <HashLink to={to} className="w-100per">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: theme.spacing(1),
          cursor: "pointer",
          transition: "background-color 0.3s",
          borderRadius: hasColumnRows ? "10px 0px 0px 10px" : "10px",
          "&:hover": {
            backgroundColor: theme.palette.grey[600],
          },
          ...sx,
        }}
        onClick={onClick}
        {...otherProps}
      >
        <Typography
          variant="body1"
          align={align}
          sx={{
            color: theme.palette.common.white,
            fontWeight: isSafari ? 599 : 600,
          }}
        >
          {children}
        </Typography>
      </Box>
    </HashLink>
  ) : (
    <Link to={to} aria-label={ariaLabel} className="w-100per">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: theme.spacing(1),
          cursor: "pointer",
          transition: "background-color 0.3s",
          borderRadius: hasColumnRows ? "10px 0px 0px 10px" : "10px",
          "&:hover": {
            backgroundColor: theme.palette.grey[600],
          },
          ...sx,
        }}
        onClick={onClick}
        {...otherProps}
      >
        <Typography
          variant="body1"
          align={align}
          sx={{
            color: theme.palette.common.white,
            fontWeight: isSafari ? 599 : 600,
          }}
        >
          {children}
        </Typography>
      </Box>
    </Link>
  );
};

export default ColumnItemButton;
