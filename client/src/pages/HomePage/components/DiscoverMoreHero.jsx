import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

const DiscoverMoreHero = discover_more => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return !discover_more?.hidden ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        width: "100%",
      }}
      mt={{ xs: 2, sm: 4 }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
        }}
      >
        <Link to={discover_more.link}>
          <Box
            component="img"
            src={discover_more.image?.link}
            alt={discover_more.title}
            sx={{
              width: "100%",
              aspectRatio: "16/9",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Link>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            transform: "translate(-50%, -50%)",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          gap={2}
        >
          <Typography variant={isMobile ? "body2" : "subtitle1"} gutterBottom>
            {discover_more.subtitle}
          </Typography>
          <Typography variant="h3" gutterBottom>
            {discover_more.title}
          </Typography>

          <Link to={discover_more.link}>
            <Button variant="contained">{discover_more.button_text}</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  ) : (
    <></>
  );
};

export default DiscoverMoreHero;
