

import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
const CompareModels = ({ notSure }) => {
  const theme = useTheme();
  if (notSure?.hidden || !notSure) {
    return null;
  }

  return (
    <>
      {notSure.title && (
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            padding: "40px",
            textAlign: "center",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            {notSure.title}
          </Typography>
          <Link to={notSure.link}>
            <Button variant="contained" color="secondary">
              {notSure.button_text}
            </Button>
          </Link>
        </Box>
      )}
    </>
  );
};

export default CompareModels;
