import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
const ColumnTitle = ({ align, ariaLabel, children, onClick, sx, hasColumnRows, ...otherProps }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(1),
        borderRadius: hasColumnRows ? "10px 0px 0px 10px" : "10px",
        ...sx,
      }}
      onClick={onClick}
      {...otherProps}
    >
      <Typography
        variant="h6"
        align={align}
        sx={{
          color: theme.palette.common.white,
          fontSize: "16px",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default ColumnTitle;
