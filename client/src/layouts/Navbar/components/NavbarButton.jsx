import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

const NavbarButton = ({ to, align, ariaLabel, children, onClick, sx, hasColumnRows, ...otherProps }) => {
  const theme = useTheme();
  return (
    <Link to={to} aria-label={ariaLabel} style={{ textDecoration: "none" }}>
      <Button
        sx={{
          display: "flex",
          alignItems: "center",
          padding: theme.spacing(1),
          cursor: "pointer",
          borderRadius: hasColumnRows ? "10px 0px 0px 10px" : "10px",
          transition: "box-shadow 0.3s, transform 0.3s",
          whiteSpace: "nowrap",
          overflow: "hidden",
          "&:hover": {
            backgroundColor: theme.palette.grey[800],
            transform: "translateY(-2px)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)",
          },
          ...sx,
        }}
        onClick={onClick}
        {...otherProps}
      >
        <Typography
          variant="button"
          align={align}
          sx={{
            color: theme.palette.common.white,
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          {children}
        </Typography>
      </Button>
    </Link>
  );
};

export default NavbarButton;
